/**
 * @file syllabus-tree.js
 * @description Hierarchical Syllabus and Topic Navigation Tree for GATE Notes Flow.
 * Renders subject accordions, completion progress bars, filter tabs (Unread/Completed/Updated),
 * and stream switcher (GATE CS vs GATE DA).
 */

import { ProgressStore } from '../storage/progress-store.js';

/**
 * @typedef {Object} NoteItem
 * @property {string} id - Canonical note ID.
 * @property {string} title - Note title.
 * @property {string} stream - Stream key (GATE_CS or GATE_DA).
 * @property {string} subjectKey - Subject folder key.
 * @property {string} subjectTitle - Formatted subject name.
 * @property {string} version - Current note version (e.g. "v1.1").
 * @property {string} updatedAt - Timestamp.
 * @property {number} wordCount - Word count.
 * @property {number} estimatedMinutes - Reading time.
 * @property {boolean} hasFormulas - Has math.
 * @property {boolean} hasPyqs - Has PYQs.
 * @property {boolean} isDeepDive - Is in deep dives folder.
 */

export class SyllabusTree {
  /**
   * @param {Object} options
   * @param {HTMLElement} options.containerEl - DOM element where the syllabus is rendered.
   * @param {HTMLElement} options.progressSummaryEl - Summary progress stats bar element.
   * @param {Array<{ key: string, label: string }>} options.streams - Available streams.
   * @param {NoteItem[]} options.notes - All indexed notes.
   * @param {(noteId: string) => void} options.onSelectNote - Note selection callback.
   * @param {(noteId: string) => void} [options.onToggleBookmark] - Bookmark callback.
   */
  constructor({ containerEl, progressSummaryEl, streams, notes, onSelectNote, onToggleBookmark }) {
    this.containerEl = containerEl;
    this.progressSummaryEl = progressSummaryEl;
    this.streams = streams;
    this.notes = notes;
    this.onSelectNote = onSelectNote;
    this.onToggleBookmark = onToggleBookmark;

    this.activeStream = ProgressStore.getActiveStream();
    this.activeFilter = 'ALL'; // 'ALL' | 'UNREAD' | 'IN_PROGRESS' | 'COMPLETED' | 'UPDATED' | 'BOOKMARKED'
    this.searchQuery = '';
    this.collapsedSubjects = new Set();

    this.initEvents();
  }

  /**
   * Initializes delegated event listeners for subject accordion toggles,
   * topic clicks, and bookmark toggles.
   */
  initEvents() {
    this.containerEl.addEventListener('click', (e) => {
      const target = /** @type {HTMLElement} */ (e.target);

      // Bookmark button clicked
      const btnBookmark = target.closest('.btn-topic-bookmark');
      if (btnBookmark) {
        e.stopPropagation();
        const noteId = btnBookmark.getAttribute('data-note-id');
        if (noteId) {
          const newState = ProgressStore.toggleBookmark(noteId);
          btnBookmark.classList.toggle('active', newState);
          btnBookmark.setAttribute('aria-label', newState ? 'Remove Bookmark' : 'Bookmark Topic');
          if (this.onToggleBookmark) this.onToggleBookmark(noteId);
        }
        return;
      }

      // Subject Accordion Header clicked
      const subjectHeader = target.closest('.subject-accordion-header');
      if (subjectHeader) {
        const subjectKey = subjectHeader.getAttribute('data-subject-key');
        if (subjectKey) {
          const body = subjectHeader.nextElementSibling;
          if (body) {
            const isCollapsed = this.collapsedSubjects.has(subjectKey);
            if (isCollapsed) {
              this.collapsedSubjects.delete(subjectKey);
              subjectHeader.classList.remove('collapsed');
              body.classList.remove('collapsed');
            } else {
              this.collapsedSubjects.add(subjectKey);
              subjectHeader.classList.add('collapsed');
              body.classList.add('collapsed');
            }
          }
        }
        return;
      }

      // Topic Card clicked
      const topicCard = target.closest('.topic-card');
      if (topicCard) {
        const noteId = topicCard.getAttribute('data-note-id');
        if (noteId) {
          this.onSelectNote(noteId);
        }
      }
    });
  }

  /**
   * Sets active stream filter and re-renders tree.
   * @param {string} streamKey - 'GATE_CS' | 'GATE_DA' | 'ALL'
   */
  setStream(streamKey) {
    this.activeStream = streamKey;
    ProgressStore.setActiveStream(streamKey);
    this.render();
  }

