# Amineos Portfolio

A high-performance, premium portfolio built with **Next.js 15**, **Framer Motion**, and **Tailwind CSS**. Designed with a "Liquid Glass" aesthetic, this site features scroll-driven parallax effects, staggered animations, and a responsive glassmorphism UI.

## 🚀 Features

- **Liquid Glass Design**: Custom glassmorphism system with frosted-glass effects.
- **Micro-Interactions**: Smooth animations powered by `framer-motion`.
- **Discord Integration**: Real-time "Quick Message" form that sends directly to a Discord webhook.
- **Static Export**: Fully compatible with GitHub Pages (`output: export`).
- **Modern Tech Stack**: React 19, Lucide Icons, and Next.js App Router.
- **SEO Optimized**: Semantic HTML and enhanced metadata for search engines.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Font**: Playfair Display (Serif) & JetBrains Mono (Monospace)

## 📦 Getting Started

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Static Export (GitHub Pages)

To build and export the static site:

```bash
pnpm build
```

The output will be in the `out/` directory, ready to be deployed to GitHub Pages or any static host.

## ⚙️ Configuration

### Discord Webhook

This project uses an environment variable to handle the Discord Webhook URL securely.

1.  Create a file named `.env.local` in the root directory.
2.  Add your webhook URL to the file:

```env
NEXT_PUBLIC_DISCORD_WEBHOOK_URL="your-actual-discord-webhook-url"
```

*Note: Since this is a static site (`output: export`), values prefixed with `NEXT_PUBLIC_` are baked into the production bundle during build time.*

### GitHub Pages

The project is already configured for static export in `next.config.ts`. Ensure your GitHub Pages settings point to the `/out` folder or a relevant deployment branch.

---

Built with intent by **Amineos**.
