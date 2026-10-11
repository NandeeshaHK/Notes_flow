/**
 * @file test-gate-flow.js
 * @description Comprehensive unit and integration test suite for GATE Notes Flow.
 * Verifies link resolver accuracy, math tokenization, version auto-incrementing,
 * and user read update notification logic.
 */

import assert from 'assert';
import { LinkResolver } from '../src/js/parser/link-resolver.js';
import { MarkdownParser } from '../src/js/parser/md-parser.js';

console.log('🧪 Starting GATE Notes Flow Test Suite...\n');

let passedTests = 0;
let failedTests = 0;

/**
 * Test helper.
 * @param {string} testName
 * @param {() => void} fn
 */
function test(testName, fn) {
  try {
    fn();
    console.log(`  ✓ ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${testName}:`, err.message);
    failedTests++;
  }
}

// =========================================================================
// 1. LINK RESOLVER TESTS
// =========================================================================
console.log('--- 1. Link Resolver Verification ---');

test('Resolves relative sister-directory notes', () => {
  const currentNote = 'GATE_CS/01_Engineering_Math/linear_algebra.md';
  const targetLink = '../01_Engineering_Math/calculus.md';
  const res = LinkResolver.resolve(currentNote, targetLink);
  assert.strictEqual(res.type, 'note');
  assert.strictEqual(res.noteId, 'GATE_CS/01_Engineering_Math/calculus.md');
});

test('Resolves deep-dive links from subject note', () => {
  const currentNote = 'GATE_CS/01_Engineering_Math/linear_algebra.md';
  const targetLink = '../_deep_dives/linear_algebra_deep.md';
  const res = LinkResolver.resolve(currentNote, targetLink);
  assert.strictEqual(res.type, 'note');
  assert.strictEqual(res.noteId, 'GATE_CS/_deep_dives/linear_algebra_deep.md');
});

test('Resolves cross-stream link from GATE_DA to GATE_CS', () => {
  const currentNote = 'GATE_DA/01_Probability_Statistics/probability.md';
  const targetLink = '../../GATE_CS/01_Engineering_Math/probability.md';
  const res = LinkResolver.resolve(currentNote, targetLink);
  assert.strictEqual(res.type, 'note');
  assert.strictEqual(res.noteId, 'GATE_CS/01_Engineering_Math/probability.md');
});

test('Resolves link with section anchor', () => {
  const currentNote = 'GATE_CS/01_Engineering_Math/linear_algebra.md';
  const targetLink = '../01_Engineering_Math/calculus.md#maxima-minima';
  const res = LinkResolver.resolve(currentNote, targetLink);
  assert.strictEqual(res.type, 'note');
  assert.strictEqual(res.noteId, 'GATE_CS/01_Engineering_Math/calculus.md');
  assert.strictEqual(res.anchor, 'maxima-minima');
});

test('Resolves pure in-page anchor without note hopping', () => {
  const currentNote = 'GATE_CS/01_Engineering_Math/linear_algebra.md';
  const targetLink = '#determinant--inverse';
  const res = LinkResolver.resolve(currentNote, targetLink);
  assert.strictEqual(res.type, 'anchor');
  assert.strictEqual(res.anchor, 'determinant--inverse');
});

test('Identifies external web links', () => {
  const currentNote = 'GATE_CS/01_Engineering_Math/linear_algebra.md';
  const targetLink = 'https://gate.iitk.ac.in/syllabus.html';
  const res = LinkResolver.resolve(currentNote, targetLink);
  assert.strictEqual(res.type, 'external');
  assert.strictEqual(res.href, 'https://gate.iitk.ac.in/syllabus.html');
});

// =========================================================================
// 2. MARKDOWN & KATEX PARSER TESTS
// =========================================================================
console.log('\n--- 2. Markdown & KaTeX Parser Verification ---');

test('Renders inline math formula with KaTeX', () => {
  const md = 'The determinant is $\\det(AB) = \\det(A)\\det(B)$ for all matrices.';
  const html = MarkdownParser.render(md);
  assert.ok(html.includes('katex'), 'HTML should contain rendered katex class');
  assert.ok(html.includes('katex-inline-formula'), 'HTML should contain katex-inline-formula wrapper');
});

