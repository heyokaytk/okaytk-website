# Event Section Month Labels

## Goal
In the "Upcoming Events" section of `index.html`, add a visual month divider above the first event of each month, so the list reads as grouped by month (e.g. JULY, then AUGUST) instead of one continuous list.

## Approach
Full-width divider row, styled consistently with the site's existing label conventions (`.tk-eyebrow`, `.tk-section-label`): uppercase, letter-spaced, display font, gold-deep accent color.

## Changes

**CSS** (near the `/* EVENTS */` block, index.html):
```css
.tk-event-month { font-family:var(--tk-font-display); font-size:14px; letter-spacing:0.2em; text-transform:uppercase; color:var(--tk-gold-deep); padding:14px 52px; border-top:0.5px solid var(--tk-border); }
```
Add matching responsive padding overrides alongside the existing `.tk-event-row` breakpoints (52px → 24px).

**HTML** (within `#events`):
- Insert `<div class="tk-event-month">JULY</div>` immediately before the first July event row (Canada Day / Halifax Wanderers, July 1st).
- Insert `<div class="tk-event-month">AUGUST</div>` immediately before the first August event row (Shore Club w/ Skratch Bastid, August 7th).
- No changes to existing `.tk-event-row` markup.
- Month name only, no year.

## Out of scope
- No JS/templating for automatic month grouping — events list is static HTML, edited by hand, so labels are inserted manually to match.
- Not touching the unrelated pending changes already in the working tree (deleted hero images, other index.html edits).

## Testing
Visual check in browser: confirm JULY divider appears above the Canada Day event, AUGUST divider appears above the Shore Club event, and styling matches site's existing label aesthetic across desktop/tablet/mobile widths.
