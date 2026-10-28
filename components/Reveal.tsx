"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./motion";

type RevealProps = { children: React.ReactNode; className?: string };

/** Reveals every [data-reveal] child as one staggered group when the wrapper scrolls into view. */
export default function Reveal({ children, className }: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            gsap.utils.toArray("[data-reveal]", root.current),
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
            },
          );
        },
        root,
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
