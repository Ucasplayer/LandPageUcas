"use client";

import { useEffect } from "react";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function SiteEffects() {
  useEffect(() => {
    const bar = document.querySelector("[data-scroll-progress]");

    const updateProgress = () => {
      if (!bar) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
      bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    let matchLength = 0;
    let eggTimeout;

    const handleKeydown = (event) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const expected = KONAMI_SEQUENCE[matchLength];

      if (key === expected) {
        matchLength += 1;
      } else {
        matchLength = key === KONAMI_SEQUENCE[0] ? 1 : 0;
      }

      if (matchLength === KONAMI_SEQUENCE.length) {
        matchLength = 0;
        document.body.classList.add("easter-egg-active");
        window.clearTimeout(eggTimeout);
        eggTimeout = window.setTimeout(() => {
          document.body.classList.remove("easter-egg-active");
        }, 1600);
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      window.removeEventListener("keydown", handleKeydown);
      window.clearTimeout(eggTimeout);
    };
  }, []);

  return null;
}