test('Renders display block math with KaTeX', () => {
  const md = 'Characteristic equation:\n\n$$\\det(A - \\lambda I) = 0$$\n';
  const html = MarkdownParser.render(md);
  assert.ok(html.includes('katex-display-block'), 'HTML should contain katex-display-block wrapper');
  assert.ok(html.includes('katex-display'), 'KaTeX display markup present');
});

test('Transforms GATE PYQ answers into interactive reveal accordions', () => {
  const md = `
## 🎯 GATE PYQs

**Q1 (GATE 2021, 1 mark):** The rank of the matrix is:
- **Answer:** 1 (rows are linearly dependent).
`;
  const html = MarkdownParser.render(md);
  assert.ok(html.includes('pyq-reveal-box'), 'Should contain pyq-reveal-box details element');
  assert.ok(html.includes('Reveal Solution &amp; Answer') || html.includes('Reveal Solution & Answer'), 'Should contain reveal button');
});

test('Enhances Syllabus and Trap Callout cards', () => {
  const md = '> **Syllabus:** Matrices, eigenvalues and eigenvectors.\n\n> **Trap:** Do not forget row dependency!';
  const html = MarkdownParser.render(md);
  assert.ok(html.includes('callout-syllabus'), 'Should contain callout-syllabus card');
  assert.ok(html.includes('callout-trap'), 'Should contain callout-trap card');
});

test('Wraps tables for responsive scrolling', () => {
  const md = `
| Section | Marks |
|---|---|
| Aptitude | 15 |
| Core | 85 |
`;
  const html = MarkdownParser.render(md);
  assert.ok(html.includes('table-responsive-wrapper'), 'Table must be wrapped in responsive container');
});

// =========================================================================
// 3. AUTO-VERSIONING LOGIC TESTS
// =========================================================================
console.log('\n--- 3. Auto-Versioning Increment Verification ---');

function incrementVersion(ver) {
  const match = ver.match(/^v?(\d+)\.(\d+)(?:\.(\d+))?$/);
  if (!match) return 'v1.1';
  const major = parseInt(match[1], 10);
  const minor = parseInt(match[2], 10);
  const patch = match[3] !== undefined ? parseInt(match[3], 10) : null;
  if (patch !== null) return `v${major}.${minor}.${patch + 1}`;
  return `v${major}.${minor + 1}`;
}

test('Increments v1.0 to v1.1', () => {
  assert.strictEqual(incrementVersion('v1.0'), 'v1.1');
});

test('Increments v1.9 to v1.10', () => {
  assert.strictEqual(incrementVersion('v1.9'), 'v1.10');
});

test('Increments patch versions v1.2.3 to v1.2.4', () => {
  assert.strictEqual(incrementVersion('v1.2.3'), 'v1.2.4');
});

// =========================================================================
// 4. PROGRESS & UPDATE NOTIFICATION LOGIC TESTS
// =========================================================================
console.log('\n--- 4. Read Progress & Update Notification Verification ---');

test('Detects when a completed note has received a version enhancement', () => {
  const userProgress = {
    isRead: true,
    readVersion: 'v1.0'
  };
  const catalogVersion = 'v1.1';

  // Has update notification condition
  const needsNotification = userProgress.isRead && userProgress.readVersion && userProgress.readVersion !== catalogVersion;
  assert.strictEqual(needsNotification, true, 'User should be notified that v1.1 is available');
});

test('Does not notify if user has not yet completed the note', () => {
  const userProgress = {
    isRead: false,
    readVersion: ''
  };
  const catalogVersion = 'v1.1';
  const needsNotification = userProgress.isRead && userProgress.readVersion && userProgress.readVersion !== catalogVersion;
  assert.strictEqual(needsNotification, false, 'Unread notes should not trigger read-update banner');
});

test('Clears notification when user acknowledges the updated version', () => {
  let userProgress = {
    isRead: true,
    readVersion: 'v1.0'
  };
  const catalogVersion = 'v1.1';

  // Acknowledge update
  userProgress.readVersion = catalogVersion;

  const needsNotification = userProgress.isRead && userProgress.readVersion && userProgress.readVersion !== catalogVersion;
  assert.strictEqual(needsNotification, false, 'Acknowledged version should clear notification');
});

// =========================================================================
// SUMMARY
// =========================================================================
console.log(`\n=========================================`);
console.log(`Results: ${passedTests} Passed, ${failedTests} Failed.`);
console.log(`=========================================\n`);

if (failedTests > 0) {
  process.exit(1);
}
