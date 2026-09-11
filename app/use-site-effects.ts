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

    const cleanups: Array<() => void> = [];
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stackGroups = Array.from(document.querySelectorAll<HTMLElement>("[data-stack]")).map((group) => {
      const cards = Array.from(group.children).filter((child): child is HTMLElement => child instanceof HTMLElement && child.matches("[data-bento]"));
      cards.forEach((card, index) => {
        card.style.setProperty("--stack-index", String(index));
        card.style.setProperty("--stack-top", `${72 + index * 8}px`);
        card.style.setProperty("--stack-z", String(10 + index));
      });
      group.style.setProperty("--stack-count", String(cards.length));
      return { group, cards };
    });

    const hero = document.querySelector<HTMLElement>(".hero-background");
    let animationFrame = 0;
    const updateStackState = () => {
      const enabled = window.innerWidth <= 760 && window.innerHeight >= 640 && !reducedMotion.matches;
      stackGroups.forEach(({ cards }) => {
        if (!enabled) {
          cards.forEach((card) => {
            card.removeAttribute("data-stack-active");
            card.style.setProperty("--stack-scale", "1");
          });
          return;
        }

        const activeCards = cards.filter((card, index) => card.getBoundingClientRect().top <= 73 + index * 8);
        activeCards.forEach((card, index) => {
          const depth = Math.min(activeCards.length - index - 1, 4);
          card.setAttribute("data-stack-active", "true");
          card.style.setProperty("--stack-scale", (1 - depth * 0.012).toFixed(3));
        });
        cards.slice(activeCards.length).forEach((card) => {
          card.removeAttribute("data-stack-active");
          card.style.setProperty("--stack-scale", "1");
        });
      });
    };
    const updateMotion = () => {
      animationFrame = 0;
      hero?.style.setProperty("--hero-y", `${Math.min(window.scrollY, 900) * 0.075}px`);
      updateStackState();
    };
    const requestMotionUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateMotion);
    };
    window.addEventListener("scroll", requestMotionUpdate, { passive: true });
    window.addEventListener("resize", requestMotionUpdate, { passive: true });
    requestMotionUpdate();

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
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestMotionUpdate);
      window.removeEventListener("resize", requestMotionUpdate);
      stackGroups.forEach(({ group, cards }) => {
        group.style.removeProperty("--stack-count");
        cards.forEach((card) => {
          card.removeAttribute("data-stack-active");
          card.style.removeProperty("--stack-index");
          card.style.removeProperty("--stack-top");
          card.style.removeProperty("--stack-z");
          card.style.removeProperty("--stack-scale");
        });
      });
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);
}
