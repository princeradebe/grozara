import { NAV_LINKS } from "@/content/site";

export type Section = { id: string; label: string; bg: string; ink: string; inMenu: boolean };

const MENU: ReadonlySet<string> = new Set(NAV_LINKS.map((link) => link.href.slice(1)));

/**
 * Every section a visitor can jump to, in page order, with the colours its highlight wears.
 * Extras and How it works aren't in the menu; each nav lab option finds another way to them.
 * Extras' band is cream like the capsule, so it borrows the lime of its tiles.
 */
export const SECTIONS: Section[] = [
  { id: "lists", label: "Lists", bg: "var(--color-forest)", ink: "var(--color-lime-bright)" },
  { id: "boyfriend-mode", label: "Boyfriend Mode", bg: "var(--color-coral)", ink: "#ffffff" },
  { id: "shared", label: "Shared lists", bg: "var(--color-amber)", ink: "var(--color-forest)" },
  { id: "cards", label: "Loyalty cards", bg: "var(--color-forest-deep)", ink: "var(--color-lime-bright)" },
  { id: "extras", label: "Extras", bg: "var(--color-lime)", ink: "var(--color-forest)" },
  { id: "how-it-works", label: "How it works", bg: "var(--color-blush)", ink: "var(--color-forest)" },
  { id: "faq", label: "FAQ", bg: "var(--color-forest)", ink: "var(--color-lime-bright)" },
].map((section) => ({ ...section, inMenu: MENU.has(section.id) }));

export const MENU_SECTIONS = SECTIONS.filter((section) => section.inMenu);

export const sectionIndex = (id: string | null) => SECTIONS.findIndex((section) => section.id === id);
