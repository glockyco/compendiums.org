---
name: compendiums.org
description: A clean atlas directory for independent game compendium projects.
---

# Design System: compendiums.org

## 1. Overview

**Creative North Star: "Clean Atlas"**

compendiums.org is a sparse directory for public game data, maps, and reference tools. It should feel maintained, precise, and slightly map-like without becoming parchment, fantasy UI, or a portal.

The shipped page is intentionally static and text-light: one brand mark, one support action, one heading, one factual sentence, and five large destination links grouped by release readiness. Available projects use current screenshots to show the tools before a visitor follows the link. Each linked project keeps its own hostname and visual identity.

The system explicitly rejects the generic SaaS landing page: no gradient hero, fake metrics, screenshot cards, startup superlatives, or inflated platform language.

**Key Characteristics:**

- Practical, technical, community-built.
- Clean atlas linework instead of game-specific ornament.
- Serif display typography with system sans support text.
- Direct project links, separated into `Available now` and `Work in progress` groups.
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
- **Project title**: game name only. No "Compendium," "Maps," hostname, or description in the visible link label. A single quiet `Work in progress` badge may sit beneath the name when the project is not yet fully live.

### Named Rules

**The Exact Names Rule.** Project link labels are exactly `Ancient Kingdoms`, `Ardenfall`, `Erenshor`, `Fractured Realms`, and `Vespera`.

## 4. Layout

Desktop is centered and information-dense: brand, title, subtitle, available-project previews, and the work-in-progress list should all begin within a typical 1119px-tall viewport. Avoid a ceremonial hero gap that delays the directory itself. Mobile is left-aligned: the brand, heading, copy, and link rows follow the viewport edge while preserving breathing room.

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

`A directory of public game data, maps, and reference tools for Ancient Kingdoms, Ardenfall, Erenshor, Fractured Realms, and Vespera.`

The game names in this sentence link to their official Steam store pages. Keep those links typographically quiet but recognizable through a restrained underline. They open in the current tab and must not compete with the compendium cards. Current Steam hrefs:

- `Ancient Kingdoms` → `https://store.steampowered.com/app/2241380/Ancient_Kingdoms/`
- `Ardenfall` → `https://store.steampowered.com/app/1154960/Ardenfall/`
- `Erenshor` → `https://store.steampowered.com/app/2382520/Erenshor/`
- `Fractured Realms` → `https://store.steampowered.com/app/3789070/Fractured_Realms/`
- `Vespera` → `https://store.steampowered.com/app/4824420/Vespera/`

### Project Links

Each project is a single large anchor with an icon, exact game name, and arrow. Available projects use a current 16:10 screenshot above the link details, presented in a two-column grid on desktop and a single column on mobile. A project not yet fully live belongs in the `Work in progress` group and stays a compact text row without a screenshot. Do not repeat that status inside each project row. Links may point at a compendium subdomain or, for early projects, a companion repository. Current hrefs:

- `Ancient Kingdoms` → `https://ancient-kingdoms.compendiums.org`
- `Ardenfall` → `https://ardenfall.compendiums.org` (work in progress)
- `Erenshor` → `https://erenshor.compendiums.org`
- `Fractured Realms` → `https://github.com/glockyco/fractured-realms-companion` (work in progress)
- `Vespera` → `https://vespera.compendiums.org` (work in progress)

Do not show `Available`; all listed projects are available by virtue of being linked.

### 404

The 404 page uses the same brand, atlas background, display type, and restrained copy. It should link back to `/`.

## 7. Do's and Don'ts

### Do:

- **Do** keep the page static and asset-only unless a real dynamic need appears.
- **Do** present Ancient Kingdoms, Ardenfall, Erenshor, Fractured Realms, and Vespera as direct public links.
- **Do** use the signal accent sparingly for navigation, focus, and atlas marks.
- **Do** keep screenshots current, consistently cropped, and subordinate to the project names.
- **Do** make keyboard focus visible and at least as prominent as hover.
- **Do** keep mobile overflow at zero horizontal scroll.
- **Do** keep the Ko-fi support link subordinate to the directory task.

### Don't:

- **Don't** use a generic SaaS landing page pattern: gradient hero, fake metrics, icon-card wallpaper, startup superlatives, or inflated platform language.
- **Don't** let one compendium's game-specific identity dominate the parent domain.
- **Don't** build a busy fandom portal with crowded navigation or lore-heavy density.
- **Don't** use fantasy parchment UI, ornate borders, or medieval styling as shorthand for “compendium.”
- **Don't** add hostnames, descriptions, decorative screenshots, or footer copy unless the page needs that information to route visitors. Screenshots belong only on available projects and must depict the current live tool. A quiet `Work in progress` group label is the only permitted status marker.
