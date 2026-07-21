# Subtle Ken Burns Zoom on Hero + Photo-Break Images

## Purpose

Add quiet, slow motion to the site's full-bleed photography (hero + the three
mid-page photo-break bands) to make the page feel more alive without
introducing anything that reads as flashy or gimmicky. Matches the site's
existing "quiet luxury" motion language: one easing curve everywhere
(`cubic-bezier(.16,1,.3,1)`), restrained scroll-reveals, and full respect for
`prefers-reduced-motion`.

## Scope

- `.tk-hero` background image (`index.html`)
- All three `.tk-photo-break` bands (`OKAYWEB-2ND-HERO.jpg`,
  `OKAYWEB-3RD-HERO.jpg`, `OKAYWEB-4TH-HERO.jpg`)
- No other images on the page (client grid, blog teaser, etc.) are in scope.

## Behavior

**Hero**: on page load, the background scales from 1.0 → 1.06 over ~16s using
the existing site ease, then holds at 1.06 — a single slow "breath in," not a
loop.

**Photo-breaks**: same 1.06x scale target and ease, but triggered when the
band scrolls into view rather than on page load — otherwise the animation
would finish long before a visitor scrolls that far down and no motion would
ever be perceived. This reuses the existing `IntersectionObserver` in the
inline script that currently drives `[data-reveal]` fade-ins, extended to also
toggle a zoom class on photo-break elements. Duration ~12s (shorter than the
hero since these bands are only 280px tall and pass by faster while
scrolling).

## Technical approach

Both the hero and photo-break elements currently carry their
`background-image` directly on the element that also defines their layout
(`.tk-hero`, `.tk-photo-break`), with `overflow:hidden` already set on both.
Animating `transform: scale()` directly on those elements would visually
bleed outside their own box (transform happens after layout, so a parent's
own `overflow:hidden` doesn't clip its own outward transform). The fix used
elsewhere for this exact problem — a dedicated inner absolutely-positioned
layer that carries the image and is the thing that transforms, while the
outer element (unchanged, still `overflow:hidden`) clips it:

- `.tk-hero` gets one new child, `.tk-hero-bg` (`position:absolute; inset:0`),
  which takes over the `background-image`/`background-size`/`background-position`
  currently declared on `.tk-hero` itself. `.tk-hero` becomes purely a
  positioning/clipping container.
- Each `.tk-photo-break` gets one new child, `.tk-photo-break-img`, and the
  inline `style="background-image:url(...)"` currently on the outer div moves
  onto this new inner div instead. The outer `.tk-photo-break` keeps its
  height/border/`overflow:hidden`, and its currently-unused
  `transition:transform .6s var(--tk-ease)` declaration is removed (it isn't
  wired to anything today and the new inner div takes over the transform).

**Hero animation**: CSS `@keyframes` on `.tk-hero-bg`
(`animation: tk-kenburns 16s cubic-bezier(.16,1,.3,1) forwards`), since it
should just play automatically on load with no JS involvement.

**Photo-break animation**: CSS `transition: transform 12s cubic-bezier(.16,1,.3,1)`
on `.tk-photo-break-img`, going from `scale(1)` to `scale(1.06)` when a
`.tk-zoom-in` class is added. That class is toggled by extending the existing
IntersectionObserver's query (`document.querySelectorAll('[data-reveal]')`)
to also match a new `[data-zoom]` attribute added to each `.tk-photo-break`,
and its callback to add `.tk-zoom-in` to matching elements (mirroring how it
already adds `.tk-reveal-in`).

**Reduced motion**: both the `@keyframes` animation and the transition are
disabled inside the existing
`@media (prefers-reduced-motion: reduce)` block, consistent with how
`[data-reveal]` and `.tk-shimmer` already behave — images simply render at
their final, non-zoomed scale with no animation.

## Out of scope / not doing

- No pan (Ken-Burns traditionally pans + zooms; this is zoom-only, since a
  pan risks cropping subjects awkwardly on already-tightly-cropped photos)
- No looping/continuous motion — rejected earlier in favor of a one-time
  settle, to avoid perpetual motion feeling busy on a page people linger on
- No JS animation library — pure CSS + the existing vanilla observer
