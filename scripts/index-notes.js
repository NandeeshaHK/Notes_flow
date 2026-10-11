/**
 * @file index-notes.js
 * @description Ingestion, indexing, and automated content-hash versioning script for GATE Notes Flow.
 * Scans GATE_CS and GATE_DA note repositories, detects content modifications via SHA-256 hashes,
 * automatically increments version strings (e.g. v1.0 -> v1.1), generates hierarchical catalogs,
 * and publishes clean markdown bundles for the web reader.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

/**
 * ES Module directory resolution.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Root directory configuration.
 */
const PROJECT_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(PROJECT_ROOT, '..'); // Points to D:\GIT_Proj\CS_DA
const PUBLIC_DIR = path.resolve(PROJECT_ROOT, 'public');
const NOTES_OUTPUT_DIR = path.resolve(PUBLIC_DIR, 'notes');
const CATALOG_OUTPUT_PATH = path.resolve(PUBLIC_DIR, 'catalog.json');
const REGISTRY_PATH = path.resolve(PROJECT_ROOT, 'notes-version-registry.json');
const DEFAULT_PASSPHRASE = process.argv[2] || 'gate';

/**
 * Consistent salt derived per passphrase so Web Crypto can cache PBKDF2 key.
 * @param {string} passphrase
 * @returns {Buffer}
 */
function getSaltForPassphrase(passphrase) {
  return crypto.createHash('sha256').update(passphrase + '_tp_salt_v1').digest().subarray(0, 16);
}

/**
 * AES-256-GCM Encryption compatible with browser Web Crypto API.
 * Format: [16 bytes salt][12 bytes IV][16 bytes authTag][ciphertext]
 *
 * @param {Buffer} plaintextBuffer
 * @param {string} passphrase
 * @returns {Buffer}
 */
function encryptPayload(plaintextBuffer, passphrase) {
  const salt = getSaltForPassphrase(passphrase);
  const key = crypto.pbkdf2Sync(passphrase, salt, 100000, 32, 'sha256');
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintextBuffer), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([salt, iv, tag, encrypted]);
}

/**
 * Source directories for GATE notes.
 * @type {Array<{ streamKey: string, streamLabel: string, dirPath: string }>}
 */
const NOTE_SOURCES = [
  {
    streamKey: 'GATE_CS',
    streamLabel: 'GATE Computer Science & IT (CS)',
    dirPath: path.resolve(REPO_ROOT, 'GATE_CS')
  },
  {
    streamKey: 'GATE_DA',
    streamLabel: 'GATE Data Science & AI (DA)',
    dirPath: path.resolve(REPO_ROOT, 'GATE_DA')
  }
];

/**
 * @typedef {Object} TocItem
 * @property {string} title - Heading title.
 * @property {number} level - Heading level (2 for h2, 3 for h3).
 * @property {string} anchor - URL anchor slug.
 */

/**
 * @typedef {Object} VersionRecord
 * @property {string} version - Current semantic version string (e.g. "v1.0").
 * @property {string} contentHash - SHA-256 hash of normalized content.
 * @property {string} createdAt - ISO date of creation.
 * @property {string} updatedAt - ISO date of last modification.
 * @property {number} changeCount - Number of content revisions recorded.
 * @property {string} [previousVersion] - Previous version prior to last bump.
 */

/**
 * @typedef {Object} NoteMetadata
 * @property {string} id - Unique canonical ID (e.g. "GATE_CS/01_Engineering_Math/linear_algebra.md").
 * @property {string} title - Human-readable title of the note.
 * @property {string} stream - Stream identifier ("GATE_CS" | "GATE_DA").
 * @property {string} streamLabel - Stream display label.
 * @property {string} subjectKey - Folder key (e.g. "01_Engineering_Math").
 * @property {string} subjectTitle - Formatted subject name (e.g. "Engineering Mathematics").
 * @property {string} relativePath - Relative path from notes root.
 * @property {string} version - Version string (e.g. "v1.1").
 * @property {string} updatedAt - ISO timestamp of latest content modification.
 * @property {boolean} isDeepDive - Whether this is an in-depth reference file.
 * @property {number} wordCount - Estimated word count.
 * @property {number} estimatedMinutes - Estimated reading time in minutes.
 * @property {boolean} hasFormulas - Whether math formulas ($ or $$) exist.
 * @property {boolean} hasPyqs - Whether GATE PYQ sections exist.
 * @property {TocItem[]} toc - Extracted headings for table of contents.
 */

