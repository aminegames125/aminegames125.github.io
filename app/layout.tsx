import type { Metadata, Viewport } from "next";
import { Funnel_Display, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "../content/site";
import "./globals.css";

const display = Funnel_Display({
  subsets: ["latin"],
  variable: "--font-funnel",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  authors: [{ name: site.name }],
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    url: site.url,
  },
};

export const viewport: Viewport = {
  themeColor: "#16181d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a
          href="#main"
          className="absolute left-margin -top-20 z-20 rounded-pill bg-accent px-4 py-2.5 font-semibold text-accent-ink focus:top-3"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
