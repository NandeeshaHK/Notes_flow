/**
 * @file app.js
 * @description Master Application Controller for GATE Notes Flow.
 * Coordinates catalog loading, syllabus tree rendering, scroll reader,
 * markdown link hopping with exact scroll restoration, formula drawer,
 * and version diff change notifications.
 */

import 'katex/dist/katex.min.css';
import { decryptEncPayload, verifyAndDecryptCatalog } from './crypto/decryptor.js';
import { ProgressStore } from './storage/progress-store.js';
import { SyllabusTree } from './navigation/syllabus-tree.js';
import { ScrollReader } from './reader/scroll-reader.js';
import { HistoryNavigation } from './reader/history-nav.js';
import { FormulaDrawer } from './reader/formula-drawer.js';
import { NotificationManager } from './ui/notifications.js';
import { LinkResolver } from './parser/link-resolver.js';

class GateNotesApp {
  constructor() {
    /** @type {any} */
    this.catalog = null;
    /** @type {string | null} */
    this.currentNoteId = null;
    /** @type {any | null} */
    this.currentNoteMeta = null;
    /** @type {string | null} */
    this.passphrase = this.getInitialPassphrase();

    // View Elements
    this.viewLibraryEl = /** @type {HTMLElement} */ (document.getElementById('view-library'));
    this.viewReaderEl = /** @type {HTMLElement} */ (document.getElementById('view-reader'));
    this.passphraseModalEl = /** @type {HTMLElement} */ (document.getElementById('passphrase-modal'));
    this.toastEl = /** @type {HTMLElement} */ (document.getElementById('app-toast'));
    this.toastTimer = null;

    // Initialize UI theme & font size
    const initialTheme = ProgressStore.getTheme();
    ProgressStore.setTheme(initialTheme);
    const initialFontSize = ProgressStore.getFontSize();
    ProgressStore.setFontSize(initialFontSize);

    this.initControllers();
  }

  /**
   * Retrieves passphrase from URL query param ?key=gate, localStorage, or defaults to 'gate'.
   * @returns {string}
   */
  getInitialPassphrase() {
    const urlParams = new URLSearchParams(window.location.search);
    const queryKey = urlParams.get('key');
    if (queryKey) {
      ProgressStore.setPassphrase(queryKey, true);
      return queryKey;
    }
    return ProgressStore.getPassphrase() || 'gate';
  }

  /**
   * Initializes sub-controllers and event listeners.
   */
  async initControllers() {
    // 1. Toast Helper
    this.showToast = (msg) => {
      if (!this.toastEl) return;
      this.toastEl.textContent = msg;
      this.toastEl.classList.add('visible');
      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => {
        this.toastEl.classList.remove('visible');
      }, 2600);
    };

    // 2. Formula Drawer
    this.formulaDrawer = new FormulaDrawer({
      drawerEl: /** @type {HTMLElement} */ (document.getElementById('formula-drawer')),
      contentEl: /** @type {HTMLElement} */ (document.getElementById('formula-drawer-content')),
      overlayEl: /** @type {HTMLElement} */ (document.getElementById('modal-overlay')),
      onToast: this.showToast
    });

    // 3. Notifications Manager
    this.notifications = new NotificationManager({
      bannerEl: /** @type {HTMLElement} */ (document.getElementById('top-update-banner')),
      modalEl: /** @type {HTMLElement} */ (document.getElementById('updates-modal')),
      overlayEl: /** @type {HTMLElement} */ (document.getElementById('modal-overlay')),
      onSelectNote: (noteId) => this.openNote(noteId)
    });

    // 4. History Navigation Stack with exact scroll restoration
    this.historyNav = new HistoryNavigation({
      onLoadNote: async (noteId, options) => {
        await this.loadAndRenderNote(noteId, options);
      },
      onReturnToLibrary: () => {
        this.showLibraryView();
      },
      onTrailChange: (trail) => {
        if (this.scrollReader) {
          this.scrollReader.renderTrail(trail, () => this.historyNav.goBack());
        }
      }
    });

