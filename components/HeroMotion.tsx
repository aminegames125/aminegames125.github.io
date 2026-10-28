"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./motion";

type HeroMotionProps = { children: React.ReactNode; className: string };

/**
 * The hero. One timeline settles the headline lines into place, then brings in everything else.
 * It plays once. The headline is never hidden, so it paints with the page and stays the LCP.
 */
export default function HeroMotion({ children, className }: HeroMotionProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          gsap.set("[data-hero-item]", { autoAlpha: 0, y: 20 });
          gsap
            .timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: {
                trigger: root.current,
                start: "top 80%",
                // Landing further down the page and scrolling up must still bring the hero in.
                toggleActions: "play none play none",
              },
            })
            .fromTo(
              "[data-hero-line]",
              { yPercent: 30 },
              { yPercent: 0, duration: 0.8, stagger: 0.12 },
            )
            .to("[data-hero-item]", { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.45");
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
