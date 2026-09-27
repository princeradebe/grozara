import type { CSSProperties } from "react";
import { Img, staticFile } from "remotion";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  unoptimized?: boolean;
};

/** Stands in for next/image. Site paths like "/stickers/rice.png" live under public/site. */
export default function Image({ src, alt, width, height, fill = false, className, style }: Props) {
  const url = src.startsWith("/") ? staticFile(`site${src}`) : src;
  return (
    <Img
      src={url}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style } : style}
    />
  );
}
