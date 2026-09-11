import { assetPath } from "../asset-path";
import { ContentPage } from "../content-page";
import { PageIntro } from "../site-chrome";
import { SpriteIcon } from "../sprite-icon";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://banana-navy.github.io/voicebot-ebola-rdc";

export const metadata: Metadata = {
  title: "Technologie du voicebot Ebola",
  description: "Découvrez les couches de contrôle, le parcours vocal, les règles de sécurité et les composants actifs du voicebot Ebola pour la RDC.",
  alternates: { canonical: `${siteUrl}/technologie/` },
};

const heroControls = [
  { icon: [1, 0] as const, label: "Interface vocale" },
  { icon: [1, 2] as const, label: "Compréhension guidée" },
  { icon: [4, 1] as const, label: "Règles métier" },
  { icon: [0, 1] as const, label: "Corpus sourcé" },
  { icon: [0, 2] as const, label: "Réponse encadrée" },
];

const operationalFlow = [
  { number: "01", icon: [1, 0] as const, title: "Canal vocal", text: "Le prototype répond dans le navigateur via WebRTC. Un numéro local ou un trunk SIP congolais reste à obtenir et à valider avant tout lancement téléphonique." },
  { number: "02", icon: [4, 2] as const, title: "Transcription trilingue", text: "Scribe Realtime transforme la parole en texte et permet de reconnaître le français, l’anglais ou le kiswahili sans demander l’identité de l’appelant." },
  { number: "03", icon: [2, 0] as const, title: "Agent Ebola", text: "L’agent ElevenLabs est configuré pour répondre dans un périmètre Ebola défini et conserver uniquement le contexte utile pendant la conversation." },
  { number: "04", icon: [4, 0] as const, title: "Classification de sécurité", text: "Chaque demande rejoint une voie unique : suspicion sanitaire, contact sans symptôme, information générale ou danger de sécurité distinct." },
  { number: "05", icon: [4, 1] as const, title: "Décision et orientation", text: "Une suspicion déclenche d’abord la consigne d’appeler le 151. Le 112 n’est cité que pour une violence ou une menace distincte, sans garantir sa joignabilité locale." },
  { number: "06", icon: [0, 1] as const, title: "Corpus sanitaire sourcé", text: "Les réponses générales viennent de contenus versionnés et reliés à des sources officielles. Les chiffres datés, disponibilités hospitalières et informations non confirmées sont exclus de la réponse opérationnelle." },
  { number: "07", icon: [1, 3] as const, title: "Clôture, tests et traçabilité", text: "L’outil système end_call termine la session après confirmation. Les versions, scénarios critiques et résultats de validation restent auditables dans le dépôt." },
];

const protections = [
  { number: "01", icon: [1, 0] as const, title: "Canal et accès", summary: "Protège l’entrée du service et sépare le bot des numéros de secours.", points: ["Widget WebRTC sans secret côté client", "Aucun faux numéro téléphonique publié", "Trunk local soumis à validation opérateur", "Arrêt immédiat possible du widget"] },
  { number: "02", icon: [2, 0] as const, title: "Sécurité conversationnelle", summary: "Maintient chaque réponse dans les limites médicales et opérationnelles autorisées.", points: ["Résistance aux instructions malveillantes", "Refus du diagnostic et de l’automédication", "Action urgente avant toute explication", "Aucun faux transfert vers les secours"] },
  { number: "03", icon: [0, 1] as const, title: "Connaissances et règles Ebola", summary: "Empêche une donnée périmée de devenir une consigne de santé publique.", points: ["Sources primaires identifiées", "Séparation du daté et de l’opérationnel", "Validation humaine des changements", "Retrait des contenus devenus incertains"] },
];

