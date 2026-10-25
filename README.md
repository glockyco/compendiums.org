# compendiums.org

The landing page at [compendiums.org](https://compendiums.org/). It links to the game compendiums, which run on their own subdomains, and is served as static files by Cloudflare Workers.

## Setup

You need Bun to install dependencies and run the package scripts, Python available as `python3` for the local server, and Node.js for preview capture. Deployment also needs access to the Cloudflare account.

## Commands

```sh
bun install
bun run dev        # serves public/ and prints the local URL
bun run dry-run    # checks the Worker bundle, as CI does on every push
bun run deploy     # deploys to compendiums.org
bun run previews   # recaptures every card screenshot from its live site
```

`bun run deploy` publishes `public/` to the Cloudflare Worker that [`wrangler.jsonc`](wrangler.jsonc) configures.

`bun run previews afallon` recaptures one card. A screenshot that differs from the existing image only by rendering noise keeps the existing file, so `git status` lists exactly the previews that changed. Review them before deploying. The first capture on a machine needs `bunx playwright install chromium`.

## Adding a project

1. Add the game to the sentence under the heading and link it to its Steam store page.
2. Add a card to [`public/index.html`](public/index.html) with its own icon and the game name as its label. A live project goes under "Available now" with a preview image at `/images/<name>.webp`, sized like the other cards. A project that is not live yet goes under "Work in progress" as a row without an image.
3. For a new live project, run `bun run previews <name>`. It captures the preview at the size that the card's image declares.

## Design

The page is a plain directory: the game names, screenshots of the current live sites, and links to each compendium's own subdomain. It has no descriptions or marketing copy and does not take on any one game's look. The Ko-fi link stays a quiet link below the projects. Target WCAG AA with full keyboard use and no horizontal scrolling on phones.
