# OKAY TK Website

## What This Is

Personal brand site for OKAY TK — DJ & event curator based in Halifax, NS. Booking site for corporate events, club nights, and special engagements.

Website: okaytk.com
Repo: heyokaytk/okaytk-website (GitHub)
Hosting: Cloudflare Workers, deployed via GitHub Actions (`.github/workflows/deploy.yml`) on push to `main` — no manual deploy step needed.

---

## Stack

Static HTML/CSS (`index.html`, `styles.css`), no frontend framework.
Build: `npm run build` (`build.js`) generates everything below. Run it before committing whenever events, posts, or the build itself change, and audit the generated output, not just the source. CI does NOT build; generated files are committed.
- Press kit: edit `press.json` (renders `/press/`; its `clients` list also fills the homepage Clientele grid).
- Events: edit `events.json` only (times are Halifax local, e.g. `"2026-10-23T17:00"`; `admission` is `free` | `tickets` (+ `ticketUrl`, optional `price`) | `soon`). Never hand-edit event rows or Event schema in `index.html`.
- Build outputs: `/events/<slug>/` pages + `event.ics`, `/events/` index (upcoming + past), blog pages from `posts/`, `sitemap.xml`, `llms.txt`, and the homepage regions between `<!-- build:NAME -->` markers (events schema, hero "Next up" badge, events list, newsletter signup, blog teaser).
- `site.js`: countdown badges, hides events that ended since the last build, hero "Next up", newsletter form submit (Formspree, same endpoint as booking, tagged `_subject: Newsletter signup`).
- `.assetsignore` keeps source/internal files (CLAUDE.md, build.js, events.json, posts/, docs/) from being served.
Deploy config: `wrangler.jsonc` (Cloudflare Workers). CI runs `cloudflare/wrangler-action` on push to `main`.
SEO files: `sitemap.xml`, `robots.txt`, Google Search Console verification file at root.

---

## Design System

`styles.css` holds the tokens and every component shared between pages; every page links it, the homepage included. The homepage's inline `<style>` holds only homepage sections (hero, about, flyer wall, mixes, clientele, booking form, mobile menu). Generated pages get their markup from `build.js` and their styles from `styles.css` only.

**Rules**
- No raw hex/rgba colours, font stacks or z-indexes in CSS or `build.js` templates. Use the `--tk-*` tokens; add a new token to `:root` in `styles.css` if one is genuinely missing.
- Don't redefine a `styles.css` rule in the homepage `<style>` block. Put the shared version in `styles.css`; only add a homepage override when the homepage really needs something different, and keep it to the property that differs.
- Reuse before inventing: `.tk-section-label`, `.tk-section-title`, `.tk-event-ticket` (square black button), `.tk-nav-cta` + `.tk-shimmer` for the primary CTA, `.tk-signup`, `data-reveal` for scroll reveals.

**Palette**: warm paper (`--tk-bg`) with near-black ink and one gold accent. `--tk-gold` for large type and icons only; `--tk-gold-deep` for any small gold text (AA contrast). `--tk-surface` is the one tone step for inputs and bands. Borders are 0.5px `--tk-border`.

**Type**: Bebas Neue (`--tk-font-display`) for headings, the name and big numbers; DM Sans 300 (`--tk-font-body`) for everything read in sentences. Small labels are 11–12px uppercase, tracked.

**Shape**: square corners everywhere (buttons, inputs, flyers). The primary action is a solid black square button; there is one per view, and it points at `/#booking` (or the ticket link on event pages).

---

## Pre-Commit / Pre-Push Audit

Before every `git commit` + `git push` on this site, run this audit on the diff being shipped. Act as a Principal Web Developer, UX/UI Expert, and Technical SEO Strategist. Give a rigorous, customized audit based on the actual code, copy, and architecture changed — not generic advice.

Audit across four pillars:

1. **UX/UI & Conversion Flow** — Does the change help or hurt the path to the primary CTA (Booking/Contact)? Any new friction points that could cause drop-off? Mobile responsiveness impact?
2. **Technical Architecture & Performance** — Is the code efficient? Any rendering roadblocks, bloated scripts, or structural issues introduced? Static site on Cloudflare Workers — check asset delivery (image sizes, render-blocking CSS/JS) and whether the blog build step is in sync with source Markdown.
3. **Technical & On-Page SEO** — Metadata, header hierarchy (H1/H2/H3), alt text — still optimized for target search intent after this change? New Schema Markup opportunity (Person, LocalBusiness, Event for gigs, BlogPosting)?
4. **Actionable Roadmap** — Prioritized checklist: Critical (fix before this push), High Impact (this week), Long-Term (this month).

Primary Goal: Convert visitors into DJ/event booking inquiries.
Target Audience: Event planners, corporate clients, venue/club bookers in Halifax and Nova Scotia.
Tech Stack Context: Static HTML/CSS on Cloudflare Workers, deployed via GitHub Actions on push to `main`. Blog pages are a build artifact from Markdown — verify the built output reflects the source change.

Scope the audit to the actual diff unless the change touches enough of the page to warrant a full-page pass. Present findings as a punch list. Don't block the commit — flag issues and let TK decide what to fix now vs. later.
