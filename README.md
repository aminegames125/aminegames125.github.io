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

</div>

---

## Overview

A single-page portfolio built around one idea: a game inventory. Charcoal ground, inset item slots, one lime accent, and a hotbar for navigation. Projects are items in slots, and a cursor frame glides to the one you pick.

It is fully static. There is no server, no database and no third-party form service.

## Highlights

- **Inventory of projects.** Select a slot by click, tap or arrow keys. The detail pane follows, and on phones it sits under the grid.
- **Hotbar navigation.** A fixed bar with a selector frame that tracks the section in view, and hides at the footer.
- **Purposeful motion.** One hero load-in, the project slots loading in once, and a cropped footer wordmark. Everything else stays still.
- **Contact without a backend.** The form opens a prefilled GitHub issue, and a workflow forwards it to Discord. See [Contact form](#contact-form).
- **Accessible by default.** Skip link, visible focus rings, a radio-group inventory with roving focus, and `prefers-reduced-motion` honoured in every animation.
- **Share-ready.** Generated Open Graph image, Twitter card, `robots.txt` and sitemap.

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
.github/        Deploy workflow and the contact-to-Discord workflow
```

## Editing content

All copy and facts live in [`content/site.ts`](content/site.ts). Components only render what is there.

- `availability`: one line next to the pulsing dot in the hero. Empty hides it.
- `live` on a project: set to `true` to show the "Live" badge on that project.
- `issueUrl`: where the contact form opens its issue.

Design tokens (colours, spacing, type scale, motion timings) are defined once at the top of [`app/globals.css`](app/globals.css).

## Contact form

There is no server. The form opens a prefilled GitHub issue titled `Contact: ...`, and [`contact-to-discord.yml`](.github/workflows/contact-to-discord.yml) posts each one to Discord. The sender's GitHub account is the reply address.

Set it up once:

1. In Discord, create a webhook for the channel that should receive messages.
2. In the repository, open **Settings, Secrets and variables, Actions**, and add a secret named `DISCORD_WEBHOOK_URL` with the webhook URL.
3. Merge to `main`. Workflows triggered by issues only run from the default branch.

> [!WARNING]
> Never put the webhook URL in `content/site.ts` or in a `NEXT_PUBLIC_` variable. A static page is public: anyone could read the URL, flood the channel or delete the webhook. Issues are public too, which the form tells visitors.

## Deployment

Pushing to `main` runs [`deploy.yml`](.github/workflows/deploy.yml), which builds the static export and publishes it to GitHub Pages. The custom domain is set in [`CNAME`](CNAME).

## Author

Built and hosted by [Amineos](https://github.com/aminegames125).
