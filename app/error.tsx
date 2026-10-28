"use client";

import { failure } from "../content/site";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main" className="mx-auto flex min-h-svh max-w-wrap flex-col justify-center gap-8 px-margin py-10">
      <h1 className="rise font-display text-display font-bold">{failure.heading}</h1>
      <p className="max-w-xl text-lede">{failure.body}</p>
      <button
        type="button"
        onClick={reset}
        className="layer layer-text min-h-12 w-fit rounded-pill bg-accent px-6 font-semibold text-accent-ink transition-transform duration-(--dur-fast) ease-brand active:scale-97"
      >
        {failure.action}
      </button>
    </main>
  );
}
