import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
      <div className="relative">
        <p className="mb-4 font-mono text-sm text-neutral-500">404</p>
        <h1 className="mb-4 text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">This page doesn&apos;t exist.</h1>
        <p className="mb-10 text-neutral-400">The link might be old, or the page was moved.</p>
        <Link
          href="/"
          className="group inline-flex h-10 items-center gap-2 rounded-md bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back home
        </Link>
      </div>
    </main>
  );
}
