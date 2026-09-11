"use client";

import Link from "next/link";
import { useState } from "react";
import { assetPath } from "./asset-path";
import { SpriteIcon } from "./sprite-icon";

type Active = "home" | "agir" | "flambees" | "sources" | "technologie";

const nav = [
  { href: "/", label: "Accueil", key: "home" },
  { href: "/agir", label: "Que faire ?", key: "agir" },
  { href: "/flambees", label: "Flambées", key: "flambees" },
  { href: "/sources", label: "Sources", key: "sources" },
  { href: "/technologie", label: "Technologie", key: "technologie" },
] as const;

export function Brand() {
  return <span className="brand-lockup"><img className="brand-mark-image" src={assetPath("/visuals/brand-mark.webp")} alt="" aria-hidden="true" /><span><b>VOICEBOT</b><em>EBOLA</em><small>Informer. Protéger. Agir.</small></span></span>;
}

export function SiteHeader({ active, transparent = false, onVoicebot }: { active?: Active; transparent?: boolean; onVoicebot?: () => void }) {
  const [open, setOpen] = useState(false);
  return <header className={`site-header ${transparent ? "is-transparent" : ""}`}>
    <div className="shell header-inner">
      <Link className="site-brand" href="/" aria-label="Voicebot Ebola, accueil"><Brand /></Link>
      <nav className={open ? "is-open" : ""} aria-label="Navigation principale">
        {nav.map((item) => <Link key={item.href} className={active === item.key ? "active" : ""} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
      </nav>
      <div className="language-switch" aria-label="Langues parlées par le voicebot" title="Voicebot disponible en français, anglais et kiswahili">
        <span className="active">FR</span><span>EN</span><span>SW</span>
      </div>
      {onVoicebot ? <button className="button button-primary header-action" type="button" onClick={onVoicebot}><span aria-hidden="true">☎</span>Parler au bot</button> : <Link className="button button-primary header-action" href="/#voicebot"><span aria-hidden="true">☎</span>Parler au bot</Link>}
      <button className="menu-button" type="button" aria-label="Ouvrir le menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
    </div>
  </header>;
}

const commitments = [
  ["platform", 2, 0, "Réponses vocales"],
  ["platform", 4, 1, "Informations sanitaires"],
  ["platform", 5, 1, "Données minimisées"],
  ["platform", 4, 2, "Trois langues"],
] as const;

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="shell footer-grid">
      <div className="footer-identity"><Brand /><p>Un prototype d’information et d’orientation Ebola pour la République démocratique du Congo. Il ne remplace ni le Ministère de la Santé, ni le 151, ni un professionnel de santé.</p></div>
      <div><p className="kicker muted">Nos engagements</p><ul className="commitment-grid">{commitments.map(([sheet, col, row, label]) => <li key={label}><SpriteIcon sheet={sheet} col={col} row={row} /><b>{label}</b></li>)}</ul></div>
      <div className="footer-contact"><p className="kicker muted">Contact</p><address><strong>Marc-Antoine Cajot</strong><a href="tel:+32495277044">+32 495 277 044</a><a href="mailto:marc@banana-navy.com">marc@banana-navy.com</a><a href="https://www.banana-navy.ai" target="_blank" rel="noreferrer">www.banana-navy.ai</a><span>Rue Antoine de Saint-Exupéry 2<br />6041 Charleroi, Belgique</span></address></div>
    </div>
    <div className="shell source-band"><p className="kicker muted">Références sanitaires</p><div><a href="https://sante.gouv.cd/epidemie" target="_blank" rel="noreferrer">Ministère de la Santé RDC</a><a href="https://www.who.int/health-topics/ebola" target="_blank" rel="noreferrer">Organisation mondiale de la Santé</a><a href="https://www.unicef.org/drcongo/epidemie-ebola" target="_blank" rel="noreferrer">UNICEF RDC</a></div></div>
    <div className="shell legal-line"><span>© 2026 Voicebot Ebola — RDC</span><span>Prototype non officiel. Aucun diagnostic, aucune géolocalisation, aucun transfert automatique vers les secours.</span><div><Link href="/mentions-legales">Mentions légales</Link><Link href="/confidentialite">Confidentialité</Link><Link href="/sources">Sources</Link></div></div>
  </footer>;
}

export function PageIntro({ kicker, title, children }: { kicker: string; title: React.ReactNode; children: React.ReactNode }) {
  return <div className="section-intro"><p className="kicker accent">{kicker}</p><h2>{title}</h2><div className="lead">{children}</div></div>;
}

export function PageCta() {
  return <section className="page-cta"><div className="shell"><div><p className="kicker">Une question, une inquiétude ?</p><h2>Parlez au voicebot. Pour une suspicion, appelez le 151.</h2></div><div className="page-cta-actions"><Link className="button button-primary" href="/#voicebot">Parler au voicebot</Link><a className="button button-outline-light" href="tel:151">Urgence santé · 151</a></div></div></section>;
}
