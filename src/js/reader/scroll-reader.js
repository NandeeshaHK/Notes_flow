/**
 * @file scroll-reader.js
 * @description Continuous scroll technical reading engine for GATE Notes Flow.
 * Handles markdown rendering, link interception, scroll position tracking,
 * breadcrumbs, reading progress bar, and floating revision tools.
 */

import { MarkdownParser } from '../parser/md-parser.js';
import { LinkResolver } from '../parser/link-resolver.js';
import { ProgressStore } from '../storage/progress-store.js';

/**
 * @typedef {Object} NoteMeta
 * @property {string} id - Canonical note ID.
 * @property {string} title - Note title.
 * @property {string} version - Current version.
 * @property {string} updatedAt - Timestamp.
 * @property {string} stream - Stream key.
 * @property {string} subjectTitle - Formatted subject name.
 * @property {number} estimatedMinutes - Reading time.
 * @property {boolean} hasFormulas - Formulas included.
 */

export class ScrollReader {
  /**
   * @param {Object} options
   * @param {HTMLElement} options.viewportEl - Scrollable reading container.
   * @param {HTMLElement} options.contentEl - Container where markdown HTML is rendered.
   * @param {HTMLElement} options.progressBarEl - Top horizontal reading progress bar.
   * @param {HTMLElement} options.headerTitleEl - Top header title element.
   * @param {HTMLElement} options.headerVersionEl - Top header version badge element.
   * @param {HTMLElement} options.btnMarkReadEl - Mark as read button.
   * @param {HTMLElement} options.btnBookmarkEl - Bookmark button.
   * @param {HTMLElement} options.trailContainerEl - Breadcrumb navigation trail bar.
   * @param {HTMLElement} options.inNoteAlertContainerEl - Container for note update alert.
   * @param {(targetNoteId: string, anchor?: string) => void} options.onHopLink - Link click callback.
   * @param {(completed: boolean) => void} options.onReadStatusChanged - Read toggle callback.
   * @param {() => void} [options.onOpenFormulaDrawer] - Formula drawer callback.
   * @param {() => void} [options.onOpenToc] - Table of contents callback.
   * @param {(text: string) => void} [options.onToast] - Toast notification callback.
   */
  constructor({
    viewportEl,
    contentEl,
    progressBarEl,
    headerTitleEl,
    headerVersionEl,
    btnMarkReadEl,
    btnBookmarkEl,
    trailContainerEl,
    inNoteAlertContainerEl,
    onHopLink,
    onReadStatusChanged,
    onOpenFormulaDrawer,
    onOpenToc,
    onToast
  }) {
    this.viewportEl = viewportEl;
    this.contentEl = contentEl;
    this.progressBarEl = progressBarEl;
    this.headerTitleEl = headerTitleEl;
    this.headerVersionEl = headerVersionEl;
    this.btnMarkReadEl = btnMarkReadEl;
    this.btnBookmarkEl = btnBookmarkEl;
    this.trailContainerEl = trailContainerEl;
    this.inNoteAlertContainerEl = inNoteAlertContainerEl;
    this.onHopLink = onHopLink;
    this.onReadStatusChanged = onReadStatusChanged;
    this.onOpenFormulaDrawer = onOpenFormulaDrawer;
    this.onOpenToc = onOpenToc;
    this.onToast = onToast || console.log;

    /** @type {NoteMeta | null} */
    this.currentNoteMeta = null;
    this.scrollThrottleTimer = null;

    this.initScrollListener();
    this.initLinkInterception();
    this.initActionButtons();
  }

  /**
   * Initializes scroll tracking to update the reading progress bar and save coordinates.
   */
  initScrollListener() {
    window.addEventListener('scroll', () => {
      if (!this.currentNoteMeta) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0;

      if (this.progressBarEl) {
        this.progressBarEl.style.width = `${percent}%`;
      }

      // Throttle saving scroll position to storage
      if (!this.scrollThrottleTimer) {
        this.scrollThrottleTimer = setTimeout(() => {
          this.scrollThrottleTimer = null;
          if (this.currentNoteMeta) {
            ProgressStore.saveScrollPosition(this.currentNoteMeta.id, scrollTop, percent);

            // Auto-complete if read >= 95% of note
            if (percent >= 95) {
              const currentProgress = ProgressStore.getNoteProgress(this.currentNoteMeta.id);
              if (!currentProgress.isRead) {
                this.setReadStatus(true, false);
              }
            }
          }
        }, 200);
      }
    }, { passive: true });
  }