  /**
   * Sets filter (e.g. Unread, Completed, Updated).
   * @param {string} filter
   */
  setFilter(filter) {
    this.activeFilter = filter;
    this.render();
  }

  /**
   * Updates search query for live filtering.
   * @param {string} query
   */
  setSearchQuery(query) {
    this.searchQuery = query.trim().toLowerCase();
    this.render();
  }

  /**
   * Checks if a topic is shared across both GATE CS and GATE DA.
   *
   * @param {NoteItem} note
   * @returns {boolean}
   */
  isSharedTopic(note) {
    const filename = note.id.split('/').pop()?.toLowerCase();
    if (!filename || filename === 'readme.md') return false;

    // Check if another note in opposite stream has the same filename
    const otherStream = note.stream === 'GATE_CS' ? 'GATE_DA' : 'GATE_CS';
    return this.notes.some(n => n.stream === otherStream && n.id.toLowerCase().endsWith('/' + filename));
  }

  /**
   * Renders the complete syllabus hierarchy and progress metrics.
   */
  render() {
    const allProgress = ProgressStore.getAllProgress();

    // 1. Filter notes by stream
    let filteredNotes = this.notes;
    if (this.activeStream !== 'ALL') {
      filteredNotes = filteredNotes.filter(n => n.stream === this.activeStream);
    }

    // Calculate metrics for active stream
    const totalNotes = filteredNotes.length;
    let completedCount = 0;
    let inProgressCount = 0;
    let updatedCount = 0;
    let bookmarkedCount = 0;

    filteredNotes.forEach(note => {
      const p = allProgress[note.id];
      if (p) {
        if (p.isRead) {
          completedCount++;
          if (p.readVersion && p.readVersion !== note.version) {
            updatedCount++;
          }
        } else if (p.scrollPercent > 0) {
          inProgressCount++;
        }
        if (p.isBookmarked) {
          bookmarkedCount++;
        }
      }
    });

    const completionPercent = totalNotes > 0 ? Math.round((completedCount / totalNotes) * 100) : 0;

    // Render Progress Summary Header
    if (this.progressSummaryEl) {
      this.progressSummaryEl.innerHTML = `
        <div class="progress-stats-row">
          <div class="progress-stat-pill">
            <span class="stat-num">${completedCount}/${totalNotes}</span>
            <span class="stat-label">Completed (${completionPercent}%)</span>
          </div>
          <div class="progress-stat-pill">
            <span class="stat-num">${inProgressCount}</span>
            <span class="stat-label">In Progress</span>
          </div>
          ${updatedCount > 0 ? `
            <div class="progress-stat-pill stat-pill-updated">
              <span class="stat-num">🔄 ${updatedCount}</span>
              <span class="stat-label">Updated Notes</span>
            </div>
          ` : ''}
          <div class="progress-stat-pill">
            <span class="stat-num">★ ${bookmarkedCount}</span>
            <span class="stat-label">Starred</span>
          </div>
        </div>
        <div class="global-progress-track">
          <div class="global-progress-fill" style="width: ${completionPercent}%"></div>
        </div>
      `;
    }

    // 2. Apply secondary filters (Unread, Completed, Updated, Starred)
    let displayNotes = filteredNotes;
    if (this.activeFilter === 'UNREAD') {
      displayNotes = displayNotes.filter(n => !allProgress[n.id]?.isRead);
    } else if (this.activeFilter === 'COMPLETED') {
      displayNotes = displayNotes.filter(n => !!allProgress[n.id]?.isRead);
    } else if (this.activeFilter === 'IN_PROGRESS') {
      displayNotes = displayNotes.filter(n => !allProgress[n.id]?.isRead && (allProgress[n.id]?.scrollPercent || 0) > 0);
    } else if (this.activeFilter === 'UPDATED') {
      displayNotes = displayNotes.filter(n => {
        const p = allProgress[n.id];
        return p && p.isRead && p.readVersion && p.readVersion !== n.version;
      });
    } else if (this.activeFilter === 'BOOKMARKED') {
      displayNotes = displayNotes.filter(n => !!allProgress[n.id]?.isBookmarked);
    }

    // 3. Apply Search Query if present
    if (this.searchQuery) {
      displayNotes = displayNotes.filter(n =>
        n.title.toLowerCase().includes(this.searchQuery) ||
        n.subjectTitle.toLowerCase().includes(this.searchQuery) ||
        n.id.toLowerCase().includes(this.searchQuery)
      );
    }

    if (displayNotes.length === 0) {
      this.containerEl.innerHTML = `
        <div class="syllabus-empty-state">
          <p>🔍 No revision notes found matching the selected filter or search.</p>
        </div>
      `;
      return;
    }

    // Group display notes by subject
    /** @type {Map<string, { title: string, stream: string, notes: NoteItem[] }>} */
    const subjectsMap = new Map();

    displayNotes.forEach(note => {
      const groupKey = `${note.stream}__${note.subjectKey}`;
      if (!subjectsMap.has(groupKey)) {
        subjectsMap.set(groupKey, {
          title: note.subjectTitle,
          stream: note.stream,
          notes: []
        });
      }
      subjectsMap.get(groupKey)?.notes.push(note);
    });

    // Render subject accordions
    let html = '';
    for (const [groupKey, group] of subjectsMap.entries()) {
      const isCollapsed = this.collapsedSubjects.has(groupKey);
      const subTotal = group.notes.length;
      const subCompleted = group.notes.filter(n => !!allProgress[n.id]?.isRead).length;
      const subPercent = subTotal > 0 ? Math.round((subCompleted / subTotal) * 100) : 0;

      html += `
        <section class="subject-accordion" data-subject-group="${groupKey}">
          <header class="subject-accordion-header ${isCollapsed ? 'collapsed' : ''}" data-subject-key="${groupKey}">
            <div class="subject-header-title-box">
              <span class="accordion-arrow">▼</span>
              <h3 class="subject-accordion-title">${group.title}</h3>
              <span class="subject-stream-badge ${group.stream}">${group.stream === 'GATE_CS' ? 'CS' : 'DA'}</span>
            </div>
            <div class="subject-header-meta">
              <span class="subject-progress-pill">${subCompleted}/${subTotal} Read (${subPercent}%)</span>
            </div>
          </header>
          <div class="subject-accordion-body ${isCollapsed ? 'collapsed' : ''}">
            <div class="topics-grid">
              ${group.notes.map(note => this.renderTopicCard(note, allProgress[note.id])).join('')}
            </div>
          </div>
        </section>
      `;
    }

    this.containerEl.innerHTML = html;
  }

