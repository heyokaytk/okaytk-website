# OKAY TK Website

## What This Is

Personal brand site for OKAY TK — DJ & event curator based in Halifax, NS. Booking site for corporate events, club nights, and special engagements.

Website: okaytk.com
Repo: heyokaytk/okaytk-website (GitHub)
Hosting: Cloudflare Workers, deployed via GitHub Actions (`.github/workflows/deploy.yml`) on push to `main` — no manual deploy step needed.

---

## Stack

Static HTML/CSS (`index.html`, `styles.css`), no frontend framework.
Blog: Markdown posts in `posts/`, built to static pages via `build-blog.js` (`gray-matter` + `marked`) — run `npm run build` before committing if blog content changed, and audit the generated output, not just the source Markdown.
Deploy config: `wrangler.jsonc` (Cloudflare Workers). CI runs `cloudflare/wrangler-action` on push to `main`.
SEO files: `sitemap.xml`, `robots.txt`, Google Search Console verification file at root.

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
