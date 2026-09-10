"use client";

import type { ReactNode } from "react";
import { PageCta, SiteFooter, SiteHeader } from "./site-chrome";
import { useSiteEffects } from "./use-site-effects";

export function ContentPage({ active, kicker, title, lead, children }: { active: "agir" | "situation" | "sources" | "architecture"; kicker: string; title: ReactNode; lead: string; children: ReactNode }) {
  useSiteEffects();
  return <main><div className="safety-strip">Suspicion d’Ebola ou urgence sanitaire : <a href="tel:151"><strong>appelez le 151</strong></a> · Danger de sécurité distinct : 112 Police</div><SiteHeader active={active} /><section className="subpage-hero"><div className="shell"><p className="kicker accent">{kicker}</p><h1>{title}</h1><p className="lead">{lead}</p></div></section>{children}<PageCta /><SiteFooter /></main>;
}
