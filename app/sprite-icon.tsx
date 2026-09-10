import type { CSSProperties } from "react";
import { assetPath } from "./asset-path";

export function SpriteIcon({ sheet = "a", col, row, label = "" }: { sheet?: "a" | "b" | "platform"; col: number; row: number; label?: string }) {
  const columns = sheet === "platform" ? 6 : 4;
  const image = sheet === "platform" ? "/visuals/platform-icons.png" : sheet === "b" ? "/visuals/prevention-icons-b.png" : "/visuals/prevention-icons-a.png";
  const style = {
    "--sprite-image": `url(${assetPath(image)})`,
    "--sprite-size-x": `${columns * 100}%`,
    "--sprite-x": `${(col / (columns - 1)) * 100}%`,
    "--sprite-y": `${(row / 3) * 100}%`,
  } as CSSProperties;
  return <span className="sprite-icon" style={style} role={label ? "img" : undefined} aria-label={label || undefined} aria-hidden={label ? undefined : true} />;
}
