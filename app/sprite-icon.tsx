import { assetPath } from "./asset-path";

type Sheet = "a" | "b" | "platform" | "capabilities" | "community";

export function SpriteIcon({ sheet = "a", col, row, label = "", className = "" }: { sheet?: Sheet; col: number; row: number; label?: string; className?: string }) {
  const src = assetPath(`/visuals/crops/${sheet}-${row}-${col}.webp`);
  return <span className={`sprite-icon sprite-${sheet} ${className}`.trim()} role={label ? "img" : undefined} aria-label={label || undefined} aria-hidden={label ? undefined : true}>
    <img src={src} alt="" loading="lazy" />
  </span>;
}
