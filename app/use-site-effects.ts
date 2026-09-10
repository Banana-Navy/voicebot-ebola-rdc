"use client";

import { useEffect } from "react";

export function useSiteEffects() {
  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.setAttribute("data-visible", "true")),
      { threshold: 0.12 },
    );
    revealNodes.forEach((node) => observer.observe(node));

    const hero = document.querySelector<HTMLElement>(".hero-background");
    const onScroll = () => hero?.style.setProperty("--hero-y", `${Math.min(window.scrollY, 900) * 0.075}px`);
    window.addEventListener("scroll", onScroll, { passive: true });

    const cleanups: Array<() => void> = [];
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (finePointer.matches && !reducedMotion.matches) {
      document.querySelectorAll<HTMLElement>("[data-bento]").forEach((bento) => {
        const reset = () => {
          bento.style.setProperty("--bento-x", "50%");
          bento.style.setProperty("--bento-y", "50%");
          bento.style.setProperty("--bento-rotate-x", "0deg");
          bento.style.setProperty("--bento-rotate-y", "0deg");
        };
        const move = (event: PointerEvent) => {
          const rect = bento.getBoundingClientRect();
          const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
          const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
          bento.style.setProperty("--bento-x", `${(x * 100).toFixed(1)}%`);
          bento.style.setProperty("--bento-y", `${(y * 100).toFixed(1)}%`);
          bento.style.setProperty("--bento-rotate-x", `${((0.5 - y) * 4).toFixed(2)}deg`);
          bento.style.setProperty("--bento-rotate-y", `${((x - 0.5) * 5).toFixed(2)}deg`);
        };
        const pointerOut = (event: PointerEvent) => {
          if (!bento.contains(event.relatedTarget as Node | null)) reset();
        };
        bento.addEventListener("pointermove", move, { passive: true });
        bento.addEventListener("pointerleave", reset);
        bento.addEventListener("pointerout", pointerOut);
        cleanups.push(() => {
          bento.removeEventListener("pointermove", move);
          bento.removeEventListener("pointerleave", reset);
          bento.removeEventListener("pointerout", pointerOut);
        });
      });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);
}
