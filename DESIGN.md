---
name: compendiums.org
description: A clean atlas directory for independent game compendium projects.
---

# Design System: compendiums.org

## 1. Overview

**Creative North Star: "Clean Atlas"**

compendiums.org is a sparse directory for public game data, maps, and reference tools. It should feel maintained, precise, and slightly map-like without becoming parchment, fantasy UI, or a portal.

The shipped page is intentionally asset-only and text-light: one brand mark, one support action, one heading, one factual sentence, and three large destination links. Each linked project keeps its own hostname and visual identity.

The system explicitly rejects the generic SaaS landing page: no gradient hero, fake metrics, screenshot cards, startup superlatives, or inflated platform language.

**Key Characteristics:**

- Practical, technical, community-built.
- Clean atlas linework instead of game-specific ornament.
- Serif display typography with system sans support text.
- Three direct project links, with no visible status labels.
- Light and dark themes from the same restrained signal palette.

## 2. Colors

Use a restrained signal palette: neutral architecture plus a small teal/cyan signal accent. The accent should read like an atlas registration mark, not decorative color flooding.

### Tokens

- **Light background** (`--bg: oklch(0.985 0.004 230)`): near-white with a slight cool tint.
- **Dark background** (`--bg: oklch(0.14 0.025 245)`): near-black blue for dark mode.
- **Ink** (`--ink`): primary text; high contrast in both themes.
- **Muted Ink** (`--muted`): body copy only; must remain readable against the background.
- **Line** (`--line`, `--line-strong`): atlas arcs, card borders, and icon rings.
- **Surface** (`--surface`): translucent link rows with light tonal separation from the page.
- **Signal Accent** (`--accent`, `--accent-strong`): brand mark, arrows, focus treatment, and hover linework.

### Named Rules

**The Signal Rarity Rule.** Teal/cyan earns attention by being rare. Use it for navigation, focus, icon strokes, and the atlas marks only.

**The No-Parchment Rule.** Do not translate “game compendium” into cream paper, ornate borders, medieval styling, or fantasy-map beige.

## 3. Typography

**Display Font:** system serif stack (`ui-serif`, Georgia, Cambria, Times New Roman, serif)
**Body Font:** system sans stack (`ui-sans-serif`, system UI, Segoe UI, sans-serif)
**Label Font:** none in the current UI; avoid adding mono labels unless operational metadata becomes visible again.

**Character:** The serif display type carries the quiet atlas/book-register voice. Sans body copy keeps the factual directory sentence compact and readable. Do not add decorative font loading unless it materially improves the page; the static page should stay fast.

### Hierarchy

- **Brand**: serif, compact, paired with the four-point mark.
- **Display**: `Game Compendiums`; large serif, balanced on desktop, constrained on mobile to avoid horizontal overflow.
- **Body**: one factual sentence, 65ch or shorter, with a desktop-only line break.
- **Project title**: game name only. No “Compendium,” “Maps,” status chip, hostname, or description in the visible link label.

### Named Rules

**The Exact Names Rule.** Project link labels are exactly `Ancient Kingdoms`, `Ardenfall`, and `Erenshor`.

## 4. Layout

Desktop is centered and calm: brand, title, subtitle, and three link rows sit on one vertical axis. Mobile is left-aligned: the brand, heading, copy, and link rows follow the viewport edge while preserving breathing room.

The subtitle keeps an explicit `<br>` on desktop and hides that break on small screens. Mobile must not force horizontal scrolling; `.project-list`, `.project-link`, and `.project-link__name` all need `min-width: 0`.

## 5. Elevation

Default to tonal layering and borders rather than heavy shadows. Project links should feel drawn on a work surface, not floating like SaaS pricing cards. Hover/focus may add a small lift and signal line glow; reduced-motion removes transforms.

### Named Rules

**The Flat Until Touched Rule.** Surfaces are quiet at rest. Depth appears only through hover, focus, or active state.

## 6. Components

### Brand

The brand is the lowercase domain `compendiums.org` with the small atlas/star mark. Keep it linked to `/`.

### Support Link

Use one quiet header action linking to `https://ko-fi.com/wowmuch`. Desktop label: `Support on Ko-fi`. Mobile label: `Support`. Include the Ko-fi icon on the right, matching Ancient Kingdoms' support pattern, but keep the treatment quieter than the project links.

The support action is a utility link, not a campaign section. Do not add donation copy, pricing language, banners, or a footer appeal.

### Hero

The hero uses the visible title `Game Compendiums` and the factual sentence:

`A directory of public game data, maps, and reference tools for Ancient Kingdoms, Ardenfall, and Erenshor.`

### Project Links

Each project is a single large anchor row with an icon, exact game name, and arrow. Current hrefs:

- `Ancient Kingdoms` → `https://ancient-kingdoms.compendiums.org`
- `Ardenfall` → `https://ardenfall.compendiums.org`
- `Erenshor` → `https://erenshor-maps.wowmuch1.workers.dev`

Do not show `Available`; all listed projects are available by virtue of being linked.

### 404

The 404 page uses the same brand, atlas background, display type, and restrained copy. It should link back to `/`.

## 7. Do's and Don'ts

### Do:

- **Do** keep the page static and asset-only unless a real dynamic need appears.
- **Do** present Ancient Kingdoms, Ardenfall, and Erenshor as direct public links.
- **Do** use the signal accent sparingly for navigation, focus, and atlas marks.
- **Do** make keyboard focus visible and at least as prominent as hover.
- **Do** keep mobile overflow at zero horizontal scroll.
- **Do** keep the Ko-fi support link subordinate to the directory task.

### Don't:

- **Don't** use a generic SaaS landing page pattern: gradient hero, fake metrics, icon-card wallpaper, startup superlatives, or inflated platform language.
- **Don't** let one compendium's game-specific identity dominate the parent domain.
- **Don't** build a busy fandom portal with crowded navigation or lore-heavy density.
- **Don't** use fantasy parchment UI, ornate borders, or medieval styling as shorthand for “compendium.”
- **Don't** add status chips, hostnames, descriptions, screenshots, or footer copy unless the page needs that information to route visitors.