/**
 * @typedef {Object} SubjectGroup
 * @property {string} key - Subject folder key.
 * @property {string} title - Formatted subject title.
 * @property {string} stream - Stream identifier.
 * @property {NoteMetadata[]} notes - List of notes in this subject.
 */

/**
 * Normalizes text content for consistent hash comparison across platforms.
 * Strips carriage returns and trailing whitespace.
 *
 * @param {string} rawContent - Raw file content.
 * @returns {string} Normalized content string.
 */
function normalizeContent(rawContent) {
  return rawContent
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();
}

/**
 * Computes SHA-256 hash of normalized content.
 *
 * @param {string} content - Normalized content.
 * @returns {string} Hex-encoded SHA-256 hash.
 */
function computeContentHash(content) {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

/**
 * Increments a version string (e.g., "v1.0" -> "v1.1", "v1.9" -> "v1.10").
 *
 * @param {string} currentVersion - Current version string.
 * @returns {string} Incremented version string.
 */
function incrementVersion(currentVersion) {
  const match = currentVersion.match(/^v?(\d+)\.(\d+)(?:\.(\d+))?$/);
  if (!match) {
    return 'v1.1';
  }
  const major = parseInt(match[1], 10);
  const minor = parseInt(match[2], 10);
  const patch = match[3] !== undefined ? parseInt(match[3], 10) : null;

  if (patch !== null) {
    return `v${major}.${minor}.${patch + 1}`;
  }
  return `v${major}.${minor + 1}`;
}

/**
 * Formats a subject folder slug into a clean title.
 * Example: "01_Engineering_Math" -> "Engineering Math"
 * Example: "04_Programming_Data_Structures" -> "Programming & Data Structures"
 *
 * @param {string} folderName - Folder name from file system.
 * @returns {string} Clean human-readable subject title.
 */
function formatSubjectTitle(folderName) {
  if (folderName === '_deep_dives') {
    return 'Deep Dives & Advanced References';
  }
  // Strip leading numbering: "01_" -> ""
  const stripped = folderName.replace(/^\d+_/, '');
  return stripped
    .replace(/_/g, ' ')
    .replace(/\bAnd\b/gi, '&')
    .replace(/\bMath\b/g, 'Mathematics')
    .replace(/\bOrg\b/g, 'Organization')
    .replace(/\bOs\b/g, 'Operating Systems')
    .replace(/\bToc\b/g, 'Theory of Computation')
    .replace(/\bDbms\b/g, 'Databases');
}

/**
 * Extracts title from markdown content or falls back to filename.
 *
 * @param {string} content - Markdown content.
 * @param {string} fallback - Fallback filename.
 * @returns {string} Clean title.
 */
function extractTitle(content, fallback) {
  const headingMatch = content.match(/^#\s+(.+)$/m);
  if (headingMatch && headingMatch[1]) {
    return headingMatch[1].trim();
  }
  return fallback
    .replace(/\.md$/i, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * Generates an anchor slug for headings matching GitHub / marked standards.
 *
 * @param {string} headingText - Raw heading text.
 * @returns {string} Safe anchor slug.
 */
function slugifyHeading(headingText) {
  return headingText
    .toLowerCase()
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '') // Remove emojis
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Extracts Table of Contents headings (h2 and h3).
 *
 * @param {string} content - Markdown content.
 * @returns {TocItem[]} Array of heading items.
 */
function extractTableOfContents(content) {
  /** @type {TocItem[]} */
  const toc = [];
  const lines = content.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const title = match[2].trim();
      const anchor = slugifyHeading(title);
      toc.push({ title, level, anchor });
    }
  }

  return toc;
}

/**
 * Scans a directory recursively and returns all Markdown files.
 *
 * @param {string} dir - Directory to search.
 * @returns {string[]} List of absolute file paths.
 */
function getMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  /** @type {string[]} */
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }

  return results;
}

