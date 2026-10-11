/**
 * @file md-parser.js
 * @description High-performance Markdown and KaTeX math parsing engine for GATE Notes Flow.
 * Handles LaTeX formulas ($...$ and $$...$$), interactive PYQ reveal accordions,
 * callout blocks, table wrappers, code copying, and heading anchors.
 */

import { marked } from 'marked';
import DOMPurify from 'dompurify';
import katex from 'katex';

/**
 * Configure DOMPurify to allow KaTeX MathML and SVG elements.
 */
const PURIFY_CONFIG = {
  ADD_TAGS: ['math', 'annotation', 'semantics', 'mrow', 'mi', 'mo', 'mn', 'msup', 'msub', 'mfrac', 'mover', 'munder', 'msqrt', 'mtable', 'mtr', 'mtd', 'mtext', 'mspace', 'details', 'summary'],
  ADD_ATTR: ['aria-hidden', 'displayMode', 'open', 'data-anchor', 'data-note-id', 'target', 'rel']
};

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
 * Safely renders a LaTeX formula using KaTeX.
 *
 * @param {string} formula - LaTeX string.
 * @param {boolean} displayMode - True for block $$ equations, false for inline $.
 * @returns {string} Rendered HTML string.
 */
function renderKaTeX(formula, displayMode) {
  try {
    return katex.renderToString(formula.trim(), {
      displayMode,
      throwOnError: false,
      output: 'htmlAndMathml',
      strict: false
    });
  } catch (err) {
    console.warn('⚠️ KaTeX render error for formula:', formula, err);
    return `<code class="katex-error">${formula}</code>`;
  }
}

/**
 * Extracts and tokens math formulas before Markdown parsing to prevent
 * marked from mangling LaTeX characters like _, *, \, <, >.
 *
 * @param {string} markdown - Input raw markdown.
 * @returns {{ text: string, mathTokens: Map<string, { math: string, display: boolean }> }}
 */
function tokenizeMath(markdown) {
  const mathTokens = new Map();
  let tokenCounter = 0;

  // 1. Display math blocks: $$...$$ or \[...\]
  let text = markdown.replace(/\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]/g, (match, p1, p2) => {
    const mathContent = p1 || p2;
    const placeholder = `@@MATH_DISPLAY_${tokenCounter++}@@`;
    mathTokens.set(placeholder, { math: mathContent, display: true });
    return `\n\n${placeholder}\n\n`;
  });

  // 2. Inline math: $...$ or \(...\)
  // Ensure we don't match currency like "$100" by checking for non-space after opening and before closing
  text = text.replace(/(?<!\\)\$([^\$\n]+?)(?<!\\)\$|\\\(([\s\S]+?)\\\)/g, (match, p1, p2) => {
    const mathContent = p1 || p2;
    // Skip if looks like plain currency (e.g. just digits)
    if (/^\d+(?:\.\d+)?$/.test(mathContent.trim())) {
      return match;
    }
    const placeholder = `@@MATH_INLINE_${tokenCounter++}@@`;
    mathTokens.set(placeholder, { math: mathContent, display: false });
    return placeholder;
  });

  return { text, mathTokens };
}

/**
 * Restores math tokens by rendering them through KaTeX.
 *
 * @param {string} html - HTML containing placeholders.
 * @param {Map<string, { math: string, display: boolean }>} mathTokens
 * @returns {string} HTML with rendered KaTeX formulas.
 */
function restoreMath(html, mathTokens) {
  let restored = html;
  for (const [placeholder, { math, display }] of mathTokens.entries()) {
    const rendered = renderKaTeX(math, display);
    const wrapper = display
      ? `<div class="katex-display-block" data-raw-latex="${encodeURIComponent(math)}">${rendered}</div>`
      : `<span class="katex-inline-formula" data-raw-latex="${encodeURIComponent(math)}">${rendered}</span>`;

    // Replace both bare placeholder and paragraph-wrapped placeholder
    restored = restored.replace(new RegExp(`<p>\\s*${placeholder}\\s*<\\/p>`, 'g'), wrapper);
    restored = restored.replace(new RegExp(placeholder, 'g'), wrapper);
  }
  return restored;
}

/**
 * Transforms GATE PYQ answers (- **Answer:** ...) into interactive reveal accordions.
 *
 * @param {string} html - Rendered HTML.
 * @returns {string} Enhanced HTML with interactive reveals.
 */
