/**
 * @file progress-store.js
 * @description Local persistence engine for GATE Notes Flow.
 * Tracks per-note reading progress, completion status, readVersion for change detection,
 * scroll coordinates, bookmarking, and reader settings.
 */

/**
 * @typedef {Object} NoteProgressRecord
 * @property {boolean} isRead - Whether the note is marked as completed/read.
 * @property {string} readVersion - Version string when the note was marked as read (e.g. "v1.0").
 * @property {number} readTimestamp - Epoch timestamp of completion.
 * @property {number} scrollY - Exact vertical scroll offset in pixels.
 * @property {number} scrollPercent - Reading progress percentage (0 - 100).
 * @property {boolean} isBookmarked - Whether note is starred for quick revision.
 */

/**
 * @typedef {Object} LastReadPointer
 * @property {string} noteId - Canonical note ID.
 * @property {string} title - Note title.
 * @property {string} stream - Stream key (GATE_CS or GATE_DA).
 * @property {number} scrollY - Saved scroll coordinate.
 * @property {number} timestamp - Epoch timestamp when last visited.
 */

const STORAGE_KEYS = {
  NOTES_PROGRESS: 'gnf_notes_progress_v1',
  LAST_READ: 'gnf_last_read_v1',
  ACTIVE_STREAM: 'gnf_active_stream_v1',
  THEME: 'gnf_theme_v1',
  FONT_SIZE_PX: 'gnf_font_size_v1',
  PYQ_AUTO_COLLAPSE: 'gnf_pyq_auto_collapse_v1',
  PASSPHRASE: 'gnf_passphrase_v1'
};

