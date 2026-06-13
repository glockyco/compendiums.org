---
name: Compendiums.org
description: A practical directory for independent game compendium projects.
---

<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->

# Design System: Compendiums.org

## 1. Overview

**Creative North Star: "The Signal Bench"**

Compendiums.org should feel like a maintained workbench for public game data: instruments are labeled, the routes are obvious, and the craft shows through precision rather than decoration. The page is a brand surface, but it should behave like a utility: visitors arrive, identify the right project, and leave for the tool they need.

The atmosphere is restrained and technical. Use the cobalt/indigo seed as a sparing signal color, not as a full-page wash. The selected motion energy is responsive: interactions should acknowledge the user's movement with subtle feedback, but the page must not choreograph itself like a campaign site.

The system explicitly rejects the generic SaaS landing page: no gradient hero, fake metrics, icon-card wallpaper, startup superlatives, or inflated platform language.

**Key Characteristics:**

- Practical, technical, community-built.
- Restrained signal color, not decorative color flooding.
- Display + mono typography for a workshop/instrument-panel feel.
- Clear project availability and honest domain-migration copy.
- Responsive interaction polish without page-performance theater.

## 2. Colors

Use a restrained signal palette: neutral architecture plus one cobalt/indigo anchor and one secondary accent chosen during implementation.

### Primary

- **Signal Cobalt** (`oklch(0.578 0.130 241.7)` seed, final token to be resolved during implementation): reserved for primary links, focus indicators, and one or two key affordances. It should read like a signal light, not a decorative gradient.

### Neutral

- **Workbench Background** (`[to be resolved during implementation]`): the page background. Prefer pure white or pure near-black before any tinted neutral; avoid warm parchment and hidden beige.
- **Tool Surface** (`[to be resolved during implementation]`): project cards or panels, pulled slightly away from the background for structure.
- **Ink** (`[to be resolved during implementation]`): body text with at least 7:1 contrast against the background.
- **Muted Ink** (`[to be resolved during implementation]`): secondary text with at least 3.5:1 contrast against the background.

### Named Rules

**The Signal Rarity Rule.** Cobalt earns attention by being rare. Use it on less than 10% of the visible surface.

**The No-Parchment Rule.** Do not translate “game compendium” into cream paper, ornate borders, medieval styling, or fantasy-map beige.

## 3. Typography

**Display Font:** `[display font to be chosen at implementation]`
**Body Font:** `[body font to be chosen at implementation]`
**Label/Mono Font:** `[mono font to be chosen at implementation]`

**Character:** Pair a confident display face with mono labels/details. The display type gives the directory a memorable brand voice; mono details make statuses, domains, and project metadata feel exact.

### Hierarchy

- **Display** (`[weight/size to be chosen]`): hero headline only. Balanced line wrapping required.
- **Headline** (`[weight/size to be chosen]`): project-section heading or major page statement.
- **Title** (`[weight/size to be chosen]`): project names and footer groups.
- **Body** (`[weight/size to be chosen]`): descriptions and supporting copy. Keep line length between 65–75ch.
- **Label** (`[mono style to be chosen]`): status chips, hostnames, small metadata, and footer technical labels.

### Named Rules

**The Exact Labels Rule.** Domains, statuses, and migration notes use mono or mono-adjacent styling because they are operational facts, not marketing claims.

## 4. Elevation

Default to tonal layering and borders rather than heavy shadows. Project cards should feel placed on a work surface, not floating like SaaS pricing boxes. Hover states may use a small lift or glow if it reinforces clickability and passes reduced-motion requirements.

### Named Rules

**The Flat Until Touched Rule.** Surfaces are quiet at rest. Depth appears only through hover, focus, or active state.

## 5. Components

## 6. Do's and Don'ts

### Do:

- **Do** present Ancient Kingdoms, Ardenfall, and Erenshor as available projects with real public links.
- **Do** keep domain migration copy factual and subordinate to the primary project links.
- **Do** use the cobalt signal color sparingly for navigation, focus, and primary affordances.
- **Do** make keyboard focus visible and at least as prominent as hover.
- **Do** include reduced-motion alternatives for any entrance or hover animation.

### Don't:

- **Don't** use a generic SaaS landing page pattern: gradient hero, fake metrics, icon-card wallpaper, startup superlatives, or inflated platform language.
- **Don't** let one compendium's game-specific identity dominate the parent domain.
- **Don't** build a busy fandom portal with crowded navigation or lore-heavy density.
- **Don't** use fantasy parchment UI, ornate borders, or medieval styling as shorthand for “compendium.”
- **Don't** disable or mark Ardenfall or Erenshor as unavailable just because their final `compendiums.org` hostnames have not migrated yet.
