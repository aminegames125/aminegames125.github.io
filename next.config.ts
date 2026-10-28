import type { NextConfig } from "next";

/**
 * The Discord webhook comes from the build environment, never from the repository. It is cut into
 * chunks, base64-encoded and reordered, so it never appears as a readable URL in the bundle.
 * This makes it hard to find, not impossible: anything a static page can use, a visitor can recover.
 */
const pack = (url: string) =>
  (url.match(/.{1,6}/g) ?? []).map((chunk) => Buffer.from(chunk).toString("base64")).reverse().join(".");

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_CONTACT_KEY: pack(process.env.DISCORD_WEBHOOK_URL ?? ""),
  },
};

export default nextConfig;
