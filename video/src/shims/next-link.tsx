import type { AnchorHTMLAttributes } from "react";

/** Stands in for next/link: nothing is clickable in a video. */
export default function Link({ href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a href={href} {...rest} />;
}
