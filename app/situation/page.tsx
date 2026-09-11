import type { Metadata } from "next";
import { assetPath } from "../asset-path";
import { FlambeesRedirect } from "./flambees-redirect";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://banana-navy.github.io/voicebot-ebola-rdc";

export const metadata: Metadata = {
  title: "Flambées Ebola documentées en RDC",
  alternates: { canonical: `${siteUrl}/flambees/` },
  robots: { index: false, follow: true },
};

export default function SituationCompatibilityPage() {
  const destination = assetPath("/flambees/");
  return <main className="legacy-redirect"><FlambeesRedirect href={destination} /></main>;
}
