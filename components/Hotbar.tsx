"use client";

import { useEffect, useState } from "react";
import { nav } from "../content/site";

/** Section navigation drawn as a game hotbar. It hides while the footer is on screen. */
export default function Hotbar() {
  const [active, setActive] = useState("");
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => sectionObserver.observe(section));

    const footer = document.querySelector("footer");
    const footerObserver = new IntersectionObserver(([entry]) => setAtFooter(entry.isIntersecting));
    if (footer) footerObserver.observe(footer);

    return () => {
      sectionObserver.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  return (
    <nav
      aria-label="Sections"
      inert={atFooter}
      data-hidden={atFooter ? "" : undefined}
      className="fixed inset-x-0 bottom-3 z-10 flex justify-center px-margin opacity-100 transition-opacity duration-(--dur-row) ease-brand data-hidden:pointer-events-none data-hidden:opacity-0"
    >
      <ul className="flex gap-1.5 rounded-slot border-2 border-b-4 border-line bg-surface p-1.5">
        {nav.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              data-active={active === item.id ? "" : undefined}
              aria-current={active === item.id ? "location" : undefined}
              className="relative flex h-14 min-w-18 items-end justify-center rounded-tag border-2 border-b-4 border-line bg-inset px-3 pb-2 font-semibold hover:bg-surface data-active:border-accent data-active:text-accent sm:min-w-24"
            >
              <span aria-hidden="true" className="absolute top-0.5 left-1.5 text-small text-muted">
                {index + 1}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