  /**
   * Intercepts clicks on relative markdown links, deep dives, cross-stream links, and anchors.
   */
  initLinkInterception() {
    this.contentEl.addEventListener('click', (e) => {
      const target = /** @type {HTMLElement} */ (e.target);

      // Copy Code button
      const copyBtn = target.closest('.btn-copy-code');
      if (copyBtn) {
        const rawCode = decodeURIComponent(copyBtn.getAttribute('data-code') || '');
        if (rawCode) {
          navigator.clipboard.writeText(rawCode).then(() => {
            this.onToast('Code snippet copied!');
          });
        }
        return;
      }

      // Link clicks
      const anchorEl = target.closest('a');
      if (!anchorEl) return;

      const href = anchorEl.getAttribute('href');
      if (!href) return;

      // Handle KaTeX or non-nav links
      if (href.startsWith('javascript:')) return;

      const currentId = this.currentNoteMeta?.id || '';
      const resolved = LinkResolver.resolve(currentId, href);

      if (resolved.type === 'note' && resolved.noteId) {
        e.preventDefault();
        this.onHopLink(resolved.noteId, resolved.anchor);
      } else if (resolved.type === 'anchor' && resolved.anchor) {
        e.preventDefault();
        const headingEl = document.getElementById(resolved.anchor) || document.querySelector(`[data-anchor="${resolved.anchor}"]`);
        if (headingEl) {
          headingEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (resolved.type === 'external') {
        anchorEl.setAttribute('target', '_blank');
        anchorEl.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  /**
   * Sets up header action buttons.
   */
  initActionButtons() {
    // Mark as read toggle button
    if (this.btnMarkReadEl) {
      this.btnMarkReadEl.addEventListener('click', () => {
        if (!this.currentNoteMeta) return;
        const currentProgress = ProgressStore.getNoteProgress(this.currentNoteMeta.id);
        const newStatus = !currentProgress.isRead;
        this.setReadStatus(newStatus, true);
      });
    }

    // Bookmark toggle button
    if (this.btnBookmarkEl) {
      this.btnBookmarkEl.addEventListener('click', () => {
        if (!this.currentNoteMeta) return;
        const newBookmark = ProgressStore.toggleBookmark(this.currentNoteMeta.id);
        this.updateBookmarkButton(newBookmark);
        this.onToast(newBookmark ? 'Topic Starred for Revision' : 'Bookmark Removed');
      });
    }
  }

  /**
   * Sets note read status and updates UI.
   *
   * @param {boolean} isRead
   * @param {boolean} showToast
   */
  setReadStatus(isRead, showToast = true) {
    if (!this.currentNoteMeta) return;

    if (isRead) {
      ProgressStore.markAsRead(this.currentNoteMeta.id, this.currentNoteMeta.version);
    } else {
      ProgressStore.markAsUnread(this.currentNoteMeta.id);
    }

    this.updateMarkReadButton(isRead);

    if (showToast) {
      this.onToast(isRead ? `✓ Marked "${this.currentNoteMeta.title}" as Completed` : 'Topic marked as unread');
    }

    if (this.onReadStatusChanged) {
      this.onReadStatusChanged(isRead);
    }
  }

  /**
   * Updates Mark as Read button styling and label.
   * @param {boolean} isRead
   */
  updateMarkReadButton(isRead) {
    if (!this.btnMarkReadEl) return;
    if (isRead) {
      this.btnMarkReadEl.classList.add('is-completed');
      this.btnMarkReadEl.innerHTML = `<span class="icon">✓</span> <span class="label">Completed</span>`;
    } else {
      this.btnMarkReadEl.classList.remove('is-completed');
      this.btnMarkReadEl.innerHTML = `<span class="icon">○</span> <span class="label">Mark as Read</span>`;
    }
  }

  /**
   * Updates Bookmark button state.
   * @param {boolean} isBookmarked
   */
  updateBookmarkButton(isBookmarked) {
    if (!this.btnBookmarkEl) return;
    this.btnBookmarkEl.classList.toggle('active', isBookmarked);
    this.btnBookmarkEl.innerHTML = isBookmarked ? '★' : '☆';
  }

  /**
   * Renders note markdown content into the viewport.
   *
   * @param {string} rawMarkdown - Raw markdown string.
   * @param {NoteMeta} noteMeta - Note metadata from catalog.
   */
  renderNote(rawMarkdown, noteMeta) {
    this.currentNoteMeta = noteMeta;

    // Header info
    if (this.headerTitleEl) {
      this.headerTitleEl.textContent = noteMeta.title;
    }
    if (this.headerVersionEl) {
      this.headerVersionEl.textContent = noteMeta.version;
    }

    // Render parsed markdown
    const renderedHtml = MarkdownParser.render(rawMarkdown);
    this.contentEl.innerHTML = renderedHtml;

    // Update buttons
    const progress = ProgressStore.getNoteProgress(noteMeta.id);
    this.updateMarkReadButton(progress.isRead);
    this.updateBookmarkButton(progress.isBookmarked);

    // Reset progress bar
    if (this.progressBarEl) {
      this.progressBarEl.style.width = '0%';
    }
  }

  /**
   * Updates breadcrumb navigation trail bar.
   *
   * @param {Array<{ noteId: string, title: string }>} trailStack
   * @param {(noteId: string) => void} onJumpBack
   */
  renderTrail(trailStack, onJumpBack) {
    if (!this.trailContainerEl) return;

    if (trailStack.length === 0) {
      this.trailContainerEl.style.display = 'none';
      this.trailContainerEl.innerHTML = '';
      return;
    }

    this.trailContainerEl.style.display = 'flex';
    const lastSource = trailStack[trailStack.length - 1];

    this.trailContainerEl.innerHTML = `
      <div class="trail-pill-group">
        <span class="trail-label">Hopped from:</span>
        <button class="btn-trail-jump" title="Return to ${lastSource.title}">
          ⤺ ${lastSource.title}
        </button>
      </div>
    `;

    const jumpBtn = this.trailContainerEl.querySelector('.btn-trail-jump');
    if (jumpBtn) {
      jumpBtn.addEventListener('click', () => {
        onJumpBack(lastSource.noteId);
      });
    }
  }
}
