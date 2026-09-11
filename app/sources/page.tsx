import { ContentPage } from "../content-page";
import { SpriteIcon } from "../sprite-icon";

const sources = [
  [1, 1, "Ministère de la Santé RDC", "Surveillance épidémiologique, déclarations et rapports de situation.", "https://sante.gouv.cd/epidemie"],
  [3, 2, "Primature de la RDC", "Compte rendu officiel décrivant le 112 comme numéro traditionnel de la Police; sa joignabilité locale reste à confirmer.", "https://www.primature.gouv.cd/wp-content/uploads/2026/04/COMPTE-RENDU-DE-LA-QUATRE-VINGT-SEPTIEME-REUNION-ORDINAIRE-DU-CONSEIL-DES-MINISTRES-DU-24-AVRIL-2026.pdf"],
  [0, 2, "Organisation mondiale de la Santé", "Fiche maladie Ebola, transmission, symptômes, soins et prévention.", "https://www.who.int/news-room/fact-sheets/detail/ebola-disease"],
  [2, 2, "OMS — Disease Outbreak News", "Mise à jour du 10 septembre 2026 sur la flambée Bundibugyo en RDC.", "https://www.who.int/emergencies/disease-outbreak-news/item/2026-DON617"],
  [0, 3, "OMS Afrique", "Dialogue communautaire, confiance, soins et adaptation de la riposte.", "https://www.afro.who.int/countries/democratic-republic-of-congo/news/community-dialogue-building-trust-ebola-response-democratic-republic-congo"],
  [2, 3, "UNICEF RDC", "Information Ebola, communication communautaire et protection des enfants et des familles.", "https://www.unicef.org/drcongo/epidemie-ebola"],
] as const;

export default function SourcesPage() {
  return <ContentPage active="sources" kicker="Registre documentaire" title={<>Les sources avant<br />les réponses.</>} lead="Le corpus privilégie les autorités sanitaires et les publications primaires. Chaque donnée variable est datée; les consignes instables ne sont jamais mémorisées comme une vérité permanente.">
    <section className="band band-white"><div className="shell"><div className="source-list source-grid" data-stack>{sources.map(([col, row, name, description, url], index) => <a className="source-item" href={url} target="_blank" rel="noreferrer" key={url} data-bento data-reveal><SpriteIcon sheet="b" col={col} row={row} label={name} /><span className="source-index">0{index + 1}</span><div><p className="kicker accent">Source officielle</p><h2>{name}</h2><p>{description}</p><small>{new URL(url).hostname}</small></div></a>)}</div></div></section>
    <section className="band band-sand"><div className="shell"><article className="method-card method-with-icon" data-bento data-reveal><SpriteIcon sheet="platform" col={1} row={3} label="Validation" /><div><h2>Méthode de mise à jour</h2><p>Vérifier la source primaire, enregistrer la date d’effet, relire le français, l’anglais et le kiswahili, tester l’agent distant, puis retirer immédiatement toute consigne qui n’est plus confirmée.</p></div></article></div></section>
  </ContentPage>;
}
