import Link from "next/link";
import { notFound as copy } from "../content/site";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-svh max-w-wrap flex-col justify-center gap-8 px-margin py-10">
      <h1 className="rise font-display text-display font-bold">{copy.heading}</h1>
      <p className="max-w-xl text-lede">{copy.body}</p>
      <Link
        href="/"
        className="layer layer-text inline-flex min-h-12 w-fit items-center rounded-pill bg-accent px-6 font-semibold text-accent-ink transition-transform duration-(--dur-fast) ease-brand active:scale-97"
      >
        {copy.action}
      </Link>
    </main>
  );
}
