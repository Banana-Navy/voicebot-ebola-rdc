import { assetPath } from "../asset-path";
import { ContentPage } from "../content-page";
import { SpriteIcon } from "../sprite-icon";

const layers = [
  [1, 0, "Canal vocal", "Conversation dans le navigateur aujourd’hui; numéro RDC à valider avec un opérateur local avant toute publication téléphonique."],
  [2, 0, "Agent trilingue", "Greeting français, puis français, anglais ou kiswahili avec changement de langue contrôlé."],
  [0, 1, "Corpus fermé", "Prompt et base de connaissances versionnés; aucun chiffre variable annoncé comme temps réel."],
  [5, 1, "Confidentialité", "Aucun nom, adresse complète ou dossier médical demandé; enregistrement désactivé par défaut."],
  [4, 0, "Routage de sécurité", "Urgence sanitaire vers 151; 112 uniquement pour un danger de sécurité distinct."],
  [3, 3, "Validation", "Scénarios multilingues, bruit, interruption, rumeur, décès, demande d’hôpital et injection de prompt."],
] as const;

export default function ArchitecturePage() {
  return <ContentPage active="architecture" kicker="Architecture contrôlée" title={<>Une voix chaleureuse.<br />Des limites techniques strictes.</>} lead="La première version reste volontairement simple : une landing page, un agent ElevenLabs et un corpus contrôlé dans Git. Supabase n’est pas nécessaire tant qu’aucune donnée opérationnelle n’est administrée en ligne.">
    <section className="band band-white"><div className="shell"><div className="architecture-grid">{layers.map(([col, row, title, text]) => <article key={title} data-bento data-reveal><SpriteIcon sheet="platform" col={col} row={row} /><h2>{title}</h2><p>{text}</p></article>)}</div></div></section>
    <section className="band band-cool"><div className="shell reference-layout"><div><p className="kicker accent">Direction visuelle</p><h2>Conçue pour être comprise en quelques secondes.</h2><p className="lead">La page reprend l’architecture de démonstration Nuclear : hero immersif, cartes interactives, blocs de preuves, appel à l’action persistant et footer documenté. Le contenu reste entièrement adapté à Ebola en RDC.</p></div><div className="visual-frame screen" data-bento data-reveal><img src={assetPath("/visuals/vision-landing.png")} alt="Vision initiale de la landing page Voicebot Ebola" /></div></div></section>
    <section className="band band-sand"><div className="shell decision-grid"><article data-bento data-reveal><p className="kicker accent">Supabase</p><h2>Pas en phase 1.</h2><p>À ajouter uniquement si une autorité doit approuver des contenus, retirer une consigne en direct, gérer des rappels humains ou consulter des événements anonymisés.</p></article><div className="visual-frame" data-bento data-reveal><img src={assetPath("/visuals/platform-icons.png")} alt="Bibliothèque visuelle des fonctions de la plateforme" /></div></div></section>
  </ContentPage>;
}
