/**
 * @file formula-drawer.js
 * @description Extracts and presents key mathematical formulas in a high-yield
 * formula sheet drawer for fast pre-exam revision in GATE Notes Flow.
 */

export class FormulaDrawer {
  /**
   * @param {Object} options
   * @param {HTMLElement} options.drawerEl - The drawer container DOM element.
   * @param {HTMLElement} options.contentEl - The container where formula cards are inserted.
   * @param {HTMLElement} options.overlayEl - Modal backdrop overlay.
   * @param {(text: string) => void} [options.onToast] - Toast notification callback.
   */
  constructor({ drawerEl, contentEl, overlayEl, onToast }) {
    this.drawerEl = drawerEl;
    this.contentEl = contentEl;
    this.overlayEl = overlayEl;
    this.onToast = onToast || console.log;

    this.isOpen = false;
    this.initEvents();
  }

  /**
   * Sets up close button and backdrop click events.
   */
  initEvents() {
    this.overlayEl.addEventListener('click', () => this.close());

    const closeBtn = this.drawerEl.querySelector('.btn-close-formula-drawer');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Delegate copy LaTeX buttons
    this.contentEl.addEventListener('click', (e) => {
      const target = /** @type {HTMLElement} */ (e.target);
      const copyBtn = target.closest('.btn-copy-formula');
      if (copyBtn) {
        const rawLatex = decodeURIComponent(copyBtn.getAttribute('data-latex') || '');
        if (rawLatex) {
          navigator.clipboard.writeText(rawLatex).then(() => {
            this.onToast('LaTeX formula copied to clipboard!');
          });
        }
      }
    });
  }

  /**
   * Extracts formulas from the rendered reader content.
   *
   * @param {HTMLElement} readerContainerEl - Rendered note DOM element.
   * @param {string} noteTitle - Title of current note.
   */
  populateFromReader(readerContainerEl, noteTitle) {
    this.contentEl.innerHTML = '';

    const formulaSectionHeader = Array.from(readerContainerEl.querySelectorAll('h2, h3')).find(h =>
      /key formulas|formulas/i.test(h.textContent || '')
    );

    /** @type {Array<{ title: string, html: string, rawLatex: string }>} */
    const items = [];

    if (formulaSectionHeader) {
      // Collect formulas up to the next major heading
      let sibling = formulaSectionHeader.nextElementSibling;
      let currentSubheading = 'Formulas';

      while (sibling && !['H1', 'H2'].includes(sibling.tagName)) {
        if (sibling.tagName === 'H3' || sibling.tagName === 'H4') {
          currentSubheading = sibling.textContent?.trim() || 'Formulas';
        } else {
          const formulasInBlock = sibling.querySelectorAll('.katex-display-block, .katex-inline-formula');
          formulasInBlock.forEach((fEl) => {
            const rawLatex = fEl.getAttribute('data-raw-latex') || '';
            items.push({
              title: currentSubheading,
              html: fEl.outerHTML,
              rawLatex
            });
          });
        }
        sibling = sibling.nextElementSibling;
      }
    }

    // Fallback: If no dedicated formula section, extract all display math equations
    if (items.length === 0) {
      const allDisplay = readerContainerEl.querySelectorAll('.katex-display-block');
      allDisplay.forEach((fEl, idx) => {
        const rawLatex = fEl.getAttribute('data-raw-latex') || '';
        items.push({
          title: `Equation ${idx + 1}`,
          html: fEl.outerHTML,
          rawLatex
        });
      });
    }

    if (items.length === 0) {
      this.contentEl.innerHTML = `
        <div class="formula-empty-state">
          <p>ℹ️ No mathematical formulas found in this revision note.</p>
        </div>
      `;
      return;
    }

    // Render grouped cards
    const fragment = document.createDocumentFragment();
    items.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'formula-card';
      card.innerHTML = `
        <div class="formula-card-header">
          <span class="formula-card-tag">${item.title}</span>
          <button class="btn-copy-formula" data-latex="${item.rawLatex}" title="Copy LaTeX">
            📋 Copy LaTeX
          </button>
        </div>
        <div class="formula-card-body">
          ${item.html}
        </div>
      `;
      fragment.appendChild(card);
    });

    this.contentEl.appendChild(fragment);
  }

  /**
   * Opens the formula drawer.
   */
  open() {
    this.isOpen = true;
    this.drawerEl.classList.add('open');
    this.overlayEl.classList.add('visible');
    document.body.classList.add('modal-open');
  }

  /**
   * Closes the formula drawer.
   */
  close() {
    this.isOpen = false;
    this.drawerEl.classList.remove('open');
    this.overlayEl.classList.remove('visible');
    document.body.classList.remove('modal-open');
  }

  /**
   * Toggles drawer visibility.
   */
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}
