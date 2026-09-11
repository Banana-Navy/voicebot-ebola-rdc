import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://banana-navy.github.io/voicebot-ebola-rdc";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Voicebot Ebola — RDC", template: "%s — Voicebot Ebola RDC" },
  description: "Voicebot trilingue d’information et d’orientation Ebola pour la République démocratique du Congo, fondé sur des sources sanitaires officielles.",
  icons: {
    icon: [{ url: `${basePath}/visuals/brand-mark-transparent-v2.webp`, type: "image/webp", sizes: "512x512" }],
    shortcut: `${basePath}/visuals/brand-mark-transparent-v2.webp`,
    apple: `${basePath}/favicon-transparent-v2.png`,
  },
  openGraph: { title: "Voicebot Ebola — RDC", description: "Informer. Protéger. Agir.", url: siteUrl, images: [`${siteUrl}/visuals/hero-rdc.webp`] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr"><body>{children}</body></html>;
}
