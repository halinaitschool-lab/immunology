"use client";

import { useEffect } from "react";

function isInViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight - 40 && rect.bottom > 0;
}

export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    let observer: IntersectionObserver | undefined;

    const frame = requestAnimationFrame(() => {
      const reveals = document.querySelectorAll(".reveal");
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
      );

      reveals.forEach((el) => {
        if (isInViewport(el)) {
          el.classList.add("visible");
        }
        observer!.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- explicit deps passed by caller
  }, deps);
}
