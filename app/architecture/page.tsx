import type { Metadata } from "next";
import { assetPath } from "../asset-path";
import { TechnologieRedirect } from "./technologie-redirect";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://banana-navy.github.io/voicebot-ebola-rdc";

export const metadata: Metadata = {
  title: "Technologie du voicebot Ebola",
  alternates: { canonical: `${siteUrl}/technologie/` },
  robots: { index: false, follow: true },
};

export default function ArchitectureCompatibilityPage() {
  const destination = assetPath("/technologie/");
  return <main className="legacy-redirect"><TechnologieRedirect href={destination} /></main>;
}
