# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the website for the **Old Trafford Action Group (OTAG)** — a residents' group in Old Trafford, Manchester, UK. The site is a single-page static HTML site deployed on Netlify.

## Architecture

The entire site lives in one self-contained file: **`index.html`** (~1,500 lines). There is no build system, no package manager, no framework, and no external JavaScript dependencies. CSS, HTML, and JavaScript are all inline in that single file.

**Structure of `index.html`:**
1. `<head>` — meta tags, Google Fonts (`Fraunces` for headings, `Be Vietnam Pro` for body), and all CSS inside a `<style>` block
2. `<body>` — HTML sections in this order: NAV → HERO → MISSION/ABOUT → OUR WORK → NEWS → MEETINGS → MEMBERSHIP → COMMUNITY → SOCIAL & EDUCATION → CONTACT → LIGHTBOX → FOOTER
3. `<script>` at the bottom — all JavaScript inline

**Netlify forms:** The membership and contact forms use `data-netlify="true"` with a hidden `form-name` input. Form submission is handled entirely by Netlify — there is no backend.

## CSS Design Tokens

All colours are defined as CSS custom properties on `:root`:

```
--green-dark: #154212    /* primary dark green, nav bg, headings */
--green-mid:  #2d5a27
--green-light: #3b6934
--green-pale: #f2f4f0    /* light tint background */
--green-fixed: #bcf0ae   /* hero h1 em highlight colour */
--amber: #815600          /* section labels */
--amber-light: #ffddb1
--amber-container: #ffc164  /* primary CTA button, divider bars */
--cream: #f8faf5          /* page background */
--stone: #42493e
--stone-light: #72796e
--ink: #191c1a            /* body text */
--white: #ffffff
--border: #c2c9bb
```

Always use these variables rather than hardcoded hex values for any new elements.

## JavaScript Features

All JS is in the inline `<script>` tag at the bottom of `<body>`:

- **Mobile nav** — hamburger toggles `.open` class on `#navLinks`
- **Stagger reveal** — `IntersectionObserver` adds `.visible` to `.reveal-stagger` elements when they enter the viewport; CSS transitions on `nth-child` selectors drive the stagger
- **Hero parallax** — scroll handler sets `--parallax-y` CSS variable on `.hero` to shift the `::before` gradient overlay
- **Hero carousel** — auto-advances every 4 s; dot nav and touch swipe supported; `goTo(index)` drives `translateX` on `#carouselTrack`
- **Before/after sliders** — `initSlider(wrapId, beforeId, handleId)` factory initialises drag/touch interaction on comparison sliders; currently two instances (`slider` and `sliderHullard`)
- **Lightbox** — click on `.work-gallery-item` opens `#lightbox`; close via button, backdrop click, or Escape key

## Deployment

The site is deployed on **Netlify**. Pushing to `main` triggers an automatic deploy. There is no build step — Netlify serves the static files directly.

## Making Changes

- Edit `index.html` directly — there is no compilation step.
- To preview locally, open `index.html` in a browser. Netlify form submissions will not work locally (they require the Netlify environment), but all other functionality is testable offline.
- Images are embedded as `data:` URIs directly in the HTML — they are not separate files. To update images, replace the base64 data URI value in the relevant `<img src="...">` or CSS `background-image`.
