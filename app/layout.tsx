import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MotionProvider from "./components/MotionProvider";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Amineos · Full-stack developer",
  description:
    "Full-stack developer in Tunis. I build web apps with Next.js and PostgreSQL and host them on servers I set up myself.",
  keywords: ["Full-stack developer", "Tunis", "Next.js", "PostgreSQL", "Docker", "Nginx"],
  authors: [{ name: "Amineos" }],
  openGraph: {
    title: "Amineos · Full-stack developer",
    description: "I build web apps and run the servers too.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
