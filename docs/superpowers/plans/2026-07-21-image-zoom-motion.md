# Subtle Ken Burns Zoom on Hero + Photo-Breaks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a slow, one-time 1.0→1.06 zoom to the hero background and to each of the three `.tk-photo-break` images, matching the design in `docs/superpowers/specs/2026-07-21-image-zoom-motion-design.md`.

**Architecture:** This is a static HTML/CSS/vanilla-JS site with no build step and no test framework — `index.html` contains everything (styles in a `<style>` block, markup in the body, one inline `<script>` at the bottom). The hero animates automatically via a CSS `@keyframes` animation on page load. The photo-breaks animate via a CSS `transition` that's triggered by extending the site's existing scroll-reveal `IntersectionObserver` (the same one that already drives `[data-reveal]` fade-ins) to also toggle a zoom class on `[data-zoom]` elements. Both use the site's one existing easing curve, `cubic-bezier(.16,1,.3,1)` (the CSS custom property `--tk-ease`, defined at the top of the `<style>` block), and both respect `prefers-reduced-motion`.

**Tech Stack:** Plain HTML/CSS/vanilla JS, single file (`index.html`), no build tooling for this feature.

## Global Constraints

- Scale cap for both hero and photo-breaks: `1.06` (from the spec — barely perceptible, not a visible "zoom effect")
- Hero duration: `16s`; photo-break duration: `12s` (from the spec)
- Easing: `cubic-bezier(.16,1,.3,1)` everywhere — this is the value of `--tk-ease`, already declared in `:root` in `index.html`. Use the literal `var(--tk-ease)`, not a hardcoded duplicate of the curve.
- Every new animation/transition MUST be disabled inside a `@media (prefers-reduced-motion: reduce)` block — this is non-negotiable site convention (see existing `.tk-shimmer` and `[data-reveal]` rules, both of which already do this).
- No pan, no looping/continuous motion — one-time zoom-in that settles and holds (from the spec's "Out of scope" section).
- No new JS libraries or build steps. Extend the existing inline `<script>` and existing `IntersectionObserver`, don't add a second one.

There is no automated test suite in this repo (static marketing site, no test framework, no CI test job — `package.json`'s only script is `build`, which builds the separate blog, unrelated to this feature). Verification in this plan is manual browser verification with exact steps, since that is the correct verification method for this stack — do not invent a test framework or add one as part of this feature.

---

### Task 1: Hero zoom

**Files:**
- Modify: `index.html:208` (the `.tk-hero` CSS rule)
- Modify: `index.html:398` (the `<section class="tk-hero">` markup)

**Interfaces:**
- Consumes: `--tk-ease` custom property (already defined in `:root`, no changes needed there)
- Produces: `.tk-hero-bg` class and `tk-kenburns` keyframes — not consumed by any other task, self-contained

- [ ] **Step 1: Change the `.tk-hero` CSS rule to remove the background image and add the new `.tk-hero-bg` layer**

Find this exact line (currently line 208):

```css
.tk-hero { position:relative; min-height:88vh; display:flex; align-items:flex-end; overflow:hidden; background-image:url('IMAGES/hero.jpg'); background-size:cover; background-position:center top; background-color:#ddd; }
```

Replace it with:

```css
.tk-hero { position:relative; min-height:88vh; display:flex; align-items:flex-end; overflow:hidden; background-color:#ddd; }
.tk-hero-bg { position:absolute; inset:0; background-image:url('IMAGES/hero.jpg'); background-size:cover; background-position:center top; animation:tk-kenburns 16s var(--tk-ease) forwards; }
@keyframes tk-kenburns { from { transform:scale(1); } to { transform:scale(1.06); } }
@media (prefers-reduced-motion: reduce) {
  .tk-hero-bg { animation:none; }
}
```

Note: `background-color:#ddd` stays on `.tk-hero` (the outer element) on purpose — it's the fallback color visible behind `.tk-hero-bg` if the image fails to load, since `.tk-hero-bg` has no background-color of its own.

- [ ] **Step 2: Add the `.tk-hero-bg` div to the hero markup**

Find this exact block (currently starting at line 398):

```html
<section class="tk-hero">
  <div class="tk-hero-overlay"></div>
  <div class="tk-hero-content">
```

Replace it with:

```html
<section class="tk-hero">
  <div class="tk-hero-bg"></div>
  <div class="tk-hero-overlay"></div>
  <div class="tk-hero-content">
```

- [ ] **Step 3: Manually verify in browser**

Run:

```bash
cd /Users/okaytk/Documents/GITHUB/OKAYTK-WEBSITE
python3 -m http.server 8765
```

Open `http://localhost:8765/` in a browser.

Expected:
- The hero photo is visible immediately (no flash of missing background, no broken-image icon).
- Over the next ~16 seconds, the hero photo slowly and subtly scales up, then stops — no jump, no bounce, no cropping artifacts at the edges (the `.tk-hero`'s `overflow:hidden` should clip the zoomed edges cleanly).
- The overlay gradient and hero text remain crisp and unaffected — only the photo layer moves.
- Open DevTools → Elements, select `.tk-hero-bg`, confirm in the Styles/Computed panel that `animation-name: tk-kenburns` and the element has no console errors.

- [ ] **Step 4: Verify reduced-motion behavior**

In Chrome DevTools: **⋮ menu → More tools → Rendering** → find **"Emulate CSS media feature prefers-reduced-motion"** → set to **"reduce"**. Reload the page.

Expected: the hero photo renders at its normal, non-zoomed scale and never animates — it should look identical whether you wait 1 second or 60 seconds.

Set the emulation back to "No emulation" when done.

- [ ] **Step 5: Commit**

```bash
cd /Users/okaytk/Documents/GITHUB/OKAYTK-WEBSITE
git add index.html
git commit -m "Add subtle Ken Burns zoom to hero image"
```

---

### Task 2: Photo-break zoom

**Files:**
- Modify: `index.html:301` (the `.tk-photo-break` CSS rule)
- Modify: `index.html:428, 489, 558` (the three `.tk-photo-break` divs)
- Modify: `index.html:670-693` (the scroll-reveal `IntersectionObserver` script)

**Interfaces:**
- Consumes: `--tk-ease` custom property (already defined, no changes needed)
- Consumes: the existing `IntersectionObserver` instance in the inline `<script>` block — this task extends it rather than creating a second observer
- Produces: `.tk-photo-break-img` class, `.tk-zoom-in` class, `[data-zoom]` attribute — not consumed by any other task

- [ ] **Step 1: Change the `.tk-photo-break` CSS rule and add the new `.tk-photo-break-img` layer**

Find this exact line (currently line 301):

```css
.tk-photo-break { width:100%; height:280px; border-top:0.5px solid var(--tk-border); border-bottom:0.5px solid var(--tk-border); overflow:hidden; background-size:cover; background-position:center; background-repeat:no-repeat; transition:transform .6s var(--tk-ease); }
```

Replace it with:

```css
.tk-photo-break { width:100%; height:280px; border-top:0.5px solid var(--tk-border); border-bottom:0.5px solid var(--tk-border); overflow:hidden; position:relative; }
.tk-photo-break-img { position:absolute; inset:0; background-size:cover; background-position:center; background-repeat:no-repeat; transform:scale(1); transition:transform 12s var(--tk-ease); }
.tk-photo-break-img.tk-zoom-in { transform:scale(1.06); }
@media (prefers-reduced-motion: reduce) {
  .tk-photo-break-img { transition:none; }
}
```

Note: the old rule's `transition:transform .6s var(--tk-ease)` was declared but nothing in the codebase ever triggered it — no `.tk-photo-break:hover` rule and no JS toggled a transform-changing class on it. It's being replaced, not preserved, because the new `.tk-photo-break-img` transition supersedes it.

Note: `position:relative` is added to `.tk-photo-break` because it didn't have a `position` declared before (it relied on background-image directly on itself, so it never needed to be a positioning context). `.tk-photo-break-img` is `position:absolute`, so its container now needs `position:relative` for `inset:0` to size it correctly.

- [ ] **Step 2: Move each photo-break's inline background-image onto a new inner div**

Find this exact line (currently line 428):

```html
<div class="tk-photo-break" style="background-image:url('IMAGES/OKAYWEB-2ND-HERO.jpg');" role="img" aria-label="OKAY TK DJing at a live event"></div>
```

Replace it with:

```html
<div class="tk-photo-break" data-zoom role="img" aria-label="OKAY TK DJing at a live event"><div class="tk-photo-break-img" style="background-image:url('IMAGES/OKAYWEB-2ND-HERO.jpg');"></div></div>
```

Find this exact line (currently line 489):

```html
<div class="tk-photo-break" style="background-image:url('IMAGES/OKAYWEB-3RD-HERO.jpg');" role="img" aria-label="OKAY TK DJing at an outdoor festival"></div>
```

Replace it with:

```html
<div class="tk-photo-break" data-zoom role="img" aria-label="OKAY TK DJing at an outdoor festival"><div class="tk-photo-break-img" style="background-image:url('IMAGES/OKAYWEB-3RD-HERO.jpg');"></div></div>
```

Find this exact line (currently line 558):

```html
<div class="tk-photo-break" style="background-image:url('IMAGES/OKAYWEB-4TH-HERO.jpg');" role="img" aria-label="OKAY TK behind the decks"></div>
```

Replace it with:

```html
<div class="tk-photo-break" data-zoom role="img" aria-label="OKAY TK behind the decks"><div class="tk-photo-break-img" style="background-image:url('IMAGES/OKAYWEB-4TH-HERO.jpg');"></div></div>
```

- [ ] **Step 3: Extend the scroll-reveal observer to also trigger the zoom**

Find this exact block (currently lines 670-693):

```html
  // Scroll reveal — progressive enhancement only. Anything visible on load
  // is left alone; only below-fold sections fade up as they scroll into view.
  (function () {
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    var els = document.querySelectorAll('[data-reveal]');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('tk-reveal-in');
          entry.target.classList.remove('tk-reveal-pending');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    els.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var alreadyVisible = rect.top < window.innerHeight * 0.92;
      if (!alreadyVisible) {
        el.classList.add('tk-reveal-pending');
        io.observe(el);
      }
    });
  }());
```

Replace it with:

```html
  // Scroll reveal — progressive enhancement only. Anything visible on load
  // is left alone; only below-fold sections fade up (or, for [data-zoom]
  // photo-breaks, zoom in) as they scroll into view.
  (function () {
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    var els = document.querySelectorAll('[data-reveal], [data-zoom]');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          if (el.hasAttribute('data-reveal')) {
            el.classList.add('tk-reveal-in');
            el.classList.remove('tk-reveal-pending');
          }
          if (el.hasAttribute('data-zoom')) {
            var img = el.querySelector('.tk-photo-break-img');
            if (img) img.classList.add('tk-zoom-in');
          }
          io.unobserve(el);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    els.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var alreadyVisible = rect.top < window.innerHeight * 0.92;
      if (alreadyVisible) return;
      if (el.hasAttribute('data-reveal')) {
        el.classList.add('tk-reveal-pending');
      }
      io.observe(el);
    });
  }());
```

Note on the `alreadyVisible` case: matching the existing comment's philosophy ("anything visible on load is left alone"), a photo-break that's already on-screen at load is never observed and never gets `.tk-zoom-in` added — it just sits at its resting `scale(1)` permanently. This is intentional, not a gap: it mirrors exactly how `[data-reveal]` elements already behave when already visible.

- [ ] **Step 4: Manually verify in browser**

With the server from Task 1 still running at `http://localhost:8765/` (or restart it if needed with `python3 -m http.server 8765` from the repo root), reload the page and scroll down slowly to the first photo-break (below the "About" section).

Expected:
- The photo-break image is fully visible and sharp the instant it enters the viewport — no flash, no broken image.
- As you keep scrolling (or just wait after it's centered in view), the image slowly zooms in over ~12 seconds and then stops.
- Repeat for the second and third photo-break images (`OKAYWEB-3RD-HERO.jpg`, `OKAYWEB-4TH-HERO.jpg`) — same behavior each time.
- Open DevTools Console — confirm there are no JavaScript errors (a missing `.tk-photo-break-img` child, for instance, would throw if the `querySelector` call above ever returned `null` unguarded — it's guarded with `if (img)`, so this should be silent even in an edge case, but confirm no errors appear regardless).

- [ ] **Step 5: Verify reduced-motion behavior**

In Chrome DevTools: **⋮ menu → More tools → Rendering** → set **"Emulate CSS media feature prefers-reduced-motion"** to **"reduce"**. Reload the page and scroll to each photo-break.

Expected: all three photo-break images render at normal scale and never zoom, regardless of how long you linger on them. Set the emulation back to "No emulation" when done.

- [ ] **Step 6: Verify existing scroll-reveal fades still work**

Still on `http://localhost:8765/` with no reduced-motion emulation active, scroll through the whole page (About, Events, Mixes, Clientele, Blog, Booking sections).

Expected: every section that previously faded up on scroll (the `[data-reveal]` elements) still fades up exactly as before — Task 2's changes to the observer must not have broken the existing reveal behavior for non-photo-break elements.

- [ ] **Step 7: Commit**

```bash
cd /Users/okaytk/Documents/GITHUB/OKAYTK-WEBSITE
git add index.html
git commit -m "Add subtle scroll-triggered zoom to photo-break images"
```
