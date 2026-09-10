"use client";

import Link from "next/link";
import { useState } from "react";
import { assetPath } from "./asset-path";
import { Locale, PageIntro, SiteFooter, SiteHeader } from "./site-chrome";
import { SpriteIcon } from "./sprite-icon";
import { useSiteEffects } from "./use-site-effects";
import { useVoicebotPanel } from "./voicebot-panel";

const copy = {
  fr: {
    eyebrow: "République démocratique du Congo",
    titleA: "Une voix pour",
    titleB: "stopper Ebola",
    subtitle: "Un assistant vocal qui informe, répond aux questions et guide vers les bons gestes — sans diagnostic, sans rumeur et sans faux transfert.",
    talk: "Parler au voicebot",
    emergency: "Urgence santé · 151",
    safe: "Le test du voicebot n’alerte pas les secours. Si une personne est malade ou si Ebola est suspecté, appelez immédiatement le 151.",
    stepsKicker: "Les bons gestes",
    stepsTitle: "Face à une suspicion, chaque geste compte.",
    stepsLead: "N’attendez pas une confirmation et ne vous déplacez pas au hasard. Le 151 vous donne l’orientation sanitaire officielle.",
    flowKicker: "Comment ça fonctionne",
    flowTitle: "Une conversation simple, reliée aux consignes contrôlées.",
    flowLead: "Le bot reconnaît la langue, distingue l’urgence d’une demande d’information et reste dans un périmètre strict.",
  },
  en: {
    eyebrow: "Democratic Republic of the Congo",
    titleA: "One voice to",
    titleB: "stop Ebola",
    subtitle: "A voice assistant that informs, answers questions and guides people toward safer actions — without diagnosis, rumours or false transfers.",
    talk: "Talk to the voicebot",
    emergency: "Health emergency · 151",
    safe: "The voicebot test does not alert emergency teams. If someone is ill or Ebola is suspected, call 151 immediately.",
    stepsKicker: "Protective actions",
    stepsTitle: "When Ebola is suspected, every action matters.",
    stepsLead: "Do not wait for confirmation and do not travel at random. Call 151 for official health guidance.",
    flowKicker: "How it works",
    flowTitle: "A simple conversation grounded in controlled guidance.",
    flowLead: "The bot recognises the language, separates urgent situations from information requests and stays within strict limits.",
  },
  sw: {
    eyebrow: "Jamhuri ya Kidemokrasia ya Kongo",
    titleA: "Sauti moja ya",
    titleB: "kuzuia Ebola",
    subtitle: "Msaidizi wa sauti anayetoa taarifa, kujibu maswali na kuelekeza watu kwenye hatua salama — bila kutambua ugonjwa au kueneza uvumi.",
    talk: "Zungumza na voicebot",
    emergency: "Dharura ya afya · 151",
    safe: "Jaribio la voicebot haliarifu wahudumu wa dharura. Ikiwa mtu ni mgonjwa au unashuku Ebola, piga 151 mara moja.",
    stepsKicker: "Hatua salama",
    stepsTitle: "Ukishuku Ebola, kila hatua ni muhimu.",
    stepsLead: "Usisubiri uthibitisho wala kusafiri bila maelekezo. Piga 151 upate mwongozo rasmi wa afya.",
    flowKicker: "Jinsi inavyofanya kazi",
    flowTitle: "Mazungumzo rahisi yanayotumia maelekezo yaliyodhibitiwa.",
    flowLead: "Bot inatambua lugha, inatenganisha dharura na maswali ya taarifa, na inabaki ndani ya mipaka yake.",
  },
};

const protectiveSteps = [
  { icon: [0, 0] as const, title: "Lavez-vous les mains", text: "Utilisez de l’eau et du savon. Évitez de toucher les fluides corporels ou des objets souillés." },
  { icon: [1, 0] as const, title: "Évitez les contacts", text: "Ne touchez pas sans protection une personne malade, un corps ou les objets contaminés." },
  { icon: [3, 2] as const, title: "Appelez le 151", text: "Signalez immédiatement une suspicion et suivez les instructions des équipes sanitaires." },
];

