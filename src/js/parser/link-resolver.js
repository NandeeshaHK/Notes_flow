/**
 * @file link-resolver.js
 * @description Resolves relative markdown links, sister-directory references, cross-stream links,
 * and section anchors into canonical note identifiers within GATE Notes Flow.
 */

/**
 * @typedef {Object} ResolvedLink
 * @property {'external' | 'anchor' | 'note' | 'unknown'} type - Type of resolved target.
 * @property {string} [href] - Original or external URL.
 * @property {string} [noteId] - Canonical note ID (e.g. "GATE_CS/01_Engineering_Math/calculus.md").
 * @property {string} [anchor] - Target heading anchor (without '#').
 */

export const LinkResolver = {
  /**
   * Resolves a clicked link href relative to the current active note ID.
   *
   * @param {string} currentNoteId - Canonical ID of the active note (e.g. "GATE_CS/01_Engineering_Math/linear_algebra.md").
   * @param {string} linkHref - Raw href from markdown <a> tag (e.g. "../01_Engineering_Math/calculus.md#limits").
   * @returns {ResolvedLink}
   */
  resolve(currentNoteId, linkHref) {
    if (!linkHref) {
      return { type: 'unknown' };
    }

    const trimmed = linkHref.trim();

    // 1. External Links (http, https, mailto, tel)
    if (/^(https?:|mailto:|tel:|\/\/)/i.test(trimmed)) {
      return { type: 'external', href: trimmed };
    }

    // 2. Pure in-page anchor (#heading)
    if (trimmed.startsWith('#')) {
      const anchor = trimmed.substring(1).toLowerCase();
      return { type: 'anchor', anchor };
    }

    // Split target path and hash anchor if present
    const [pathPart, hashPart] = trimmed.split('#');
    const anchor = hashPart ? hashPart.toLowerCase() : '';

    // If only non-markdown file, handle as external or unknown
    if (!/\.md$/i.test(pathPart) && !pathPart.endsWith('/')) {
      return { type: 'external', href: trimmed };
    }

    // 3. Resolve relative path against currentNoteId directory
    const resolvedPath = this.resolveRelativePath(currentNoteId, pathPart);

    return {
      type: 'note',
      noteId: resolvedPath,
      anchor
    };
  },

  /**
   * Resolves relative path segments ('..' and '.') against a base note ID.
   *
   * @param {string} baseNoteId - e.g. "GATE_CS/01_Engineering_Math/linear_algebra.md"
   * @param {string} relativePath - e.g. "../_deep_dives/linear_algebra_deep.md" or "../../GATE_CS/README.md"
   * @returns {string} Normalized canonical note ID.
   */
  resolveRelativePath(baseNoteId, relativePath) {
    // Determine the directory of the base note
    const baseSegments = baseNoteId.replace(/\\/g, '/').split('/');
    baseSegments.pop(); // Remove filename to get base directory

    const targetSegments = relativePath.replace(/\\/g, '/').split('/');
    const resultSegments = [...baseSegments];

    for (const seg of targetSegments) {
      if (!seg || seg === '.') {
        continue;
      }
      if (seg === '..') {
        if (resultSegments.length > 0) {
          resultSegments.pop();
        }
      } else {
        resultSegments.push(seg);
      }
    }

    let finalPath = resultSegments.join('/');

    // If path ends with directory, default to README.md
    if (finalPath.endsWith('/')) {
      finalPath += 'README.md';
    }

    // Ensure .md extension
    if (!/\.md$/i.test(finalPath)) {
      finalPath += '.md';
    }

    return finalPath;
  },

  /**
   * Finds the best match note from the catalog given a noteId or partial path.
   * Handles variations in folder casing and direct filenames.
   *
   * @param {string} targetNoteId
   * @param {Array<{ id: string, relativePath: string }>} catalogNotes
   * @returns {string | null} Canonical note ID if found, otherwise null.
   */
  findInCatalog(targetNoteId, catalogNotes) {
    const normalizedTarget = targetNoteId.toLowerCase();

    // 1. Exact canonical match
    const exact = catalogNotes.find(n => n.id.toLowerCase() === normalizedTarget);
    if (exact) return exact.id;

    // 2. Basename fallback (e.g. "calculus.md" or "probability_deep.md")
    const targetFilename = targetNoteId.split('/').pop()?.toLowerCase();
    if (targetFilename) {
      const match = catalogNotes.find(n => n.id.toLowerCase().endsWith('/' + targetFilename));
      if (match) return match.id;
    }

    return null;
  }
};
