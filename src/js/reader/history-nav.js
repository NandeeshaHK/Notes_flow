/**
 * @file history-nav.js
 * @description Manages note-to-note hopping navigation, in-memory history stack,
 * browser pushState/popstate integration, and exact scroll position restoration.
 */

/**
 * @typedef {Object} HistoryEntry
 * @property {string} noteId - Canonical note ID.
 * @property {string} title - Note title.
 * @property {number} scrollY - Exact vertical scroll coordinate when leaving.
 * @property {string} [anchor] - Target anchor heading if any.
 * @property {number} timestamp - Epoch timestamp of navigation.
 */

export class HistoryNavigation {
  /**
   * @param {Object} options
   * @param {(noteId: string, options: { restoreScrollY?: number, anchor?: string }) => Promise<void>} options.onLoadNote
   * @param {() => void} options.onReturnToLibrary
   * @param {(trail: HistoryEntry[]) => void} [options.onTrailChange]
   */
  constructor({ onLoadNote, onReturnToLibrary, onTrailChange }) {
    this.onLoadNote = onLoadNote;
    this.onReturnToLibrary = onReturnToLibrary;
    this.onTrailChange = onTrailChange;

    /** @type {HistoryEntry[]} */
    this.stack = [];
    /** @type {string | null} */
    this.currentNoteId = null;
    /** @type {string} */
    this.currentTitle = '';

    this.isNavigatingBack = false;
    this.initPopstateListener();
  }

  /**
   * Initializes browser back/forward popstate listener.
   */
  initPopstateListener() {
    window.addEventListener('popstate', (e) => {
      if (this.isNavigatingBack) return;

      const state = e.state;
      if (state && state.noteId) {
        // Find if this note exists in our stack to restore previous scroll
        const lastEntry = this.pop();
        if (lastEntry && lastEntry.noteId === state.noteId) {
          this.loadTarget(lastEntry.noteId, { restoreScrollY: lastEntry.scrollY, anchor: lastEntry.anchor });
        } else {
          this.loadTarget(state.noteId, { restoreScrollY: 0, anchor: state.anchor });
        }
      } else {
        // Return to Library
        this.clear();
        this.onReturnToLibrary();
      }
    });
  }

  /**
   * Records the active note identity.
   *
   * @param {string} noteId
   * @param {string} title
   */
  setCurrentNote(noteId, title) {
    this.currentNoteId = noteId;
    this.currentTitle = title;
    this.notifyTrail();
  }

  /**
   * Navigates to a new note while capturing the current note's exact scroll position.
   *
   * @param {string} targetNoteId - Target canonical note ID.
   * @param {string} [anchor] - Target heading anchor slug.
   */
  hopToNote(targetNoteId, anchor = '') {
    if (!this.currentNoteId) {
      this.loadTarget(targetNoteId, { anchor });
      return;
    }

    const currentScrollY = window.scrollY || document.documentElement.scrollTop || 0;

    // Push current position to stack
    this.stack.push({
      noteId: this.currentNoteId,
      title: this.currentTitle,
      scrollY: Math.round(currentScrollY),
      anchor,
      timestamp: Date.now()
    });

    // Update browser history
    const urlHash = `#/note/${encodeURIComponent(targetNoteId)}${anchor ? '#' + anchor : ''}`;
    window.history.pushState({ noteId: targetNoteId, anchor }, '', urlHash);

    this.notifyTrail();
    this.loadTarget(targetNoteId, { restoreScrollY: 0, anchor });
  }

  /**
   * Handles Back button action: pops previous note and restores its exact scroll position.
   *
   * @returns {boolean} True if a previous note was restored, false if stack was empty.
   */
  goBack() {
    if (this.stack.length === 0) {
      this.onReturnToLibrary();
      return false;
    }

    const previousEntry = this.stack.pop();
    if (!previousEntry) {
      this.onReturnToLibrary();
      return false;
    }

    this.isNavigatingBack = true;
    const urlHash = `#/note/${encodeURIComponent(previousEntry.noteId)}${previousEntry.anchor ? '#' + previousEntry.anchor : ''}`;
    window.history.replaceState({ noteId: previousEntry.noteId, anchor: previousEntry.anchor }, '', urlHash);

    this.notifyTrail();

    this.loadTarget(previousEntry.noteId, {
      restoreScrollY: previousEntry.scrollY,
      anchor: previousEntry.anchor
    }).finally(() => {
      this.isNavigatingBack = false;
    });

    return true;
  }

  /**
   * Loads a target note and scrolls to the exact position or anchor.
   *
   * @param {string} noteId
   * @param {{ restoreScrollY?: number, anchor?: string }} options
   */
  async loadTarget(noteId, options = {}) {
    await this.onLoadNote(noteId, options);

    // Apply scroll restoration after rendering completes
    requestAnimationFrame(() => {
      if (options.anchor) {
        const anchorEl = document.getElementById(options.anchor) || document.querySelector(`[data-anchor="${options.anchor}"]`);
        if (anchorEl) {
          anchorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }

      if (typeof options.restoreScrollY === 'number' && options.restoreScrollY > 0) {
        window.scrollTo({
          top: options.restoreScrollY,
          behavior: 'instant'
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
  }

  /**
   * Pops the topmost history item.
   * @returns {HistoryEntry | undefined}
   */
  pop() {
    return this.stack.pop();
  }

  /**
   * Checks if back navigation is available.
   * @returns {boolean}
   */
  canGoBack() {
    return this.stack.length > 0;
  }

  /**
   * Clears the navigation stack.
   */
  clear() {
    this.stack = [];
    this.notifyTrail();
  }

  /**
   * Notifies listeners of breadcrumb trail changes.
   */
  notifyTrail() {
    if (this.onTrailChange) {
      this.onTrailChange([...this.stack]);
    }
  }
}