function enhancePyqReveals(html) {
  // Matches list items containing Answer or Solution, with or without <p> wrapper
  return html.replace(
    /<li>(?:\s*<p>)?\s*<strong>(?:Answer|Solution):<\/strong>([\s\S]*?)(?:<\/p>)?\s*<\/li>/gi,
    (match, content) => {
      const cleanContent = content.trim();
      return `
        <li class="pyq-reveal-item">
          <details class="pyq-reveal-box">
            <summary class="pyq-reveal-btn">
              <span class="pyq-btn-icon">👁️</span>
              <span class="pyq-btn-text">Reveal Solution & Answer</span>
            </summary>
            <div class="pyq-solution-body">
              <strong>Answer / Solution:</strong> ${cleanContent}
            </div>
          </details>
        </li>
      `;
    }
  );
}

/**
 * Enhances callouts and blockquotes with custom badges.
 *
 * @param {string} html
 * @returns {string}
 */
function enhanceCallouts(html) {
  return html.replace(
    /<blockquote>\s*<p>\s*<strong>(Syllabus|Note|Warning|Important|Tip|Trap):<\/strong>([\s\S]*?)<\/p>\s*<\/blockquote>/gi,
    (match, type, content) => {
      const lower = type.toLowerCase();
      const badgeMap = {
        syllabus: '📋 Syllabus Scope',
        note: '💡 Study Note',
        warning: '⚠️ Critical GATE Trap',
        important: '🎯 High-Yield Concept',
        tip: '✨ Revision Tip',
        trap: '🚨 GATE Trap Warning'
      };
      const badge = badgeMap[lower] || type;
      return `
        <div class="callout-card callout-${lower}">
          <div class="callout-header">${badge}</div>
          <div class="callout-body"><p>${content}</p></div>
        </div>
      `;
    }
  );
}

/**
 * Wraps tables in horizontal scroll containers so matrix and comparison tables don't overflow on mobile.
 *
 * @param {string} html
 * @returns {string}
 */
function wrapTables(html) {
  return html.replace(/<table>([\s\S]*?)<\/table>/gi, '<div class="table-responsive-wrapper"><table>$1</table></div>');
}

/**
 * Custom Marked Renderer with heading IDs and code copy buttons.
 */
const customRenderer = new marked.Renderer();

customRenderer.heading = function ({ text, depth }) {
  const cleanTitle = text.replace(/<[^>]*>/g, '');
  const slug = slugifyHeading(cleanTitle);
  return `
    <h${depth} id="${slug}" class="note-heading note-h${depth}" data-anchor="${slug}">
      <span class="heading-anchor-hash" aria-hidden="true">#</span>
      <span class="heading-text">${text}</span>
    </h${depth}>
  `;
};

customRenderer.code = function ({ text, lang }) {
  const language = lang || 'text';
  const encodedCode = encodeURIComponent(text);
  return `
    <div class="code-block-container" data-lang="${language}">
      <div class="code-block-header">
        <span class="code-lang-tag">${language.toUpperCase()}</span>
        <button class="btn-copy-code" data-code="${encodedCode}" title="Copy code" aria-label="Copy code">
          <span class="copy-icon">📋</span> Copy
        </button>
      </div>
      <pre class="code-pre"><code class="language-${language}">${text}</code></pre>
    </div>
  `;
};

// Initialize marked with custom options
marked.setOptions({
  renderer: customRenderer,
  gfm: true,
  breaks: false
});

export const MarkdownParser = {
  /**
   * Parses Markdown content into KaTeX-ready, safe HTML.
   *
   * @param {string} markdown - Raw markdown text.
   * @returns {string} Final sanitized HTML.
   */
  render(markdown) {
    if (!markdown) return '';

    // 1. Protect and extract LaTeX math blocks
    const { text, mathTokens } = tokenizeMath(markdown);

    // 2. Parse Markdown to HTML
    let rawHtml = marked.parse(text);

    // 3. Restore and render KaTeX formulas
    rawHtml = restoreMath(rawHtml, mathTokens);

    // 4. Transform PYQs into interactive reveals
    rawHtml = enhancePyqReveals(rawHtml);

    // 5. Enhance callout boxes
    rawHtml = enhanceCallouts(rawHtml);

    // 6. Wrap tables for responsiveness
    rawHtml = wrapTables(rawHtml);

    // 7. Sanitize via DOMPurify if available in DOM environment
    if (typeof DOMPurify !== 'undefined' && typeof DOMPurify.sanitize === 'function') {
      return DOMPurify.sanitize(rawHtml, PURIFY_CONFIG);
    }
    return rawHtml;
  }
};