    // 5. Scroll Reader Engine
    this.scrollReader = new ScrollReader({
      viewportEl: /** @type {HTMLElement} */ (document.getElementById('reader-viewport')),
      contentEl: /** @type {HTMLElement} */ (document.getElementById('reader-content')),
      progressBarEl: /** @type {HTMLElement} */ (document.getElementById('reader-progress-fill')),
      headerTitleEl: /** @type {HTMLElement} */ (document.getElementById('reader-header-title')),
      headerVersionEl: /** @type {HTMLElement} */ (document.getElementById('reader-header-version')),
      btnMarkReadEl: /** @type {HTMLElement} */ (document.getElementById('btn-mark-read')),
      btnBookmarkEl: /** @type {HTMLElement} */ (document.getElementById('btn-reader-bookmark')),
      trailContainerEl: /** @type {HTMLElement} */ (document.getElementById('reader-nav-trail')),
      inNoteAlertContainerEl: /** @type {HTMLElement} */ (document.getElementById('in-note-alert-container')),
      onHopLink: (targetNoteId, anchor) => {
        const canonical = LinkResolver.findInCatalog(targetNoteId, this.catalog?.notes || []);
        if (canonical) {
          this.historyNav.hopToNote(canonical, anchor);
        } else {
          this.showToast(`Note reference not found: ${targetNoteId}`);
        }
      },
      onReadStatusChanged: () => {
        if (this.syllabusTree) {
          this.syllabusTree.render();
        }
        if (this.catalog) {
          this.notifications.checkForUpdates(this.catalog.notes);
        }
      },
      onOpenFormulaDrawer: () => {
        if (this.currentNoteMeta) {
          this.formulaDrawer.populateFromReader(
            /** @type {HTMLElement} */ (document.getElementById('reader-content')),
            this.currentNoteMeta.title
          );
          this.formulaDrawer.open();
        }
      },
      onToast: this.showToast
    });

