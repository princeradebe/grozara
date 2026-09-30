"use client";

import { useEffect, useState } from "react";

import { SECTIONS } from "./sections";

/**
 * Which section sits under the middle of the screen (null between them), and the last one that
 * did, so a fading highlight keeps its colour. State changes only when the section does, so
 * scrolling itself never re-renders.
 */
export function useActiveSection() {
  const [state, setState] = useState<{ active: string | null; last: string }>({ active: null, last: "lists" });
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) setState({ active: id, last: id });
          else setState((s) => (s.active === id ? { ...s, active: null } : s));
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
  return state;
}
