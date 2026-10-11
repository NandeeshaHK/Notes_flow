/**
 * @file notifications.js
 * @description Manages version diff detection and notifications for notes that have received
 * updates or enhancements after the user previously marked them as read.
 */

import { ProgressStore } from '../storage/progress-store.js';

/**
 * @typedef {Object} UpdatedNoteAlert
 * @property {string} id - Canonical note ID.
 * @property {string} title - Note title.
 * @property {string} subjectTitle - Formatted subject title.
 * @property {string} stream - Stream key (GATE_CS or GATE_DA).
 * @property {string} oldVersion - The version user read previously (e.g. "v1.0").
 * @property {string} newVersion - Current version in catalog (e.g. "v1.1").
 * @property {string} updatedAt - Timestamp when new version was published.
 */

export class NotificationManager {
  /**
   * @param {Object} options
   * @param {HTMLElement} options.bannerEl - Top alert banner element.
   * @param {HTMLElement} options.modalEl - Updates list modal element.
   * @param {HTMLElement} options.overlayEl - Modal backdrop overlay.
   * @param {(noteId: string) => void} options.onSelectNote - Callback to open note.
   */
  constructor({ bannerEl, modalEl, overlayEl, onSelectNote }) {
    this.bannerEl = bannerEl;
    this.modalEl = modalEl;
    this.overlayEl = overlayEl;
    this.onSelectNote = onSelectNote;

    /** @type {UpdatedNoteAlert[]} */
    this.pendingUpdates = [];

    this.initEvents();
  }

  /**
   * Initializes event listeners for banner and modal.
   */
  initEvents() {
    this.bannerEl.addEventListener('click', (e) => {
      const target = /** @type {HTMLElement} */ (e.target);
      if (target.closest('.btn-dismiss-banner')) {
        this.bannerEl.classList.remove('visible');
        return;
      }
      this.openModal();
    });

    this.overlayEl.addEventListener('click', () => this.closeModal());

    const closeBtn = this.modalEl.querySelector('.btn-close-updates-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    // Delegate jump to updated note
    this.modalEl.addEventListener('click', (e) => {
      const target = /** @type {HTMLElement} */ (e.target);
      const row = target.closest('[data-note-id]');
      if (row) {
        const noteId = row.getAttribute('data-note-id');
        if (noteId) {
          this.closeModal();
          this.onSelectNote(noteId);
        }
      }
    });
  }

  /**
   * Scans catalog notes against user progress to find notes updated after being read.
   *
   * @param {Array<{ id: string, title: string, subjectTitle: string, stream: string, version: string, updatedAt: string }>} catalogNotes
   * @returns {UpdatedNoteAlert[]} List of updated notes.
   */
  checkForUpdates(catalogNotes) {
    const allProgress = ProgressStore.getAllProgress();
    this.pendingUpdates = [];

    for (const note of catalogNotes) {
      const progress = allProgress[note.id];
      if (progress && progress.isRead && progress.readVersion) {
        if (progress.readVersion !== note.version) {
          this.pendingUpdates.push({
            id: note.id,
            title: note.title,
            subjectTitle: note.subjectTitle,
            stream: note.stream,
            oldVersion: progress.readVersion,
            newVersion: note.version,
            updatedAt: note.updatedAt
          });
        }
      }
    }

    this.renderBanner();
    this.renderModal();

    return this.pendingUpdates;
  }

  /**
   * Renders the top announcement banner if updates exist.
   */
  renderBanner() {
    if (this.pendingUpdates.length === 0) {
      this.bannerEl.classList.remove('visible');
      this.bannerEl.innerHTML = '';
      return;
    }

    const count = this.pendingUpdates.length;
    const noteText = count === 1 ? '1 completed note has' : `${count} completed notes have`;

    this.bannerEl.innerHTML = `
      <div class="banner-inner">
        <span class="banner-icon">🔔</span>
        <span class="banner-text"><strong>Content Update:</strong> ${noteText} enhancements or formula additions!</span>
        <button class="btn-banner-action">View Updates (${count})</button>
        <button class="btn-dismiss-banner" title="Dismiss banner" aria-label="Dismiss">✕</button>
      </div>
    `;
    this.bannerEl.classList.add('visible');
  }

  /**
   * Renders the updates modal list.
   */
  renderModal() {
    const listContainer = this.modalEl.querySelector('.updates-list-container');
    if (!listContainer) return;

    if (this.pendingUpdates.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-updates-state">
          <p>✓ All your completed notes are up to date with the latest GATE syllabus!</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = this.pendingUpdates.map(item => `
      <div class="update-card" data-note-id="${item.id}">
        <div class="update-card-left">
          <span class="update-stream-badge ${item.stream}">${item.stream === 'GATE_CS' ? 'CS' : 'DA'}</span>
          <div class="update-title-group">
            <h4 class="update-note-title">${item.title}</h4>
            <span class="update-subject-subtitle">${item.subjectTitle}</span>
          </div>
        </div>
        <div class="update-card-right">
          <div class="version-diff-badge">
            <span class="ver-old">${item.oldVersion}</span>
            <span class="ver-arrow">➔</span>
            <span class="ver-new">${item.newVersion}</span>
          </div>
          <button class="btn-review-note">Review Topic</button>
        </div>
      </div>
    `).join('');
  }

  /**
   * Generates in-note notification banner if this specific note was updated.
   *
   * @param {string} noteId
   * @param {string} currentVersion
   * @param {() => void} onAcknowledge
   * @returns {HTMLElement | null} Rendered banner element or null.
   */
  createInNoteBanner(noteId, currentVersion, onAcknowledge) {
    const progress = ProgressStore.getNoteProgress(noteId);
    if (!progress.isRead || !progress.readVersion || progress.readVersion === currentVersion) {
      return null;
    }

    const banner = document.createElement('div');
    banner.className = 'in-note-update-alert';
    banner.innerHTML = `
      <div class="in-note-alert-content">
        <span class="in-note-alert-icon">🔄</span>
        <div class="in-note-alert-text">
          <strong>Note Enhanced to ${currentVersion}:</strong>
          New formulas or explanations were added after you completed this topic at <code>${progress.readVersion}</code>.
        </div>
      </div>
      <button class="btn-ack-update" title="Mark as Reviewed">
        ✓ Mark ${currentVersion} as Reviewed
      </button>
    `;

    const btnAck = banner.querySelector('.btn-ack-update');
    if (btnAck) {
      btnAck.addEventListener('click', () => {
        ProgressStore.acknowledgeUpdate(noteId, currentVersion);
        banner.remove();
        onAcknowledge();
      });
    }

    return banner;
  }

  openModal() {
    this.modalEl.classList.add('open');
    this.overlayEl.classList.add('visible');
    document.body.classList.add('modal-open');
  }

  closeModal() {
    this.modalEl.classList.remove('open');
    this.overlayEl.classList.remove('visible');
    document.body.classList.remove('modal-open');
  }
}
