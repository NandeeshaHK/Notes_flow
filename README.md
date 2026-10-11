# GATE Notes Flow • CS & DA Master Revision

> **Continuous, formula-ready revision notes for GATE Computer Science (CS) and Data Science & AI (DA)** with active recall, automated version tracking, note-hopping navigation, and AES-256 client-side protection.

---

## ⚡ Highlights

- **59 High-Yield Notes**: Covers all 11 GATE CS subjects and 8 GATE DA subjects, including comprehensive deep dives.
- **KaTeX Formula Rendering**: Full support for inline `$...$`, block `$$...$$`, LaTeX matrices, determinants, and integrations.
- **Seamless Markdown Link Hopping & Exact Position Memory**: Jump across notes, deep dives, and sister folders. The **Back** key restores the exact previous note and scroll position.
- **Automated Content-Hash Versioning**: Notes automatically increment versions (`v1.0` ➔ `v1.1`) when content changes.
- **Update Notifications**: Completed notes that receive updates alert the reader with a notification banner and in-note review button.
- **Active-Recall PYQ Reveal**: Previous Year Question answers are tucked inside interactive reveal accordions for active practice before viewing solutions.
- **Formula Quick Cheatsheet**: Slide-over drawer extracts all formulas from the current note with one-click "Copy LaTeX" support.
- **Client-Side AES-256 Encryption**: Notes and catalog are secured using AES-256-GCM.
  - **Access Key**: `gate`
- **Installable PWA**: Works 100% offline via Service Worker caching.

---

## 🚀 Quick Start

### 1. Install & Run Locally
```bash
# Install dependencies
npm install

# Re-index notes and auto-version
npm run index

# Start development server
npm run dev
```

### 2. Accessing the Notes
When opening the web application, enter the access key:
```
gate
```
*(You can also append `?key=gate` to the URL for automatic unlocking)*

---

## 📦 Build for Production / GitHub Pages
```bash
npm run build
```
The output will be bundled into `dist/` ready for hosting on GitHub Pages.
