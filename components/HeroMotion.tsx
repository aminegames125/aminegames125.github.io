"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "./motion";

type HeroMotionProps = { children: React.ReactNode; className: string };

/** The hero section. One timeline brings in the headline lines, then everything else. */
export default function HeroMotion({ children, className }: HeroMotionProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
          intro
            .fromTo(
              "[data-hero-line]",
              { autoAlpha: 0, yPercent: 40 },
              { autoAlpha: 1, yPercent: 0, duration: 0.7, stagger: 0.12 },
            )
            .fromTo(
              "[data-hero-item]",
              { autoAlpha: 0, y: 20 },
              { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 },
              "-=0.4",
            );
          void document.fonts.ready.then(() => ScrollTrigger.refresh());
        },
        root,
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="hero" ref={root} aria-labelledby="hero-title" className={className}>
      {children}
    </section>
  );
}
