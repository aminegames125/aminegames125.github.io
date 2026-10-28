<div align="center">

# Amineos

**Portfolio of an independent full-stack engineer.**
One VPS. No cloud provider.

[![Live site](https://img.shields.io/badge/live-amineos.dev-8dff4f?style=for-the-badge&labelColor=16181d)](https://amineos.dev)

[![Deploy](https://github.com/aminegames125/aminegames125.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/aminegames125/aminegames125.github.io/actions/workflows/deploy.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-3-88ce02?logo=greensock&logoColor=white)](https://gsap.com)
[![Hosted on GitHub Pages](https://img.shields.io/badge/hosted_on-GitHub_Pages-222222?logo=github&logoColor=white)](https://pages.github.com)
[![License: all rights reserved](https://img.shields.io/badge/license-all_rights_reserved-d33?labelColor=222)](LICENSE)

</div>

---

## Overview

A single-page portfolio built around one idea: a game inventory. Charcoal ground, inset item slots, one lime accent, and a hotbar for navigation. Projects are items in slots, and a cursor frame glides to the one you pick.

It is fully static. There is no server, no database and no third-party form service.

## Highlights

- **Inventory of projects.** Select a slot by click, tap or arrow keys. The detail pane follows, and on phones it sits under the grid.
- **Hotbar navigation.** A fixed bar with a selector frame that tracks the section in view, and hides at the footer.
- **Purposeful motion.** One hero load-in, the project slots loading in once, and a cropped footer wordmark. Everything else stays still.
- **Contact without a backend.** The form posts straight to a Discord webhook that is injected at build time and encoded in the bundle. See [Contact form](#contact-form).
- **Accessible by default.** Skip link, visible focus rings, a radio-group inventory with roving focus, and `prefers-reduced-motion` honoured in every animation.
- **Share-ready.** Generated Open Graph image, Twitter card, `robots.txt` and sitemap.

## Logo

The mark is a 5 by 5 grid of rounded blocks drawn as an A, like letters in a game. The middle block of the crossbar is lime: the one lit slot.

| File | Use |
| --- | --- |
| [`amineos-mark.svg`](public/logo/amineos-mark.svg) | Main mark, for dark backgrounds |
| [`amineos-mark-light.svg`](public/logo/amineos-mark-light.svg) | For light backgrounds |
| [`amineos-mark-black.svg`](public/logo/amineos-mark-black.svg), [`white`](public/logo/amineos-mark-white.svg) | One-colour versions |
| [`amineos-mark-small.svg`](public/logo/amineos-mark-small.svg) | Tighter cut for sizes under 24 px |
| [`amineos-mark-animated.svg`](public/logo/amineos-mark-animated.svg) | Self-contained intro: blocks build the A from the ground up, the lit block lands last with a ring. Honours `prefers-reduced-motion` |

The header uses a GSAP version of the same animation ([`LogoLink.tsx`](components/LogoLink.tsx)): it plays once on load, and hovering or focusing the logo sends a ripple out from the lit block. Colours: off-white `#eceae4`, lime `#8dff4f`, ground `#16181d`.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16, App Router, static export |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 with CSS design tokens |
| Motion | GSAP, ScrollTrigger and SplitText through `@gsap/react` |
| Fonts | Funnel Display and Plus Jakarta Sans via `next/font` |
| Package manager | pnpm |
| Hosting | GitHub Pages, deployed by GitHub Actions |

## Getting started

Requires Node 22 and pnpm.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint
pnpm build      # static site written to out/
```

## Project structure

```text
app/            Routes, global styles and tokens, metadata, Open Graph image
components/     Sections, the inventory, the hotbar and the motion layer
content/        site.ts: every fact and line of copy on the site
.github/        Deploy workflow
next.config.ts  Packs the Discord webhook from the build environment
```

## Editing content

All copy and facts live in [`content/site.ts`](content/site.ts). Components only render what is there.

- `availability`: one line next to the pulsing dot in the hero. Empty hides it.
- `live` on a project: set to `true` to show the "Live" badge on that project.

Design tokens (colours, spacing, type scale, motion timings) are defined once at the top of [`app/globals.css`](app/globals.css).

## Contact form

There is no server. The form posts straight to a Discord webhook. The URL is never in the repository: [`deploy.yml`](.github/workflows/deploy.yml) passes it from a repository secret to the build, and [`next.config.ts`](next.config.ts) cuts it into chunks, encodes and reorders them, so it never appears as readable text in the bundle. Until a webhook is set, the form shows a GitHub link instead.

Set it up once:

1. In Discord, create a webhook for a channel that holds nothing but these messages.
2. In the repository, open **Settings, Secrets and variables, Actions**, and add a secret named `DISCORD_WEBHOOK_URL` with the webhook URL.
3. Run the deploy workflow again (push to `main` or re-run it).

The form adds a honeypot field, a minimum fill time, a ten-minute cooldown per browser, length limits, and turns off mentions on the Discord side.

> [!WARNING]
> This makes the webhook hard to find, not secret. A static page can only use what a visitor can also recover, so someone determined can still read the URL and post to the channel. Keep the channel dedicated, and if it is ever abused, delete the webhook in Discord and put a new one in the secret. Never commit the URL: GitHub reports exposed Discord webhooks, and Discord revokes them.

## Deployment

Pushing to `main` runs [`deploy.yml`](.github/workflows/deploy.yml), which builds the static export and publishes it to GitHub Pages. The custom domain is set in [`CNAME`](CNAME).

## License

Copyright (c) 2026 Amineos. **All rights reserved.** The code is public to read, not to reuse. The logo, the animations, the design and the copy may not be copied, modified or redistributed without written permission. See [LICENSE](LICENSE).

## Author

Built and hosted by [Amineos](https://github.com/aminegames125).