const parallelLayers = [
  { icon: [4, 2] as const, title: "Compréhension vocale", summary: "Écoute la langue et le rythme de l’appelant.", items: [["Scribe Realtime", "Transcription continue de la parole."], ["Gestion des tours", "Silence, interruption et reprise naturelle."], ["Langue active", "Français, anglais ou kiswahili en cours de session."]] },
  { icon: [2, 0] as const, title: "Moteur conversationnel Ebola", summary: "Interprète l’intention et formule une réponse courte dans le périmètre prévu.", items: [["Contexte encadré", "Prompt Ebola et corpus sanitaire sourcé."], ["Réponse vocale", "Synthèse multilingue réglée pour une restitution fluide."], ["Limite explicite", "Le bot dit quand une information n’est pas confirmée."]] },
  { icon: [4, 0] as const, title: "Décision de sécurité", summary: "Applique les priorités avant que la réponse soit prononcée.", items: [["Triage non diagnostique", "Suspicion, contact, information ou sécurité."], ["Orientation sûre", "151 pour la santé; 112 Police avec disponibilité non garantie."], ["Contrôle final", "Numéro, langue, source et niveau d’urgence cohérents."]] },
];

const technology = [
  { icon: [1, 0] as const, label: "Interface vocale WebRTC", status: "Actif" },
  { icon: [2, 0] as const, label: "Agent conversationnel ElevenLabs", status: "Actif" },
  { icon: [4, 2] as const, label: "Scribe Realtime · FR / EN / SW", status: "Actif" },
  { icon: [1, 2] as const, label: "Eleven v3 · synthèse multilingue fluide", status: "Actif" },
  { icon: [0, 1] as const, label: "Prompt et corpus sanitaire versionnés", status: "Actif" },
  { icon: [5, 1] as const, label: "Rétention distante et consentement", status: "Actif" },
  { icon: [1, 3] as const, label: "Scénarios et contrôles automatisés", status: "Actif" },
  { icon: [1, 0] as const, label: "Numéro local RDC ou trunk SIP", status: "À valider" },
];

