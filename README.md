# Asyncing

A client-only Markdown textbook built with React and TypeScript.

## Run it

```bash
npm install
npm run dev
```

## Add a chapter

Add a Markdown file anywhere under `src/content`. Files are discovered automatically when the app builds. Use optional frontmatter to control its placement and title:

```md
---
title: A chapter title
order: 2
---

# A chapter title
```

The custom renderer currently supports headings, paragraphs, blockquotes, ordered and unordered lists, horizontal rules, fenced code blocks, bold, emphasis, inline code, and links.
