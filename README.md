# compendiums.org

The landing page at [compendiums.org](https://compendiums.org/). It links to the game compendiums, which run on their own subdomains, and is served as static files by Cloudflare Workers.

## Commands

```sh
bun install
bun run dev        # serves public/ at http://127.0.0.1:4173, or the next free port
bun run dry-run    # checks the Worker bundle, as CI does on every push
bun run deploy     # deploys to compendiums.org
bun run previews   # recaptures every card screenshot from its live site
```

`bun run previews afallon` recaptures one card. The first run on a machine needs `bunx playwright install chromium`. Look at the new images before deploying.

## Adding a project

1. Add the game to the sentence under the heading and link it to its Steam store page.
2. Add a card to `public/index.html` with its own icon and the game name as its label. A live project goes under "Available now" with a 1024 × 640 preview at `/images/<name>.webp`. A project that is not live yet goes under "Work in progress" as a row without an image.
3. Run `bun run previews <name>` for a new live project.

## Design

The page is a plain directory: the game names, screenshots of the current live sites, and links to each compendium's own subdomain. It has no descriptions or marketing copy and does not take on any one game's look. The Ko-fi link stays a quiet link below the projects. Target WCAG AA with full keyboard use and no horizontal scrolling on phones.