  /**
   * Renders an individual topic card with version and read status.
   *
   * @param {NoteItem} note
   * @param {Object} [progress]
   * @returns {string} Card HTML string.
   */
  renderTopicCard(note, progress) {
    const isRead = !!progress?.isRead;
    const isBookmarked = !!progress?.isBookmarked;
    const scrollPercent = progress?.scrollPercent || 0;
    const isShared = this.isSharedTopic(note);

    // Check version update alert
    const isUpdatedSinceRead = isRead && progress?.readVersion && progress.readVersion !== note.version;

    let statusBadge = `<span class="badge-status badge-unread">○ Unread</span>`;
    if (isUpdatedSinceRead) {
      statusBadge = `<span class="badge-status badge-updated" title="Content enhanced since last read!">🔄 ${note.version} Updated</span>`;
    } else if (isRead) {
      statusBadge = `<span class="badge-status badge-completed">✓ Completed</span>`;
    } else if (scrollPercent > 0) {
      statusBadge = `<span class="badge-status badge-progress">⏳ ${scrollPercent}%</span>`;
    }

    return `
      <div class="topic-card ${isRead ? 'is-read' : ''} ${isUpdatedSinceRead ? 'is-updated' : ''}" data-note-id="${note.id}">
        <div class="topic-card-top">
          <div class="topic-badges">
            ${statusBadge}
            <span class="badge-version">${note.version}</span>
            ${isShared ? `<span class="badge-shared" title="Topic syllabus overlaps both GATE CS & DA">CS+DA Shared</span>` : ''}
            ${note.isDeepDive ? `<span class="badge-deep-dive">Deep Dive</span>` : ''}
          </div>
          <button class="btn-topic-bookmark ${isBookmarked ? 'active' : ''}" data-note-id="${note.id}" aria-label="Bookmark Topic">
            ${isBookmarked ? '★' : '☆'}
          </button>
        </div>

        <h4 class="topic-title">${note.title}</h4>

        <div class="topic-card-footer">
          <span class="topic-time">⏱️ ${note.estimatedMinutes} min read</span>
          <div class="topic-features">
            ${note.hasFormulas ? `<span class="feature-tag" title="Formulas included">📐 Math</span>` : ''}
            ${note.hasPyqs ? `<span class="feature-tag" title="GATE PYQs included">🎯 PYQs</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }
}
