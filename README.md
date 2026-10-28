# Amineos

Portfolio of Amineos, an independent full-stack engineer. Live at https://amineos.dev.

It is a sibling of the Spacymineos archive (https://spacymineos.github.io): same typefaces, pill shapes, list rows and footer wordmark, with a red accent on a red-tinted dark ground. Values and sources are in [docs/BRAND.md](docs/BRAND.md). Voice rules are in [docs/VOICE.md](docs/VOICE.md).

## Stack

Next.js (App Router, static export), TypeScript strict, Tailwind CSS v4, Framer Motion (count-up only), Bricolage Grotesque and Schibsted Grotesk through `next/font`.

## Run

```powershell
pnpm install
pnpm dev
pnpm lint
pnpm build
```

`pnpm build` writes the static site to `out/`. The GitHub Actions workflow in `.github/workflows/deploy.yml` publishes it to GitHub Pages.

## Content

All copy and facts live in [content/site.ts](content/site.ts). Fields left empty there are not filled in yet:

- `contactEndpoint`: URL of the deployed relay. The form stays disabled until it is set.
- `availability`: one line shown next to a pulsing dot in the hero. Empty hides it.
- `live` on a project: set to `true` to show the red "Live" badge on that row.

## Contact relay

The form posts to the service in [relay/](relay/), which holds the Discord webhook in an environment variable. The webhook is never part of the site. See [relay/README.md](relay/README.md) to run it.