export const ProgressStore = {
  /**
   * Retrieves saved decryption passphrase from sessionStorage or localStorage.
   * @returns {string | null}
   */
  getPassphrase() {
    return sessionStorage.getItem(STORAGE_KEYS.PASSPHRASE) || localStorage.getItem(STORAGE_KEYS.PASSPHRASE);
  },

  /**
   * Saves decryption passphrase.
   * @param {string} passphrase
   * @param {boolean} [remember=true]
   */
  setPassphrase(passphrase, remember = true) {
    sessionStorage.setItem(STORAGE_KEYS.PASSPHRASE, passphrase);
    if (remember) {
      localStorage.setItem(STORAGE_KEYS.PASSPHRASE, passphrase);
    }
  },

  /**
   * Clears saved passphrase.
   */
  clearPassphrase() {
    sessionStorage.removeItem(STORAGE_KEYS.PASSPHRASE);
    localStorage.removeItem(STORAGE_KEYS.PASSPHRASE);
  },
  /**
   * Loads all note progress records from localStorage.
   * @returns {Record<string, NoteProgressRecord>} Map of noteId -> progress record.
   */
  getAllProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.NOTES_PROGRESS);
      return raw ? JSON.parse(raw) : {};
    } catch (err) {
      console.warn('⚠️ Could not load notes progress:', err);
      return {};
    }
  },

  /**
   * Retrieves progress record for a specific note.
   * @param {string} noteId - Canonical note ID.
   * @returns {NoteProgressRecord} Note progress or default record.
   */
  getNoteProgress(noteId) {
    const all = this.getAllProgress();
    return all[noteId] || {
      isRead: false,
      readVersion: '',
      readTimestamp: 0,
      scrollY: 0,
      scrollPercent: 0,
      isBookmarked: false
    };
  },

  /**
   * Updates or patches progress for a specific note.
   * @param {string} noteId - Canonical note ID.
   * @param {Partial<NoteProgressRecord>} patch - Partial update to apply.
   */
  saveNoteProgress(noteId, patch) {
    const all = this.getAllProgress();
    const current = all[noteId] || {
      isRead: false,
      readVersion: '',
      readTimestamp: 0,
      scrollY: 0,
      scrollPercent: 0,
      isBookmarked: false
    };

    all[noteId] = { ...current, ...patch };
    try {
      localStorage.setItem(STORAGE_KEYS.NOTES_PROGRESS, JSON.stringify(all));
    } catch (err) {
      console.warn('⚠️ LocalStorage quota exceeded or error:', err);
    }
  },

  /**
   * Marks a note as completed/read with its current version.
   * @param {string} noteId - Canonical note ID.
   * @param {string} currentVersion - Note's current version (e.g. "v1.1").
   */
  markAsRead(noteId, currentVersion) {
    this.saveNoteProgress(noteId, {
      isRead: true,
      readVersion: currentVersion,
      readTimestamp: Date.now(),
      scrollPercent: 100
    });
  },

  /**
   * Marks a note as unread.
   * @param {string} noteId - Canonical note ID.
   */
  markAsUnread(noteId) {
    this.saveNoteProgress(noteId, {
      isRead: false,
      readVersion: '',
      readTimestamp: 0
    });
  },

  /**
   * Toggles bookmark/starred status for a note.
   * @param {string} noteId - Canonical note ID.
   * @returns {boolean} New bookmark status.
   */
  toggleBookmark(noteId) {
    const current = this.getNoteProgress(noteId);
    const updated = !current.isBookmarked;
    this.saveNoteProgress(noteId, { isBookmarked: updated });
    return updated;
  },

  /**
   * Saves exact scroll position and reading percentage for a note.
   * @param {string} noteId - Canonical note ID.
   * @param {number} scrollY - Vertical scroll offset.
   * @param {number} scrollPercent - Reading percentage (0 - 100).
   */
  saveScrollPosition(noteId, scrollY, scrollPercent) {
    this.saveNoteProgress(noteId, {
      scrollY: Math.max(0, Math.round(scrollY)),
      scrollPercent: Math.min(100, Math.max(0, Math.round(scrollPercent)))
    });
  },

  /**
   * Checks if a previously read note has an updated version available.
   * @param {string} noteId - Canonical note ID.
   * @param {string} currentCatalogVersion - Note version in catalog.
   * @returns {boolean} True if note was read previously at an older version.
   */
  hasUpdateNotification(noteId, currentCatalogVersion) {
    const progress = this.getNoteProgress(noteId);
    if (!progress.isRead || !progress.readVersion) {
      return false;
    }
    return progress.readVersion !== currentCatalogVersion;
  },

  /**
   * Acknowledges that the user has reviewed the updated note version.
   * @param {string} noteId - Canonical note ID.
   * @param {string} newVersion - Newly acknowledged version.
   */
  acknowledgeUpdate(noteId, newVersion) {
    this.saveNoteProgress(noteId, {
      readVersion: newVersion,
      readTimestamp: Date.now()
    });
  },

  /**
   * Saves the last visited note pointer for quick resumption.
   * @param {LastReadPointer} pointer
   */
  setLastRead(pointer) {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_READ, JSON.stringify(pointer));
    } catch (err) {
      console.warn('⚠️ Could not save last read:', err);
    }
  },

  /**
   * Retrieves the last visited note pointer.
   * @returns {LastReadPointer | null}
   */
  getLastRead() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.LAST_READ);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  /**
   * Active Stream selection ('GATE_CS' | 'GATE_DA' | 'ALL').
   * @returns {string} Stream key.
   */
  getActiveStream() {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_STREAM) || 'GATE_CS';
  },

  /**
   * Saves active stream selection.
   * @param {string} streamKey
   */
  setActiveStream(streamKey) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_STREAM, streamKey);
  },

  /**
   * Theme ('dark' | 'parchment' | 'light').
   * @returns {string} Theme key.
   */
  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  },

  /**
   * Sets app theme and applies data attribute to documentElement.
   * @param {string} theme - 'dark' | 'parchment' | 'light'.
   */
  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);
  },

  /**
   * Reader Font Size in Pixels (default 18px for long study).
   * @returns {number} Font size in px.
   */
  getFontSize() {
    const val = localStorage.getItem(STORAGE_KEYS.FONT_SIZE_PX);
    return val ? parseInt(val, 10) : 18;
  },

  /**
   * Sets Reader Font Size.
   * @param {number} sizePx
   */
  setFontSize(sizePx) {
    localStorage.setItem(STORAGE_KEYS.FONT_SIZE_PX, sizePx.toString());
    document.documentElement.style.setProperty('--reader-font-size', `${sizePx}px`);
  }
};