const capabilities = [
  { icon: [2, 0] as const, title: "Français, English, Kiswahili", text: "Un accueil français aujourd’hui, avec bascule vocale dans la langue choisie." },
  { icon: [1, 3] as const, title: "Consignes contrôlées", text: "Les réponses sont limitées aux contenus officiels vérifiés et datés." },
  { icon: [3, 1] as const, title: "Orientation prudente", text: "Le bot n’invente ni hôpital, ni disponibilité, ni itinéraire." },
  { icon: [3, 3] as const, title: "Accessible à tous", text: "Des phrases courtes, une action à la fois et des limites clairement annoncées." },
];

export default function Home() {
  const [locale, setLocale] = useState<Locale>("fr");
  const { start, panel } = useVoicebotPanel();
  useSiteEffects();
  const t = copy[locale];

  return <main>
    <div className="safety-strip">Suspicion d’Ebola ou urgence sanitaire : <a href="tel:151"><strong>appelez le 151</strong></a> · Danger de sécurité distinct : 112 Police</div>
    <div className="home-stage">
      <SiteHeader active="home" transparent locale={locale} onLocaleChange={setLocale} onVoicebot={start} />
      <section className="home-hero" id="top">
        <img className="hero-background" src={assetPath("/visuals/hero-rdc.png")} alt="Centre de santé illustré en République démocratique du Congo" />
        <div className="hero-overlay" />
        <div className="shell hero-layout">
          <div className="hero-copy">
            <p className="hero-eyebrow" data-reveal>{t.eyebrow}</p>
            <h1 data-reveal><span>{t.titleA}</span><strong>{t.titleB}</strong></h1>
            <p className="hero-lead" data-reveal>{t.subtitle}</p>
            <div className="hero-arguments">
              <article data-bento><SpriteIcon sheet="platform" col={2} row={0} /><span>Réponses<br />en temps réel</span></article>
              <article data-bento><SpriteIcon sheet="platform" col={4} row={1} /><span>Conseils<br />fiables</span></article>
              <article data-bento><SpriteIcon sheet="a" col={2} row={3} /><span>Accessible<br />à tous</span></article>
            </div>
            <div className="hero-actions" id="voicebot">
              <button className="button button-primary button-large" type="button" onClick={start}><span aria-hidden="true">☎</span>{t.talk}<span aria-hidden="true">→</span></button>
              <a className="button button-secondary" href="tel:151">{t.emergency}</a>
            </div>
          </div>
        </div>
        <div className="hero-trust shell"><span className="trust-dot" aria-hidden="true" /><span>{t.safe}</span></div>
      </section>
    </div>

    <section className="trust-ribbon" aria-label="Principaux engagements"><div className="shell">
      <span>24 h / 24</span><i /> <span>Trois langues</span><i /> <span>Sources officielles</span><i /> <span>Sans diagnostic</span><i /> <span>Vie privée par défaut</span>
    </div></section>

    <section className="band band-sand" id="agir">
      <div className="shell"><PageIntro kicker={t.stepsKicker} title={t.stepsTitle}><p>{t.stepsLead}</p></PageIntro>
        <div className="three-card-grid stack-mobile">{protectiveSteps.map(({ icon, title, text }) => <article className="content-card" data-bento data-reveal key={title}><SpriteIcon col={icon[0]} row={icon[1]} label={title} /><span className="card-number">0{protectiveSteps.findIndex((item) => item.title === title) + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <aside className="official-note" data-bento data-reveal><SpriteIcon col={2} row={2} label="Alerte" /><div><h3>Une personne est malade ou un décès paraît suspect ?</h3><p>Ne touchez pas la personne, le corps ou les fluides sans protection. Éloignez les autres et appelez immédiatement le 151.</p></div><a className="button button-primary" href="tel:151">Appeler le 151</a></aside>
      </div>
    </section>

    <section className="band band-white" id="fonctionnement">
      <div className="shell"><PageIntro kicker={t.flowKicker} title={t.flowTitle}><p>{t.flowLead}</p></PageIntro>
        <div className="visual-split">
          <div className="visual-frame wide" data-bento data-reveal><img src={assetPath("/visuals/voicebot-flow.png")} alt="Parcours illustré de l’appelant vers le voicebot, les consignes officielles et la communauté" loading="lazy" /></div>
          <ol className="flow-list">
            <li data-bento data-reveal><b>1</b><div><h3>Vous parlez</h3><p>Le voicebot écoute en français, anglais ou kiswahili.</p></div></li>
            <li data-bento data-reveal><b>2</b><div><h3>Il qualifie la demande</h3><p>Urgence, contact sans symptôme, information ou danger de sécurité.</p></div></li>
            <li data-bento data-reveal><b>3</b><div><h3>Il donne l’action sûre</h3><p>Le 151 passe toujours avant une explication lorsqu’une suspicion est décrite.</p></div></li>
          </ol>
        </div>
      </div>
    </section>

    <section className="band band-cool">
      <div className="shell"><PageIntro kicker="Ce que le voicebot apporte" title={<>Toujours là quand l’information doit rester claire.</>}><p>Le système accompagne la population et relaie les consignes validées, tout en annonçant explicitement ce qu’il ne peut pas faire.</p></PageIntro>
        <div className="capability-layout">
          <div className="capability-grid">{capabilities.map(({ icon, title, text }) => <article className="mini-card" data-bento data-reveal key={title}><SpriteIcon sheet="platform" col={icon[0]} row={icon[1]} /><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="visual-frame portrait" data-bento data-reveal><img src={assetPath("/visuals/capabilities-grid.png")} alt="Illustrations du service vocal, des consignes officielles, des langues, des alertes et de la confidentialité" loading="lazy" /></div>
        </div>
      </div>
    </section>

    <section className="band band-dark">
      <div className="shell community-layout">
        <div><p className="kicker red">Pour toute la communauté</p><h2>Une même consigne, de la famille aux autorités.</h2><p className="lead">Le voicebot ne remplace pas les relais locaux. Il aide à diffuser une information cohérente, sans stigmatiser les personnes malades, les survivants, les familles ou les communautés.</p><div className="dark-actions"><Link className="text-link light" href="/agir">Voir toutes les consignes</Link><Link className="text-link light" href="/situation">Consulter la situation officielle</Link></div></div>
        <div className="visual-frame" data-bento data-reveal><img src={assetPath("/visuals/community-response.png")} alt="Familles, professionnels de santé et autorités congolaises illustrés" loading="lazy" /></div>
      </div>
    </section>

    <section className="band band-cream">
      <div className="shell call-showcase">
        <div className="visual-frame" data-bento data-reveal><img src={assetPath("/visuals/voicebot-trust.png")} alt="Voicebot Ebola illustré avec téléphone, document officiel et bouclier de confiance" loading="lazy" /></div>
        <div><p className="kicker accent">Test vocal dans le navigateur</p><h2>Posez une question. Écoutez une réponse encadrée.</h2><p className="lead">Le greeting commence en français. Vous pouvez ensuite dire « français », « English » ou « Kiswahili ».</p><button className="button button-primary button-large" type="button" onClick={start}>Démarrer la conversation</button><p className="microcopy">Microphone requis · Aucun appel au 151 n’est déclenché automatiquement</p></div>
      </div>
    </section>

    <section className="page-cta"><div className="shell"><div><p className="kicker">Face à Ebola, chaque geste compte</p><h2>Informez-vous. Protégez-vous. Protégeons nos communautés.</h2></div><div className="page-cta-actions"><button className="button button-primary" type="button" onClick={start}>Parler au voicebot</button><a className="button button-outline-light" href="tel:151">Urgence santé · 151</a></div></div></section>
    <SiteFooter />
    {panel}
  </main>;
}