/**
 * Loads the existing version registry or returns an empty object.
 *
 * @returns {Record<string, VersionRecord>}
 */
function loadVersionRegistry() {
  if (fs.existsSync(REGISTRY_PATH)) {
    try {
      const raw = fs.readFileSync(REGISTRY_PATH, 'utf8');
      return JSON.parse(raw);
    } catch (err) {
      console.warn('⚠️ Could not parse existing version registry. Initializing fresh one.');
      return {};
    }
  }
  return {};
}

/**
 * Saves the updated version registry to disk.
 *
 * @param {Record<string, VersionRecord>} registry
 */
function saveVersionRegistry(registry) {
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2), 'utf8');
}

/**
 * Main indexing execution function.
 */
async function runIndexNotes() {
  console.log('🚀 [GATE Notes Flow] Starting note indexing & auto-versioning pipeline...');

  // Ensure output directories exist
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }
  if (!fs.existsSync(NOTES_OUTPUT_DIR)) {
    fs.mkdirSync(NOTES_OUTPUT_DIR, { recursive: true });
  }

  const versionRegistry = loadVersionRegistry();
  /** @type {NoteMetadata[]} */
  const indexedNotes = [];
  let addedCount = 0;
  let updatedCount = 0;
  let unchangedCount = 0;

  const sourcesExist = NOTE_SOURCES.some(s => fs.existsSync(s.dirPath));
  if (!sourcesExist && fs.existsSync(CATALOG_OUTPUT_PATH)) {
    console.log('ℹ️ Source note repositories not found in this environment (CI/runner). Using pre-indexed catalog in public/.');
    return;
  }

  for (const source of NOTE_SOURCES) {
    if (!fs.existsSync(source.dirPath)) {
      console.warn(`⚠️ Source directory not found: ${source.dirPath} (skipping)`);
      continue;
    }
    console.log(`📂 Scanning ${source.streamLabel} at: ${source.dirPath}`);
    const files = getMarkdownFiles(source.dirPath);

    for (const filePath of files) {
      const relativeToSource = path.relative(source.dirPath, filePath).replace(/\\/g, '/');
      const canonicalId = `${source.streamKey}/${relativeToSource}`;
      const rawContent = fs.readFileSync(filePath, 'utf8');
      const normalized = normalizeContent(rawContent);
      const contentHash = computeContentHash(normalized);

      // Determine subject folder
      const pathParts = relativeToSource.split('/');
      const isRootReadme = pathParts.length === 1 && pathParts[0].toLowerCase() === 'readme.md';
      const subjectKey = isRootReadme ? '00_Overview' : pathParts[0];
      const subjectTitle = isRootReadme ? 'Syllabus Overview & Guide' : formatSubjectTitle(subjectKey);
      const isDeepDive = subjectKey === '_deep_dives';

      const fileName = path.basename(filePath);
      const title = isRootReadme
        ? `${source.streamKey === 'GATE_CS' ? 'GATE CS' : 'GATE DA'} Syllabus Overview`
        : extractTitle(normalized, fileName);

      // Versioning Logic
      const existingRecord = versionRegistry[canonicalId];
      let version = 'v1.0';
      let updatedAt = new Date().toISOString();

      if (!existingRecord) {
        // Brand new note
        versionRegistry[canonicalId] = {
          version: 'v1.0',
          contentHash,
          createdAt: updatedAt,
          updatedAt,
          changeCount: 0
        };
        addedCount++;
      } else if (existingRecord.contentHash !== contentHash) {
        // Content changed! Auto-increment version
        const newVersion = incrementVersion(existingRecord.version);
        versionRegistry[canonicalId] = {
          version: newVersion,
          contentHash,
          createdAt: existingRecord.createdAt || updatedAt,
          updatedAt,
          changeCount: (existingRecord.changeCount || 0) + 1,
          previousVersion: existingRecord.version
        };
        version = newVersion;
        updatedCount++;
        console.log(`🔄 Version bumped for [${canonicalId}]: ${existingRecord.version} -> ${newVersion}`);
      } else {
        // Content identical: preserve version and last update timestamp
        version = existingRecord.version;
        updatedAt = existingRecord.updatedAt;
        unchangedCount++;
      }

      // Feature detection
      const wordCount = normalized.split(/\s+/).filter(Boolean).length;
      const estimatedMinutes = Math.max(1, Math.ceil(wordCount / 180));
      const hasFormulas = /\$|\\\(|\\\[|\\begin\{/.test(normalized);
      const hasPyqs = /GATE PYQs|Worked Examples|Practice Questions/i.test(normalized);
      const toc = extractTableOfContents(normalized);

      // Prepare target output location in public/notes
      const destPath = path.join(NOTES_OUTPUT_DIR, source.streamKey, relativeToSource);
      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.writeFileSync(destPath, normalized, 'utf8');

      // Also write encrypted payload (.enc) with key (default: 'gate')
      const encryptedNoteBuffer = encryptPayload(Buffer.from(normalized, 'utf8'), DEFAULT_PASSPHRASE);
      fs.writeFileSync(destPath.replace(/\.md$/i, '.enc'), encryptedNoteBuffer);

      indexedNotes.push({
        id: canonicalId,
        title,
        stream: source.streamKey,
        streamLabel: source.streamLabel,
        subjectKey,
        subjectTitle,
        relativePath: `${source.streamKey}/${relativeToSource}`,
        version,
        updatedAt,
        isDeepDive,
        wordCount,
        estimatedMinutes,
        hasFormulas,
        hasPyqs,
        toc
      });
    }
  }

  // Save the updated version registry
  saveVersionRegistry(versionRegistry);

  // Group notes by Stream and Subject
  /** @type {Record<string, Record<string, NoteMetadata[]>>} */
  const groupedTree = {
    GATE_CS: {},
    GATE_DA: {}
  };

  for (const note of indexedNotes) {
    if (!groupedTree[note.stream]) {
      groupedTree[note.stream] = {};
    }
    if (!groupedTree[note.stream][note.subjectKey]) {
      groupedTree[note.stream][note.subjectKey] = [];
    }
    groupedTree[note.stream][note.subjectKey].push(note);
  }

  // Build the catalog JSON
  const catalogPayload = {
    appName: 'GATE Notes Flow',
    generatedAt: new Date().toISOString(),
    totalNotes: indexedNotes.length,
    streams: [
      { key: 'GATE_CS', label: 'GATE Computer Science & IT (CS)' },
      { key: 'GATE_DA', label: 'GATE Data Science & AI (DA)' }
    ],
    notes: indexedNotes,
    groupedTree
  };

  const catalogJsonStr = JSON.stringify(catalogPayload, null, 2);
  fs.writeFileSync(CATALOG_OUTPUT_PATH, catalogJsonStr, 'utf8');

  // Also write encrypted catalog.json.enc with key (default: 'gate')
  const encryptedCatalogBuffer = encryptPayload(Buffer.from(catalogJsonStr, 'utf8'), DEFAULT_PASSPHRASE);
  fs.writeFileSync(path.resolve(PUBLIC_DIR, 'catalog.json.enc'), encryptedCatalogBuffer);

  console.log(`\n✅ [GATE Notes Flow] Indexing complete!`);
  console.log(`   - Total Notes Indexed: ${indexedNotes.length}`);
  console.log(`   - Encrypted with key:  "${DEFAULT_PASSPHRASE}"`);
  console.log(`   - Initialized (v1.0):   ${addedCount}`);
  console.log(`   - Auto-incremented:     ${updatedCount}`);
  console.log(`   - Unchanged:            ${unchangedCount}`);
  console.log(`   - Output Catalog:       ${CATALOG_OUTPUT_PATH}`);
  console.log(`   - Output Encrypted:     ${path.resolve(PUBLIC_DIR, 'catalog.json.enc')}\n`);
}

runIndexNotes().catch(err => {
  console.error('❌ Failed to run index-notes:', err);
  process.exit(1);
});
