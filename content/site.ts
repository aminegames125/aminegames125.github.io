/**
 * Every fact and every line of copy on the site lives here.
 * Copy is the approved copy from the earlier build. Facts come only from the owner.
 * Empty strings are named fields the owner has not filled in yet. Voice rules: docs/VOICE.md.
 */

export const site = {
  name: "Amineos",
  url: "https://amineos.dev",
  github: "https://github.com/aminegames125",
  spacymineos: "https://spacymineos.github.io",
  title: "Amineos | Full-Stack Engineer",
  description:
    "Independent full-stack engineer. I design the product, build the backend and ship it myself.",
  /** URL of the deployed relay service in /relay. Empty until it is deployed. */
  contactEndpoint: "" as string,
  /** From the owner's GitHub bio. Empty hides the availability dot. */
  availability: "Open to remote work." as string,
} as const;

export const nav = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "tools", label: "Tools" },
  { id: "contact", label: "Contact" },
] as const;

export const header = {
  cta: "Hire me",
} as const;

export const hero = {
  lines: ["One VPS.", "No cloud provider."],
  body: "I design the product, build the backend and ship it myself.",
  cta: "Hire me",
  stats: [
    { value: 11, suffix: "+", label: "Docker services" },
    { value: 1, suffix: "", label: "bare VPS" },
  ],
} as const;

export const about = {
  lead: "Working alone.",
  paragraphs: [
    "I'm an independent full-stack engineer. I work on product design, backend architecture and shipping fast.",
    "Nobody hands me the work, so I choose it and I answer for it. When something breaks, I'm the one who fixes it, usually late at night.",
    "Most of the work happens between midnight and 4AM, with One Piece playing. I also make art, independently.",
  ],
} as const;

export type Project = {
  name: string;
  kind: string;
  detail: string;
  href?: string;
  /** Date of the last push to the repository, ISO format. Empty for projects without a public repository. */
  updated?: string;
  /** Set to true only for projects that are live. Empty until the owner confirms each one. */
  live?: boolean;
};

export const work = {
  heading: "Public work.",
  intro: "Private and client work is available on request.",
  sourceLabel: "Source",
  liveLabel: "Live",
  projects: [
    {
      name: "perfect-shop",
      kind: "Commerce platform",
      detail: "Storefront, backend, database and reverse proxy, built end to end on the bare VPS.",
    },
    {
      name: "daftar",
      kind: "Android app",
      detail: "Offline-first wallet of cards for prices, places, menus and money. Reads menus from a photo on the device, and the data stays on the phone.",
      href: "https://github.com/aminegames125/daftar",
      updated: "2026-10-25",
    },
    {
      name: "Veil",
      kind: "Minecraft mod",
      detail: "Permission-gated passages between places, built on Immersive Portals for Fabric 1.21.1. Expiring keycards, delegated access and an audit log.",
      href: "https://github.com/aminegames125/Veil",
      updated: "2026-05-17",
    },
    {
      name: "bio-builder",
      kind: "Tool",
      detail: "Generates personal bios for GitHub, portfolios and social profiles.",
      href: "https://github.com/aminegames125/bio-builder",
      updated: "2025-12-11",
    },
    {
      name: "matmate",
      kind: "Flutter app",
      detail: "Solves an equation you type in. Parses the expression and renders the LaTeX on screen.",
      href: "https://github.com/aminegames125/matmate",
      updated: "2025-08-25",
    },
    {
      name: "refund_tracker_pro",
      kind: "Cross-platform app",
      detail: "Tracks purchase refunds, due dates and statuses on mobile, web and desktop from one codebase.",
      href: "https://github.com/aminegames125/refund_tracker_pro",
      updated: "2025-08-25",
    },
    {
      name: "VoidTP",
      kind: "Spigot plugin",
      detail: "Teleports players back to safety when they fall into the void.",
      href: "https://github.com/aminegames125/VoidTP",
      updated: "2024-05-14",
    },
  ] satisfies Project[],
};

export const tools = {
  heading: "What I use.",
  groups: [
    { label: "Mobile", items: ["Flutter", "Dart"] },
    { label: "Web", items: ["Next.js", "TypeScript", "Node.js"] },
    { label: "Languages", items: ["Python", "Go", "Java", "Kotlin", "Solidity"] },
    { label: "Data", items: ["PostgreSQL", "Prisma"] },
    { label: "Infrastructure", items: ["Docker", "Nginx", "Cloudflare", "Mailu"] },
  ],
} as const;

export const contact = {
  heading: "Send a message.",
  body: "It goes to my Discord. You can also find me on",
  githubLabel: "GitHub",
  nameLabel: "Name",
  topicLabel: "Project type",
  /** Placeholder options. The owner confirms or replaces them. */
  topics: ["Full-stack build", "Backend or infrastructure", "Mobile app", "Something else"],
  messageLabel: "Message",
  send: "Send",
  sending: "Sending",
  success: "Message sent.",
  rateLimited: "Could not send the message: too many requests from this address. Try again in 10 minutes.",
  error: "Could not send the message: the server did not answer. Try again in a few minutes.",
  unavailable: "The form is not connected yet. Write to me on GitHub instead.",
} as const;

export const footer = {
  meta: "Built and hosted by me.",
  links: [
    { label: "GitHub", href: site.github },
    { label: "Spacymineos", href: site.spacymineos },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export const notFound = {
  heading: "Nothing here.",
  body: "That address does not exist on this site.",
  action: "Back to the start",
} as const;

export const failure = {
  heading: "Something broke.",
  body: "The page could not render. Try again, and write to me on GitHub if it keeps happening.",
  action: "Try again",
} as const;
