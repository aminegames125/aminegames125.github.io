"use client";

import { useEffect, useRef, useState } from "react";
import { nav } from "../content/site";
import { gsap, motionOk, useGSAP } from "./motion";

/** Section navigation drawn as a game hotbar. A selector frame slides to the section in view. */
export default function Hotbar() {
  const [active, setActive] = useState("");
  const [atFooter, setAtFooter] = useState(false);
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLSpanElement>(null);
  const placed = useRef(false);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const { id } = entry.target;
          if (entry.isIntersecting) setActive(id);
          // Left through the bottom edge, so the reader scrolled up past it: drop the highlight.
          else if (entry.boundingClientRect.top > 0) setActive((current) => (current === id ? "" : current));
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

  // The bar slides up once, after the hero has arrived.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          root.current,
          { yPercent: 150 },
          { yPercent: 0, duration: 0.6, delay: 1, ease: "power3.out" },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // The selector frame follows the active section.
  useGSAP(
    () => {
      const box = frame.current;
      const link = root.current?.querySelector<HTMLElement>("[data-active]");
      if (!box) return;
      if (!link?.parentElement) {
        gsap.to(box, { autoAlpha: 0, duration: 0.2, overwrite: "auto" });
        placed.current = false;
        return;
      }
      const slot = link.parentElement;
      const duration = placed.current && motionOk() ? 0.3 : 0;
      gsap.to(box, {
        x: slot.offsetLeft,
        y: slot.offsetTop,
        autoAlpha: 1,
        duration,
        ease: "power3.out",
        overwrite: "auto",
      });
      placed.current = true;
    },
    { dependencies: [active], scope: root },
  );

  return (
    <nav
      ref={root}
      aria-label="Sections"
      inert={atFooter}
      data-hidden={atFooter ? "" : undefined}
      className="gsap-slide fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-10 flex justify-center px-margin opacity-100 transition-opacity duration-(--dur-row) ease-brand data-hidden:pointer-events-none data-hidden:opacity-0"
    >
      <div className="relative rounded-slot border-2 border-b-4 border-line bg-surface p-1.5">
        <ul className="flex gap-1.5">
          {nav.map((item) => (
            <li key={item.id} className="w-[4.5rem] sm:w-24">
              <a
                href={`#${item.id}`}
                data-active={active === item.id ? "" : undefined}
                aria-current={active === item.id ? "location" : undefined}
                className="relative flex h-14 w-full items-center justify-center rounded-tag border-2 border-b-4 border-edge bg-inset px-1 text-small font-semibold hover:bg-surface data-active:text-accent sm:text-body"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <span
          ref={frame}
          aria-hidden="true"
          className="pointer-events-none invisible absolute top-0 left-0 h-14 w-[4.5rem] rounded-tag border-2 border-accent sm:w-24"
        />
      </div>
    </nav>
  );
}