    // Load Note Catalog
    await this.fetchCatalog();
    this.initGlobalEvents();
    this.handleInitialRoute();
  }

  /**
   * Fetches catalog (supports both encrypted catalog.json.enc and catalog.json).
   */
  async fetchCatalog() {
    try {
      // 1. Check if encrypted catalog exists first
      const encRes = await fetch('catalog.json.enc');
      if (encRes.ok) {
        const encBuffer = await encRes.arrayBuffer();

        if (this.passphrase) {
          try {
            this.catalog = await verifyAndDecryptCatalog(encBuffer, this.passphrase);
            this.initSyllabusAfterCatalog();
            return;
          } catch {
            console.warn('Saved passphrase invalid or changed.');
            this.passphrase = null;
          }
        }

        // Show Passphrase Modal
        this.showPassphraseModal(encBuffer);
        return;
      }

      // 2. Unencrypted fallback
      const res = await fetch('catalog.json');
      if (!res.ok) throw new Error('Catalog fetch failed');
      this.catalog = await res.json();
      this.initSyllabusAfterCatalog();
    } catch (err) {
      console.error('Failed to load catalog:', err);
      this.showToast('Could not load GATE notes catalog.');
    }
  }

  /**
   * Shows Passphrase unlock modal.
   * @param {ArrayBuffer} encBuffer
   */
  showPassphraseModal(encBuffer) {
    if (!this.passphraseModalEl) return;
    this.passphraseModalEl.classList.add('visible');

    const input = /** @type {HTMLInputElement} */ (document.getElementById('passphrase-input'));
    const btnSubmit = /** @type {HTMLButtonElement} */ (document.getElementById('btn-submit-passphrase'));
    const errorEl = document.getElementById('passphrase-error');

    if (input) {
      input.focus();
    }

    const handleUnlock = async () => {
      const enteredKey = input?.value?.trim();
      if (!enteredKey) return;

      if (btnSubmit) btnSubmit.disabled = true;
      if (errorEl) errorEl.textContent = '';

      try {
        this.catalog = await verifyAndDecryptCatalog(encBuffer, enteredKey);
        this.passphrase = enteredKey;
        ProgressStore.setPassphrase(enteredKey, true);
        this.passphraseModalEl.classList.remove('visible');
        this.initSyllabusAfterCatalog();
        this.showToast('GATE Notes Unlocked Successfully!');
      } catch (err) {
        if (errorEl) {
          errorEl.textContent = 'Incorrect key. Please enter the valid access key (Key: gate).';
        }
      } finally {
        if (btnSubmit) btnSubmit.disabled = false;
      }
    };

    btnSubmit?.addEventListener('click', handleUnlock);
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleUnlock();
    });
  }

  /**
   * Initializes syllabus tree and notifications once catalog is decrypted.
   */
  initSyllabusAfterCatalog() {
    if (!this.catalog) return;

    this.syllabusTree = new SyllabusTree({
      containerEl: /** @type {HTMLElement} */ (document.getElementById('syllabus-container')),
      progressSummaryEl: /** @type {HTMLElement} */ (document.getElementById('syllabus-progress-summary')),
      streams: this.catalog.streams,
      notes: this.catalog.notes,
      onSelectNote: (noteId) => this.openNote(noteId),
      onToggleBookmark: () => {
        if (this.syllabusTree) this.syllabusTree.render();
      }
    });
    this.syllabusTree.render();

    // Check if any completed notes were updated in catalog!
    this.notifications.checkForUpdates(this.catalog.notes);
  }

  /**
   * Sets up global app header, theme switchers, and keyboard navigation.
   */
  initGlobalEvents() {
    // 1. Back to Library Button in reader header
    const btnBackToLib = document.getElementById('btn-back-library');
    if (btnBackToLib) {
      btnBackToLib.addEventListener('click', () => {
        if (this.historyNav.canGoBack()) {
          this.historyNav.goBack();
        } else {
          this.showLibraryView();
        }
      });
    }

    // 2. Stream Switcher Tabs in Library View
    const streamTabs = document.querySelectorAll('.stream-tab-btn');
    streamTabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        const target = /** @type {HTMLElement} */ (e.currentTarget);
        const streamKey = target.getAttribute('data-stream') || 'GATE_CS';
        streamTabs.forEach(t => t.classList.remove('active'));
        target.classList.add('active');
        if (this.syllabusTree) {
          this.syllabusTree.setStream(streamKey);
        }
      });
    });

    // 3. Filter Pills in Library View (All, Unread, Completed, Updated, Starred)
    const filterPills = document.querySelectorAll('.filter-pill-btn');
    filterPills.forEach((pill) => {
      pill.addEventListener('click', (e) => {
        const target = /** @type {HTMLElement} */ (e.currentTarget);
        const filterVal = target.getAttribute('data-filter') || 'ALL';
        filterPills.forEach(p => p.classList.remove('active'));
        target.classList.add('active');
        if (this.syllabusTree) {
          this.syllabusTree.setFilter(filterVal);
        }
      });
    });

    // 4. Instant Search Input
    const searchInput = /** @type {HTMLInputElement} */ (document.getElementById('syllabus-search-input'));
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = /** @type {HTMLInputElement} */ (e.target).value;
        if (this.syllabusTree) {
          this.syllabusTree.setSearchQuery(query);
        }
      });
    }

    // 5. Formula Drawer Toggle Button in reader header
    const btnFormulaToggle = document.getElementById('btn-toggle-formula-drawer');
    if (btnFormulaToggle) {
      btnFormulaToggle.addEventListener('click', () => {
        if (this.currentNoteMeta) {
          this.formulaDrawer.populateFromReader(
            /** @type {HTMLElement} */ (document.getElementById('reader-content')),
            this.currentNoteMeta.title
          );
          this.formulaDrawer.open();
        }
      });
    }

    // 6. Font Size Adjusters
    const btnFontDown = document.getElementById('btn-font-smaller');
    const btnFontUp = document.getElementById('btn-font-larger');
    if (btnFontDown && btnFontUp) {
      btnFontDown.addEventListener('click', () => {
        const current = ProgressStore.getFontSize();
        const next = Math.max(14, current - 2);
        ProgressStore.setFontSize(next);
        this.showToast(`Font Size: ${next}px`);
      });
      btnFontUp.addEventListener('click', () => {
        const current = ProgressStore.getFontSize();
        const next = Math.min(26, current + 2);
        ProgressStore.setFontSize(next);
        this.showToast(`Font Size: ${next}px`);
      });
    }

    // 7. Theme Toggle Button
    const btnThemeToggle = document.getElementById('btn-theme-toggle');
    if (btnThemeToggle) {
      btnThemeToggle.addEventListener('click', () => {
        const themes = ['dark', 'parchment', 'light'];
        const currentTheme = ProgressStore.getTheme();
        const nextIdx = (themes.indexOf(currentTheme) + 1) % themes.length;
        const nextTheme = themes[nextIdx];
        ProgressStore.setTheme(nextTheme);
        this.showToast(`Theme: ${nextTheme.toUpperCase()}`);
      });
    }

    // 8. Next / Previous Note Buttons at footer of reader
    const btnPrevTopic = document.getElementById('btn-prev-topic');
    const btnNextTopic = document.getElementById('btn-next-topic');
    if (btnPrevTopic && btnNextTopic) {
      btnPrevTopic.addEventListener('click', () => this.navigateAdjacentTopic(-1));
      btnNextTopic.addEventListener('click', () => this.navigateAdjacentTopic(1));
    }

    // 9. Global Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      // Escape closes formula drawer or goes back
      if (e.key === 'Escape') {
        if (this.formulaDrawer.isOpen) {
          this.formulaDrawer.close();
        } else if (this.viewReaderEl.classList.contains('active')) {
          if (this.historyNav.canGoBack()) {
            this.historyNav.goBack();
          } else {
            this.showLibraryView();
          }
        }
      }

      // Alt + Left Arrow for back navigation
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        this.historyNav.goBack();
      }

      // Ctrl + K focus search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.showLibraryView();
        searchInput?.focus();
      }
    });
  }

  /**
   * Opens a note from the library or search.
   *
   * @param {string} noteId
   */
  async openNote(noteId) {
    this.historyNav.clear(); // Fresh navigation from library
    const targetUrl = `#/note/${encodeURIComponent(noteId)}`;
    window.history.pushState({ noteId }, '', targetUrl);
    await this.historyNav.loadTarget(noteId, { restoreScrollY: 0 });
  }

  /**
   * Fetches raw markdown and renders the note.
   *
   * @param {string} noteId - Canonical note ID.
   * @param {{ restoreScrollY?: number, anchor?: string }} options
   */
  async loadAndRenderNote(noteId, options = {}) {
    const meta = this.catalog?.notes.find((n) => n.id === noteId);
    if (!meta) {
      this.showToast(`Note not found: ${noteId}`);
      return;
    }

    this.currentNoteId = noteId;
    this.currentNoteMeta = meta;
    this.historyNav.setCurrentNote(noteId, meta.title);

    // Switch view to Reader
    this.viewLibraryEl.classList.remove('active');
    this.viewReaderEl.classList.add('active');

    // Fetch markdown file from public/notes (supports .enc and .md)
    try {
      let markdown = '';
      if (this.passphrase) {
        const encPath = `notes/${meta.relativePath.replace(/\.md$/i, '.enc')}`;
        const encRes = await fetch(encPath);
        if (encRes.ok) {
          const encBuffer = await encRes.arrayBuffer();
          markdown = await decryptEncPayload(encBuffer, this.passphrase);
        }
      }

      if (!markdown) {
        const res = await fetch(`notes/${meta.relativePath}`);
        if (!res.ok) throw new Error('Markdown file fetch failed');
        markdown = await res.text();
      }

      // Render through ScrollReader
      this.scrollReader.renderNote(markdown, meta);

      // Check if this note was updated since the user last completed it
      const inNoteAlertEl = document.getElementById('in-note-alert-container');
      if (inNoteAlertEl) {
        inNoteAlertEl.innerHTML = '';
        const updateBanner = this.notifications.createInNoteBanner(noteId, meta.version, () => {
          this.showToast(`Version ${meta.version} acknowledged as reviewed!`);
          if (this.syllabusTree) this.syllabusTree.render();
          this.notifications.checkForUpdates(this.catalog.notes);
        });
        if (updateBanner) {
          inNoteAlertEl.appendChild(updateBanner);
        }
      }

      // Save Last Read pointer
      ProgressStore.setLastRead({
        noteId: meta.id,
        title: meta.title,
        stream: meta.stream,
        scrollY: options.restoreScrollY || 0,
        timestamp: Date.now()
      });

      // Update adjacent topic buttons
      this.updateAdjacentButtons(noteId);
    } catch (err) {
      console.error('Error loading note markdown:', err);
      this.showToast('Failed to load note content.');
    }
  }

  /**
   * Navigates to the adjacent (previous or next) topic in the active stream.
   * @param {number} direction - -1 for previous, 1 for next.
   */
  navigateAdjacentTopic(direction) {
    if (!this.catalog || !this.currentNoteId) return;

    const currentIdx = this.catalog.notes.findIndex((n) => n.id === this.currentNoteId);
    if (currentIdx < 0) return;

    const targetIdx = currentIdx + direction;
    if (targetIdx >= 0 && targetIdx < this.catalog.notes.length) {
      const target = this.catalog.notes[targetIdx];
      this.historyNav.hopToNote(target.id);
    }
  }

  /**
   * Updates previous/next button labels and disabled states.
   * @param {string} noteId
   */
  updateAdjacentButtons(noteId) {
    if (!this.catalog) return;
    const currentIdx = this.catalog.notes.findIndex((n) => n.id === noteId);
    const btnPrev = /** @type {HTMLButtonElement} */ (document.getElementById('btn-prev-topic'));
    const btnNext = /** @type {HTMLButtonElement} */ (document.getElementById('btn-next-topic'));

    if (btnPrev) {
      btnPrev.disabled = currentIdx <= 0;
      if (currentIdx > 0) {
        btnPrev.title = `Previous: ${this.catalog.notes[currentIdx - 1].title}`;
      }
    }
    if (btnNext) {
      btnNext.disabled = currentIdx < 0 || currentIdx >= this.catalog.notes.length - 1;
      if (currentIdx < this.catalog.notes.length - 1) {
        btnNext.title = `Next: ${this.catalog.notes[currentIdx + 1].title}`;
      }
    }
  }

  /**
   * Switches to Library/Syllabus View.
   */
  showLibraryView() {
    this.viewReaderEl.classList.remove('active');
    this.viewLibraryEl.classList.add('active');
    if (window.location.hash !== '#/' && window.location.hash !== '') {
      window.history.replaceState({}, '', '#/');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (this.syllabusTree) {
      this.syllabusTree.render();
    }
  }

  /**
   * Handles hash URL routing on initial page boot.
   */
  handleInitialRoute() {
    const hash = window.location.hash;
    if (hash.startsWith('#/note/')) {
      const encoded = hash.replace('#/note/', '');
      const [noteIdPart, anchorPart] = encoded.split('#');
      const noteId = decodeURIComponent(noteIdPart);
      this.openNote(noteId);
    } else {
      this.showLibraryView();
    }
  }
}

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new GateNotesApp();
});
