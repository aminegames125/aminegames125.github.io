"use client";

import { useEffect, useState } from "react";

/** Outline while the hero is on screen, filled lime once it has scrolled out. */
export default function HeaderCta({ label }: { label: string }) {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setFilled(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="#contact"
      data-filled={filled ? "" : undefined}
      className="group relative inline-grid min-h-11 place-items-center whitespace-nowrap rounded-pill px-5 font-semibold transition-transform duration-(--dur-fast) ease-brand active:scale-97"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-pill border border-text opacity-100 transition-opacity duration-(--dur-row) ease-brand group-hover:opacity-0 group-focus-visible:opacity-0 group-data-filled:opacity-0"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-pill bg-accent opacity-0 transition-opacity duration-(--dur-row) ease-brand group-hover:opacity-100 group-focus-visible:opacity-100 group-data-filled:opacity-100"
      />
      <span className="relative col-start-1 row-start-1 opacity-100 transition-opacity duration-(--dur-row) ease-brand group-hover:opacity-0 group-focus-visible:opacity-0 group-data-filled:opacity-0">
        {label}
      </span>
      <span
        aria-hidden="true"
        className="relative col-start-1 row-start-1 text-accent-ink opacity-0 transition-opacity duration-(--dur-row) ease-brand group-hover:opacity-100 group-focus-visible:opacity-100 group-data-filled:opacity-100"
      >
        {label}
      </span>
    </a>
  );
}
