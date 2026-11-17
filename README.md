# NO SIGNAL — Experimental Fashion Experience

**NO SIGNAL. NO RULES. NO PERMISSION.**

An experimental fashion editorial built in **Framer**, combining immersive art direction, cinematic storytelling, and custom React/TypeScript interactions. The website is designed as an unstable digital transmission: visitors can disconnect, distort imagery, and navigate an unconventional fashion archive.

**[Explore the live website](https://no-signal-studio.framer.website)** · **[Open the Framer project](https://framer.com/projects/vwrjsUFQJgQXi4WNyGJr)**

> **Project type:** Self-initiated concept / creative development showcase. NO SIGNAL is a fictional fashion label, not a commercial store.

## Experience

### 01 — Cinematic opening
- Full-viewport editorial cover with oversized typography and scroll-responsive motion.
- Accessible navigation between the experience's chapters.
- **DISCONNECT / RECONNECT** toggles a visual failure state, stored for the browser session and communicated to other components.

### 02 — The Unreadable
- A full-bleed editorial interlude introducing the site's core idea: **“Your image is not data.”**
- Framer-native imagery, typography, layout and scroll entrance effects.

### 03 — Signal Interference Lab
- Interactive distortion slider with RGB-shifted image slices, interference lines and controlled signal failure.
- Three selectable looks, pointer-scanning feedback and animated image transitions.
- Responds to the opening's shared signal mode.

### 04 — Interactive Fashion Archive
- Four editorial identities with primary and alternate images.
- Original, monochrome and infrared visual modes.
- Thumbnail selection, previous/next controls, arrow-key navigation and swipe gestures.

### 05 — Manifesto
- Red-on-black editorial brand statement and closing transmission.

## Tech stack

| Technology | Role |
| --- | --- |
| **Framer** | Live website, page composition, native layouts and publishing |
| **React + TypeScript** | Custom, interactive UI components |
| **Framer Motion** | Visual transitions, scroll-responsive motion and reduced-motion support |
| **Custom component controls** | Editable images, labels and accent settings inside Framer |

## Source in this repository

```text
framer/
  NoSignalOpening.tsx
  SignalInterference.tsx
  SignalArchive.tsx
README.md
```

These are the **actual editable custom-component source files** from the Framer project. They are included as a code showcase and reference.

**Important:** This repository is **not** a standalone export of the entire Framer website. Native Framer canvas layers, fonts/style presets, responsive breakpoint arrangements and publishing settings remain in the linked Framer project. Cloning this repository alone will not recreate the published website. To edit and run the complete experience, use the Framer project above and integrate the component files into it.

The component files import `react`, `framer` and `framer-motion`; they are intended for use as **Framer code components**, not as a ready-to-run independent React application.

## Accessibility and responsive behavior

- Dedicated responsive layouts for desktop, tablet and mobile.
- Keyboard-accessible selectors, buttons and look navigation.
- Semantic image alt text and descriptive controls.
- Reduced-motion handling for the more intense animation and distortion effects.

## Creative direction

**Visual language:** editorial brutalism, heavy display typography, black/cream contrast, signal red, cropped fashion photography and intentional visual interference.

**Concept:** A fashion label that refuses the rules of the feed, replacing passive browsing with a sequence of interactive transmissions.

## Credits and usage

Concept, design and development: [radostradipetkova](https://github.com/radostradipetkova).

Fashion images are referenced through remote Unsplash URLs in the custom components and/or Framer content. Individual image rights and usage are governed by their original licenses. No ownership of third-party photography is claimed here.

No separate open-source license has been granted for this repository. All rights are reserved unless specified otherwise.
