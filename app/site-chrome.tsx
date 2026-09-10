"use client";

import Link from "next/link";
import { useState } from "react";
import { SpriteIcon } from "./sprite-icon";

export type Locale = "fr" | "en" | "sw";
type Active = "home" | "agir" | "situation" | "sources" | "architecture";

const nav = [
  { href: "/", label: "Accueil", key: "home" },
  { href: "/agir", label: "Que faire ?", key: "agir" },
  { href: "/situation", label: "Situation", key: "situation" },
  { href: "/sources", label: "Sources", key: "sources" },
  { href: "/architecture", label: "Architecture", key: "architecture" },
] as const;

export function Brand() {
  return <span className="brand-lockup"><span className="brand-mark" aria-hidden="true"><i>+</i></span><span><b>VOICEBOT</b><em>EBOLA</em><small>Informer. Protéger. Agir.</small></span></span>;
}

export function SiteHeader({ active, transparent = false, locale = "fr", onLocaleChange, onVoicebot }: { active?: Active; transparent?: boolean; locale?: Locale; onLocaleChange?: (locale: Locale) => void; onVoicebot?: () => void }) {
  const [open, setOpen] = useState(false);
  return <header className={`site-header ${transparent ? "is-transparent" : ""}`}>
    <div className="shell header-inner">
      <Link className="site-brand" href="/" aria-label="Voicebot Ebola, accueil"><Brand /></Link>
      <nav className={open ? "is-open" : ""} aria-label="Navigation principale">
        {nav.map((item) => <Link key={item.href} className={active === item.key ? "active" : ""} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
      </nav>
      <div className="language-switch" aria-label="Langue du site">
        {(["fr", "en", "sw"] as Locale[]).map((lang) => <button key={lang} type="button" className={locale === lang ? "active" : ""} aria-pressed={locale === lang} onClick={() => onLocaleChange?.(lang)}>{lang === "sw" ? "SW" : lang.toUpperCase()}</button>)}
      </div>
      {onVoicebot ? <button className="button button-primary header-action" type="button" onClick={onVoicebot}><span aria-hidden="true">☎</span>Parler au bot</button> : <Link className="button button-primary header-action" href="/#voicebot"><span aria-hidden="true">☎</span>Parler au bot</Link>}
      <button className="menu-button" type="button" aria-label="Ouvrir le menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
    </div>
  </header>;
}

const commitments = [
  ["platform", 2, 0, "Réponses vocales"],
  ["platform", 4, 1, "Informations sanitaires"],
  ["platform", 5, 1, "Vie privée protégée"],
  ["platform", 4, 2, "Trois langues"],
] as const;

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="shell footer-grid">
      <div className="footer-identity"><Brand /><p>Un prototype d’information et d’orientation Ebola pour la République démocratique du Congo. Il ne remplace ni le Ministère de la Santé, ni le 151, ni un professionnel de santé.</p></div>
      <div><p className="kicker muted">Nos engagements</p><ul className="commitment-grid">{commitments.map(([sheet, col, row, label]) => <li key={label}><SpriteIcon sheet={sheet} col={col} row={row} /><b>{label}</b></li>)}</ul></div>
      <div className="footer-emergency"><p className="kicker muted">Orientation officielle</p><a className="footer-number" href="tel:151">151</a><strong>Suspicion d’Ebola ou urgence sanitaire</strong><p>Appelez avant de vous déplacer. Le 112 est réservé à la Police en cas de danger de sécurité distinct.</p></div>
    </div>
    <div className="shell source-band"><p className="kicker muted">Références sanitaires</p><div><a href="https://sante.gouv.cd/epidemie" target="_blank" rel="noreferrer">Ministère de la Santé RDC</a><a href="https://www.who.int/health-topics/ebola" target="_blank" rel="noreferrer">Organisation mondiale de la Santé</a><a href="https://www.unicef.org/drcongo/" target="_blank" rel="noreferrer">UNICEF RDC</a></div></div>
    <div className="shell legal-line"><span>© 2026 Voicebot Ebola — RDC</span><span>Prototype non officiel. Aucun diagnostic, aucune géolocalisation, aucun transfert automatique vers les secours.</span><div><Link href="/mentions-legales">Mentions légales</Link><Link href="/confidentialite">Confidentialité</Link><Link href="/sources">Sources</Link></div></div>
  </footer>;
}

export function PageIntro({ kicker, title, children }: { kicker: string; title: React.ReactNode; children: React.ReactNode }) {
  return <div className="section-intro"><p className="kicker accent">{kicker}</p><h2>{title}</h2><div className="lead">{children}</div></div>;
}

export function PageCta() {
  return <section className="page-cta"><div className="shell"><div><p className="kicker">Une question, une inquiétude ?</p><h2>Parlez au voicebot. Pour une suspicion, appelez le 151.</h2></div><div className="page-cta-actions"><Link className="button button-primary" href="/#voicebot">Parler au voicebot</Link><a className="button button-outline-light" href="tel:151">Urgence santé · 151</a></div></div></section>;
}