export default function TechnologiePage() {
  const hero = <section className="technology-cover"><div className="shell technology-cover-grid"><div className="technology-cover-copy"><p className="kicker accent">Technologie du voicebot</p><h1>Une conversation utile, encadrée par plusieurs couches de <strong>contrôle.</strong></h1><p>Le Voicebot Ebola combine une interface vocale, une compréhension guidée, des règles métier explicites et un corpus sanitaire sourcé pour produire des réponses claires et cohérentes. Chaque interaction est cadrée et filtrée afin de limiter le risque qu’une information incertaine ou non autorisée soit prononcée.</p></div><div className="technology-cover-art"><img src={assetPath("/visuals/technology-hero.webp")} srcSet={`${assetPath("/visuals/technology-hero-mobile.webp")} 760w, ${assetPath("/visuals/technology-hero.webp")} 1536w`} sizes="(max-width: 1180px) 100vw, 58vw" alt="Architecture multicouche du voicebot Ebola : appel, analyse, règles métier, corpus sanitaire sourcé et réponse encadrée en République démocratique du Congo" /></div><ul className="technology-cover-controls">{heroControls.map((item) => <li key={item.label} data-bento><SpriteIcon sheet="platform" col={item.icon[0]} row={item.icon[1]} label={item.label} /><span lang="fr">{item.label}</span></li>)}</ul></div></section>;

  return <ContentPage active="technologie" hero={hero}>

    <section className="band band-sand technology-flow-band"><div className="shell"><div className="architecture-hero-grid architecture-flow-grid"><div className="technology-flow-visual"><img src={assetPath("/visuals/voicebot-flow.webp")} srcSet={`${assetPath("/visuals/voicebot-flow-mobile.webp")} 760w, ${assetPath("/visuals/voicebot-flow.webp")} 1683w`} sizes="(max-width: 760px) 100vw, 64vw" alt="Parcours illustré de la personne vers l’agent vocal, le corpus sanitaire sourcé, l’orientation et la communauté" /></div><div><h2>De la parole à l’action sûre.</h2><p className="lead">La personne parle dans sa langue. Le système écoute, classe la demande, consulte son corpus sourcé et prononce une orientation. Il ne diagnostique pas, ne choisit pas un hôpital et ne prétend pas contacter les secours.</p></div></div></div></section>

    <section className="band band-cool"><div className="shell"><PageIntro kicker="Flux opérationnel" title={<>Sept points de contrôle, de la voix à la clôture.</>}><p>Aucune étape ne transforme une donnée incertaine en consigne. Les composants actifs et ceux qui restent à valider sont identifiés sans ambiguïté.</p></PageIntro><div className="technology-flow" data-stack>{operationalFlow.map((item) => <article className="technology-flow-row" key={item.number} data-bento data-reveal><b>{item.number}</b><SpriteIcon sheet="platform" col={item.icon[0]} row={item.icon[1]} label={item.title} /><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></div></section>

    <section className="band band-white"><div className="shell"><PageIntro kicker="Trois couches de protection" title={<>Chaque couche protège un point différent.</>}><p>Elles se complètent pour encadrer l’accès, la conversation et les connaissances utilisées par le voicebot.</p></PageIntro><div className="technology-protection-grid" data-stack>{protections.map((item) => <article className="technology-protection-card" key={item.number} data-bento data-reveal><span className="technology-card-number">{item.number}</span><SpriteIcon sheet="platform" col={item.icon[0]} row={item.icon[1]} label={item.title} /><div><h3>{item.title}</h3><p>{item.summary}</p><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul></div></article>)}</div></div></section>

    <section className="band band-dark"><div className="shell"><PageIntro kicker="Le principe central" title={<>Trois fonctions se complètent à chaque échange.</>}><p>La compréhension de l’audio, la formulation de la réponse et la décision de sécurité restent des responsabilités identifiables.</p></PageIntro><div className="technology-parallel-grid" data-stack>{parallelLayers.map((item) => <article className="technology-parallel-card" key={item.title} data-bento data-reveal><SpriteIcon sheet="platform" col={item.icon[0]} row={item.icon[1]} label={item.title} /><h3>{item.title}</h3><p>{item.summary}</p><dl>{item.items.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl></article>)}</div></div></section>

    <section className="band band-sand"><div className="shell technology-scope-reference"><div className="technology-scope-left"><PageIntro kicker="Périmètre opérationnel" title={<>Ce que le voicebot peut faire — et ce qu’il ne fera pas.</>}><p>Ces limites sont des règles de fonctionnement, pas une simple précaution éditoriale.</p></PageIntro><div className="technology-trust-visual"><img src={assetPath("/visuals/voicebot-trust.webp")} srcSet={`${assetPath("/visuals/voicebot-trust-mobile.webp")} 760w, ${assetPath("/visuals/voicebot-trust.webp")} 1448w`} sizes="(max-width: 1180px) 100vw, 58vw" alt="Voicebot, téléphone, document officiel et bouclier représentant la confiance et le contrôle" /></div></div><div className="technology-scope-grid" data-stack><article className="technology-scope-card can" data-bento data-reveal><span className="technology-scope-symbol" aria-hidden="true">✓</span><h3>Le voicebot peut</h3><ul><li>Informer en français, anglais et kiswahili</li><li>Donner immédiatement le 151 en cas de suspicion</li><li>Expliquer les gestes sourcés et répondre aux rumeurs</li><li>Reconnaître un contact sans symptôme</li><li>Dire qu’une information actuelle n’est pas confirmée</li></ul></article><article className="technology-scope-card cannot" data-bento data-reveal><span className="technology-scope-symbol" aria-hidden="true">×</span><h3>Le voicebot ne doit pas</h3><ul><li>Diagnostiquer ou recommander un traitement personnel</li><li>Appeler ou transférer vers le 151 à la place de la personne</li><li>Choisir un hôpital, un itinéraire ou un transport</li><li>Réciter des chiffres périmés comme une alerte actuelle</li><li>Demander une identité ou une adresse complète</li></ul></article></div></div></section>

    <section className="band band-white"><div className="shell"><PageIntro kicker="Composants technologiques" title={<>Une pile modulaire, interopérable et auditable.</>}><p>Le prototype public distingue les composants actifs de ceux qui restent à valider. La téléphonie congolaise doit encore être confirmée avec un opérateur local. Dans ElevenLabs, l’enregistrement, la mémoire utilisateur et la conservation des conversations sont désactivés.</p></PageIntro><ul className="technology-grid" data-stack>{technology.map((item) => <li key={item.label} data-bento data-reveal><SpriteIcon sheet="platform" col={item.icon[0]} row={item.icon[1]} label={item.label} /><span>{item.label}<small className={item.status === "Actif" ? "is-active" : "is-planned"}>{item.status}</small></span></li>)}</ul></div></section>

  </ContentPage>;
}
