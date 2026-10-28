# Amineos

Portfolio of Amineos, an independent full-stack engineer. Live at https://amineos.dev.

The look is a game inventory: charcoal ground, inset item slots, one lime accent, and a hotbar for navigation.

## Stack

Next.js (App Router, static export), TypeScript strict, Tailwind CSS v4, GSAP (with `@gsap/react`) for motion, Funnel Display and Plus Jakarta Sans through `next/font`.

## Run

```powershell
pnpm install
pnpm dev
pnpm lint
pnpm build
```

`pnpm build` writes the static site to `out/`. The workflow in `.github/workflows/deploy.yml` publishes it to GitHub Pages when `main` changes.

## Content

All copy and facts live in [content/site.ts](content/site.ts). Fields left empty there are not filled in yet:

- `availability`: one line shown next to a pulsing dot in the hero. Empty hides it.
- `live` on a project: set to `true` to show the "Live" badge on that project.

## Contact form

There is no server. The form opens a prefilled GitHub issue titled `Contact: ...`, and the workflow in [.github/workflows/contact-to-discord.yml](.github/workflows/contact-to-discord.yml) posts each one to Discord. The sender's GitHub account is the reply address.

Set it up once:

1. In Discord, create a webhook for the channel that should receive messages.
2. In the repository, open Settings, Secrets and variables, Actions, and add a secret named `DISCORD_WEBHOOK_URL` with the webhook URL.
3. Merge to `main`. Workflows triggered by issues only run from the default branch.

The webhook is a repository secret, so it is never part of the site. Never put it in `content/site.ts` or in a `NEXT_PUBLIC_` variable: a static page is public, and anyone could read it, flood the channel or delete it. Issues are public, which the form tells visitors.
