import { assetPath } from "../asset-path";
import { ContentPage } from "../content-page";

const sources = [
  ["Ministère de la Santé RDC", "Surveillance épidémiologique, déclarations et rapports de situation.", "https://sante.gouv.cd/epidemie"],
  ["Ministère de l’Intérieur RDC", "Confirmation du 112 comme numéro de la Police nationale congolaise.", "https://saidiya.interieur.gouv.cd/contact"],
  ["Organisation mondiale de la Santé", "Fiche maladie Ebola, transmission, symptômes, soins et prévention.", "https://www.who.int/news-room/fact-sheets/detail/ebola-disease"],
  ["OMS — Disease Outbreak News", "Mises à jour documentées sur la flambée Bundibugyo en RDC.", "https://www.who.int/emergencies/disease-outbreak-news/item/2026-DON616"],
  ["OMS Afrique", "Dialogue communautaire, confiance, soins et adaptation de la riposte.", "https://www.afro.who.int/countries/democratic-republic-of-congo/news/community-dialogue-building-trust-ebola-response-democratic-republic-congo"],
  ["UNICEF RDC", "Communication communautaire et protection des enfants et des familles.", "https://www.unicef.org/drcongo/"],
] as const;

export default function SourcesPage() {
  return <ContentPage active="sources" kicker="Registre documentaire" title={<>Les sources avant<br />les réponses.</>} lead="Le corpus privilégie les autorités sanitaires et les publications primaires. Chaque donnée variable est datée; les consignes instables ne sont jamais mémorisées comme une vérité permanente.">
    <section className="band band-white"><div className="shell sources-layout"><div className="visual-frame tall" data-bento data-reveal><img src={assetPath("/visuals/prevention-icons-b.png")} alt="Icônes illustrant la prévention, les soins, les alertes, l’appel et la solidarité" /></div><div className="source-list">{sources.map(([name, description, url], index) => <a className="source-item" href={url} target="_blank" rel="noreferrer" key={url} data-bento data-reveal><span>0{index + 1}</span><div><p className="kicker accent">Source officielle</p><h2>{name}</h2><p>{description}</p><small>{url}</small></div></a>)}</div></div></section>
    <section className="band band-sand"><div className="shell"><article className="method-card" data-reveal><h2>Méthode de mise à jour</h2><p>Vérifier la source primaire, enregistrer la date d’effet, relire le français, l’anglais et le kiswahili, tester l’agent distant, puis retirer immédiatement toute consigne qui n’est plus confirmée.</p></article></div></section>
  </ContentPage>;
}
