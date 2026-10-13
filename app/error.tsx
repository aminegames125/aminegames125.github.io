"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
      <div className="relative">
        <p className="mb-4 font-mono text-sm text-red-400">Error</p>
        <h1 className="mb-4 text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">Something broke.</h1>
        <p className="mb-2 text-neutral-400">{error.message || "The page hit an error while loading."}</p>
        {error.digest && <p className="mb-10 font-mono text-xs text-neutral-600">Digest: {error.digest}</p>}
        <button
          onClick={() => reset()}
          className="group mt-8 inline-flex h-10 items-center gap-2 rounded-md bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
        >
          <RotateCcw className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180" />
          Try again
        </button>
      </div>
    </main>
  );
}
