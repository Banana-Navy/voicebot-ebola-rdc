"use client";

import Link from "next/link";
import { assetPath } from "./asset-path";
import { PageIntro, SiteFooter, SiteHeader } from "./site-chrome";
import { SpriteIcon } from "./sprite-icon";
import { useSiteEffects } from "./use-site-effects";
import { useVoicebotPanel } from "./voicebot-panel";

const copy = {
  fr: {
    eyebrow: "République démocratique du Congo",
    titleA: ["Une voix", "Pour informer,", "Rassurer et agir"],
    titleB: "face à Ebola",
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
    titleA: ["One voice", "To inform,", "Reassure and act"],
    titleB: "against Ebola",
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
    titleA: ["Sauti moja", "Ya kutoa taarifa,", "Kutuliza na kuchukua hatua"],
    titleB: "dhidi ya Ebola",
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
  { icon: [1, 0] as const, title: "Évitez les contacts", text: "Ne touchez pas une personne malade, un corps, des fluides ou des objets contaminés. Laissez intervenir les équipes formées." },
  { icon: [3, 2] as const, title: "Appelez le 151", text: "Signalez immédiatement une suspicion et suivez les instructions des équipes sanitaires." },
];

const capabilities = [
  { icon: [0, 0] as const, title: "Conversation vocale", text: "Une réponse orale immédiate depuis un smartphone, directement dans le navigateur." },
  { icon: [1, 0] as const, title: "Corpus sourcé", text: "Les réponses s’appuient sur des publications sanitaires officielles identifiées." },
  { icon: [2, 0] as const, title: "Trois langues", text: "Français, anglais et kiswahili, avec un accueil adapté à la population locale." },
  { icon: [0, 1] as const, title: "Messages cohérents", text: "Une même consigne pour la population, les relais et les autorités." },
  { icon: [1, 1] as const, title: "Vie privée", text: "Pas de nom, d’adresse complète ou de dossier médical demandé." },
  { icon: [2, 1] as const, title: "Disponible 24 h / 24", text: "L’information générale reste accessible ; une suspicion va toujours au 151." },
];

const audiences = [
  { icon: [0, 0] as const, title: "Familles", text: "Comprendre les premiers gestes sans exposer les proches." },
  { icon: [1, 0] as const, title: "Communautés", text: "Répondre aux inquiétudes sans stigmatisation ni confrontation." },
  { icon: [0, 1] as const, title: "Relais sanitaires", text: "Répéter une consigne courte, cohérente et traçable." },
  { icon: [1, 1] as const, title: "Autorités et partenaires", text: "Diffuser un corpus contrôlé sans remplacer les canaux officiels." },
];

const facts = [
  { sheet: "a" as const, icon: [3, 1] as const, title: "Les symptômes ne suffisent pas", text: "Fièvre, faiblesse, vomissements ou diarrhée peuvent avoir plusieurs causes. Seul un test de laboratoire confirme Ebola." },
  { sheet: "a" as const, icon: [1, 0] as const, title: "Le contact direct est le risque central", text: "Évitez le sang, les fluides corporels et les objets souillés. Ne touchez jamais un corps ; laissez intervenir les équipes formées." },
  { sheet: "b" as const, icon: [1, 3] as const, title: "Un contact doit être suivi", text: "Une personne ne transmet pas Ebola avant les symptômes, mais un contact doit suivre les consignes sanitaires pendant 21 jours." },
  { sheet: "a" as const, icon: [1, 1] as const, title: "N’allez pas au hasard à l’hôpital", text: "Les capacités changent. Appelez le 151 et attendez l’orientation officielle avant de vous déplacer." },
];

export default function Home() {
  const { start, panel } = useVoicebotPanel();
  useSiteEffects();
  const t = copy.fr;

  return <main>
    <div className="safety-strip">Suspicion d’Ebola ou urgence sanitaire : <a href="tel:151"><strong>appelez le 151</strong></a></div>
    <div className="home-stage">
      <SiteHeader active="home" transparent onVoicebot={start} />
      <section className="home-hero" id="top">
        <img className="hero-background" src={assetPath("/visuals/hero-rdc.webp")} srcSet={`${assetPath("/visuals/hero-rdc-mobile.webp")} 760w, ${assetPath("/visuals/hero-rdc.webp")} 1672w`} sizes="100vw" alt="Centre de santé illustré en République démocratique du Congo" />
        <div className="hero-overlay" />
        <div className="shell hero-layout">
          <div className="hero-copy">
            <p className="hero-eyebrow" data-reveal>{t.eyebrow}</p>
            <h1 data-reveal><span>{t.titleA.map((line) => <span className="hero-title-line" key={line}>{line}</span>)}</span><strong>{t.titleB}</strong></h1>
            <p className="hero-lead" data-reveal>{t.subtitle}</p>
            <div className="hero-arguments">
              <article data-bento><SpriteIcon sheet="platform" col={2} row={0} /><span>Réponse vocale<br />immédiate</span></article>
              <article data-bento><SpriteIcon sheet="platform" col={0} row={1} /><span>Consignes<br />sourcées</span></article>
              <article data-bento><SpriteIcon sheet="platform" col={4} row={2} /><span>Français · English<br />Kiswahili</span></article>
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

    <section className="band band-sand" id="agir">
      <div className="shell"><PageIntro kicker={t.stepsKicker} title={t.stepsTitle}><p>{t.stepsLead}</p></PageIntro>
        <div className="three-card-grid stack-mobile">{protectiveSteps.map(({ icon, title, text }) => <article className="content-card" data-bento data-reveal key={title}><SpriteIcon col={icon[0]} row={icon[1]} label={title} /><span className="card-number">0{protectiveSteps.findIndex((item) => item.title === title) + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <aside className="official-note" data-bento data-reveal><SpriteIcon col={2} row={2} label="Alerte" /><div><h3>Une personne est malade ou un décès paraît suspect ?</h3><p>Ne touchez pas la personne, le corps ou les fluides. Éloignez les autres, laissez intervenir les équipes formées et appelez immédiatement le 151.</p></div><a className="button button-primary" href="tel:151">Appeler le 151</a></aside>
      </div>
    </section>

    <section className="band band-white flow-section" id="fonctionnement">
      <div className="shell"><PageIntro kicker={t.flowKicker} title={t.flowTitle}><p>{t.flowLead}</p></PageIntro>
        <div className="visual-split">
          <div className="home-flow-visual"><img src={assetPath("/visuals/voicebot-flow.webp")} srcSet={`${assetPath("/visuals/voicebot-flow-mobile.webp")} 760w, ${assetPath("/visuals/voicebot-flow.webp")} 1683w`} sizes="(max-width: 760px) 100vw, 70vw" alt="Parcours illustré de l’appelant vers le voicebot, les consignes officielles et la communauté" loading="lazy" /></div>
          <ol className="flow-list">
            <li data-bento data-reveal><b>1</b><div><h3>Vous parlez</h3><p>Le voicebot écoute en français, anglais ou kiswahili.</p></div></li>
            <li data-bento data-reveal><b>2</b><div><h3>Il qualifie la demande</h3><p>Urgence, contact sans symptôme, information ou danger de sécurité.</p></div></li>
            <li data-bento data-reveal><b>3</b><div><h3>Il donne l’action sûre</h3><p>Le 151 passe toujours avant une explication lorsqu’une suspicion est décrite.</p></div></li>
          </ol>
        </div>
      </div>
    </section>

    <section className="band band-cool capability-section">
      <div className="shell"><PageIntro kicker="Ce que le voicebot apporte" title={<>Une information claire, accessible à tout moment.</>}><p>Le Voicebot Ebola accompagne la population avec des réponses vocales immédiates, fondées sur des sources sanitaires officielles identifiées. Il informe clairement, reste disponible 24 h / 24 et indique explicitement lorsqu’une situation dépasse son périmètre.</p></PageIntro>
        <div className="capability-grid six">{capabilities.map(({ icon, title, text }) => <article className="mini-card visual-bento" data-bento data-reveal key={title}><SpriteIcon sheet="capabilities" col={icon[0]} row={icon[1]} label={title} /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </div>
    </section>

    <section className="band band-white">
      <div className="shell"><PageIntro kicker="Comprendre sans diagnostiquer" title={<>Quatre repères simples pour éviter les mauvaises décisions.</>}><p>Ces informations générales suivent la fiche Ebola de l’OMS. Une situation individuelle doit toujours être évaluée par les équipes sanitaires.</p></PageIntro><div className="fact-grid">{facts.map(({ sheet, icon, title, text }) => <article className="fact-card" data-bento data-reveal key={title}><SpriteIcon sheet={sheet} col={icon[0]} row={icon[1]} label={title} /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div><p className="section-source">Source principale : <a href="https://www.who.int/news-room/fact-sheets/detail/ebola-disease" target="_blank" rel="noreferrer">Organisation mondiale de la Santé — fiche Ebola</a></p></div>
    </section>

    <section className="band band-dark">
      <div className="shell"><PageIntro kicker="Pour toute la communauté" title={<>Une même consigne, adaptée à chaque relais.</>}><p>Le voicebot ne remplace pas les personnes de confiance. Il aide à diffuser une information cohérente sans stigmatiser les malades, les survivants, les familles ou les communautés.</p></PageIntro><div className="audience-grid">{audiences.map(({ icon, title, text }) => <article data-bento data-reveal key={title}><SpriteIcon sheet="community" col={icon[0]} row={icon[1]} label={title} /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div><div className="dark-actions"><Link className="text-link light" href="/agir">Voir toutes les consignes</Link><Link className="text-link light" href="/flambees">Consulter les flambées documentées</Link></div></div>
    </section>

    <section className="band band-cream">
      <div className="shell call-showcase">
        <div className="call-showcase-visual"><img src={assetPath("/visuals/voicebot-trust.webp")} srcSet={`${assetPath("/visuals/voicebot-trust-mobile.webp")} 760w, ${assetPath("/visuals/voicebot-trust.webp")} 1448w`} sizes="(max-width: 760px) 100vw, 50vw" alt="Voicebot Ebola illustré avec téléphone, document officiel et bouclier de confiance" loading="lazy" /></div>
        <div><p className="kicker accent">Test vocal dans le navigateur</p><h2>Posez une question. Écoutez une réponse encadrée.</h2><p className="lead">Le greeting commence en français. Vous pouvez ensuite dire « français », « English » ou « Kiswahili ».</p><button className="button button-primary button-large" type="button" onClick={start}>Démarrer la conversation</button><p className="microcopy">Microphone requis · Aucun appel au 151 n’est déclenché automatiquement</p></div>
      </div>
    </section>

    <section className="page-cta"><div className="shell"><div><p className="kicker">Face à Ebola, chaque geste compte</p><h2>Informez-vous. Protégez-vous. Protégeons nos communautés.</h2></div><div className="page-cta-actions"><button className="button button-primary" type="button" onClick={start}>Parler au voicebot</button><a className="button button-outline-light" href="tel:151">Urgence santé · 151</a></div></div></section>
    <SiteFooter />
    {panel}
  </main>;
}
