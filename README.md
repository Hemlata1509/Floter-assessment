# Contour Studio: Frontend Assessment

A single-page responsive site built for the Floter AI React & Tailwind assessment: a marketing
homepage for a fictional digital-product studio ("Contour Studio"), with an interactive
"What we do" section and a contact form with client-side caching.

**Stack:** React 19 + TypeScript + Vite + Tailwind CSS 3 (no additional UI/form libraries — see
*Trade-offs* below).

## Running locally

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:3000`).

To produce a production build:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/   Header, Hero, WhatWeDo, Stats, ContactForm, Footer, Reveal
  data/         static copy/content, kept separate from components
  hooks/        useLocalStorage, useInView — small, single-purpose hooks
  types/        shared TypeScript interfaces
```

Each section of the page is its own component; `App.tsx` only composes them. `WhatWeDo` and
`ContactForm` hold their own local state — nothing here needed a global store.

## Animation & motion system

Motion is built from two small, reusable primitives rather than one-off effects scattered across
components:

- **`useInView`** (`src/hooks/useInView.ts`): a thin `IntersectionObserver` wrapper. Returns a ref
  and a boolean that flips to `true` the first time an element enters the viewport, then
  disconnects (no repeated re-triggering on scroll up/down).
- **`Reveal`** (`src/components/Reveal.tsx`): wraps any section content and fades/slides it in
  using `useInView`, with an optional `delay` for staggering. Used on the "What we do", "Track
  record" and "Got a question" headings/content so the page feels considered as you scroll, not
  static.

Both respect `prefers-reduced-motion`: `useInView` reveals content immediately for users who've
asked for reduced motion, and the global stylesheet (`src/index.css`) forces near-zero animation
durations as a second safety net.

Beyond scroll-reveal, the rest of the motion is deliberately restrained and tied to real
interaction, not decoration for its own sake:

- **Hero** : two slow, blurred ambient shapes drift in the background (`animate-float`); the
  featured image card lifts slightly and its gradient pans on hover; slide copy staggers in on
  change.
- **What we do** : the active column gets a one-time diagonal "sheen" sweep, its icon and bullet
  list stagger in, and inactive columns lift slightly on hover as an affordance that they're
  clickable.
- **Track record (new section, see below)** : numbers count up from 0 the first time they scroll
  into view, and two ambient glows pulse slowly behind them.
- **Buttons & links** : consistent, small hover/active states across the header, footer and form
  (underline sweep on nav links, lift + shadow on primary buttons, scale-down on press) so
  interactive elements feel consistent site-wide rather than each screen inventing its own hover
  style.

## New section: Track record

Added a stats/"impact" section between **What we do** and **Got a question** : a natural gap in
the original wireframe between the service pitch and the contact form, and a chance to show
concrete numbers (apps shipped, checkout speed improvement, etc.) rather than only prose claims.
Numbers count up on scroll using the same `useInView` hook as the rest of the reveal system, on a
dark section that visually breaks up the page rhythm (light → dark → light) instead of every
section sharing the same background.

## The "Creative Freedom" section

The brief specifically left the **"What we do"** and **"Got a question"** sections undesigned, so
those are where I made the most deliberate choices:

- **What we do** : the wireframe called for one column expanded at a time, with the newly
  clicked column expanding and the previous one collapsing. I built this as a real accordion:
  clicking a column animates its `flex-grow` (desktop) so the active column takes roughly 3× the
  space of the other two, revealing a headline, supporting copy and a short list of concrete
  deliverables. Inactive columns collapse to a label-only rail. On mobile this becomes a vertical
  accordion (one row open at a time) using a `grid-template-rows` transition, which animates height
  smoothly without needing a JS-measured height.
- I gave each offering (**Plan / Design / Implement**) its own colour identity that carries through
  from the wireframe's green/red/blue, but muted into a real palette (deep sage, brick, steel blue)
  so it reads as a design system rather than placeholder wireframe colour.
- **Got a question** : I added inline validation, a two-step confirmation flow (preview → confirm
  → success, as specified), and a "Welcome back" banner instead of silently pre-filling the form,
  so a returning visitor gets an explicit signal that their data was restored from this device
  rather than wondering why the form isn't empty.
- Hero image doubles as a small carousel (swipe on touch, dot/arrow controls on desktop) and opens
  an expanded popup at ~50% viewport width on click, per the wireframe annotation.

## Form handling & caching

- Form state is local (`useState`), validated on submit (name required, basic email shape,
  message required).
- On confirm, the submission (plus a timestamp) is written to `localStorage` via a small
  `useLocalStorage` hook — no backend, as specified.
- On reload, if a cached submission exists, the form pre-fills with the last submitted values and
  a dismissible "Welcome back, [Name]!" banner appears above the form.
- The confirm modal shows exactly what will be "sent" before it's cached; the success modal
  confirms the cache write.

## Trade-offs & shortcuts

- **No form library / headless UI primitives.** For a single form and two modals, adding React
  Hook Form or Radix would have added more surface area than it saved the brief specifically
  flagged this as something to avoid over-engineering. Modals are plain fixed-position overlays
  with `role="dialog"`/`aria-modal`, click-outside-to-close, and no focus trap yet, a real
  product would want one, plus `Esc`-to-close, noted here as the first thing I'd add with more
  time.
- **Images are gradients/colour blocks, not photography**, since the wireframe calls for
  "background images that are responsive to window resizing, you choose any" rather than source
  placeholder stock photos I used the accent palette so the section still reads as complete and
  on-brand without licensing questions.
- **Copy is original**, written for a fictional studio rather than lorem ipsum, since the brief
  asked for typography/product sense to be visible but it is illustrative content, not a real
  client's.
- **No double-click interaction.** The annotation mentions both click and double-click on the
  "What we do" columns; I judged a single, predictable click-to-expand interaction to be clearer
  UX than overloading click count, and used the "alternative view, if unhappy with the suggestion"
  allowance the brief explicitly gives.
- **Fonts** (Fraunces for display, Inter for body) load from Google Fonts via `<link>` tags in
  `index.html`, the only external network dependency in the project.
- **No animation library.** Motion is done with Tailwind keyframes/utilities plus one small
  `IntersectionObserver` hook, rather than pulling in Framer Motion enough for scroll-reveals,
  a count-up, and hover states without adding a runtime dependency for a page this size. The
  service icons in "What we do" are hand-written inline SVGs for the same reason (no icon library
  dependency for three icons).
