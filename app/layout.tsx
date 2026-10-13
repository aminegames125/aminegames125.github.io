import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amineos | Full-Stack Engineer & Infrastructure Architect",
  description: "Senior Full-Stack Developer specializing in high-performance systems, Docker orchestration, and end-to-end software architecture. Explore my portfolio of flagship projects.",
  keywords: ["Full-Stack Developer", "Software Engineer", "Tunis", "React", "Next.js", "Infrastructure", "Docker", "DevOps"],
  authors: [{ name: "Amineos" }],
  openGraph: {
    title: "Amineos | Full-Stack Engineer",
    description: "Building resilient systems with intent.",
    type: "website",
  },
};

import Preloader from "./components/Preloader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
