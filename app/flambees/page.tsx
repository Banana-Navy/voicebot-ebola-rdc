import type { Metadata } from "next";
import { ContentPage } from "../content-page";
import { PageIntro } from "../site-chrome";
import { SpriteIcon } from "../sprite-icon";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://banana-navy.github.io/voicebot-ebola-rdc";

export const metadata: Metadata = {
  title: "Flambées Ebola documentées en RDC",
  description: "Repères datés sur les flambées Ebola documentées en République démocratique du Congo, sans présentation trompeuse en temps réel.",
  alternates: { canonical: `${siteUrl}/flambees/` },
};

const provinces = ["Ituri", "Nord-Kivu", "Haut-Uélé", "Tshopo", "Sud-Kivu", "Bas-Uélé"];

const outbreaks = [
  {
    sheet: "b" as const,
    icon: [2, 2] as const,
    date: "Instantané · 9 septembre 2026",
    title: "Bundibugyo · six provinces",
    text: "Le SitRep national n°118 intégré au prototype mentionne 61 zones de santé. Cet instantané est daté et ne décrit pas automatiquement la situation du jour.",
    status: "Rapport intégré",
    href: "https://administration.sante.gouv.cd/wp-content/uploads/2026/09/SitRep_MVEBDB_118_09_09_2026.pdf",
  },
  {
    sheet: "platform" as const,
    icon: [5, 2] as const,
    date: "23 avril — 4 juillet 2022",
    title: "Mbandaka · Équateur",
    text: "La quatorzième flambée déclarée en RDC a touché Mbandaka et Wangata. Sa fin a été déclarée après la période de surveillance recommandée.",
    status: "Flambée terminée",
    href: "https://www.who.int/emergencies/disease-outbreak-news/item/2022-DON398",
  },
  {
    sheet: "b" as const,
    icon: [3, 1] as const,
    date: "21 août — 27 septembre 2022",
    title: "Beni · Nord-Kivu",
    text: "Un cas confirmé a déclenché une nouvelle réponse à Beni. L’autorité sanitaire a déclaré la fin de cet épisode 42 jours après l’inhumation du cas.",
    status: "Flambée terminée",
    href: "https://www.who.int/emergencies/disease-outbreak-news/item/2022-DON411",
  },
];

export default function FlambeesPage() {
  return <ContentPage active="flambees" kicker="Flambées documentées" title={<>Des épisodes datés,<br />jamais confondus avec le temps réel.</>} lead="Une flambée décrit une période épidémique confirmée et située. Cette page conserve la date de chaque source afin de montrer les évolutions sans transformer un ancien rapport en alerte actuelle.">
    <section className="band band-white"><div className="shell situation-grid"><div className="snapshot-card" data-bento data-reveal><SpriteIcon sheet="platform" col={0} row={1} label="Rapport sanitaire officiel" /><p className="kicker accent">Dernier rapport intégré</p><time dateTime="2026-09-09">9 septembre 2026</time><h2>Flambée causée par le virus Bundibugyo</h2><p>Le SitRep national n°118 mentionne six provinces et 61 zones de santé. Ces chiffres restent attachés à cette date et ne doivent pas être interprétés comme un tableau de bord en direct.</p><a className="official-link" href="https://administration.sante.gouv.cd/wp-content/uploads/2026/09/SitRep_MVEBDB_118_09_09_2026.pdf" target="_blank" rel="noreferrer">Ouvrir le SitRep officiel</a></div><article className="incident-visual" data-bento data-reveal><SpriteIcon sheet="community" col={1} row={1} label="Coordination entre autorités et équipes de santé" /><div><p className="kicker accent">Lire une flambée</p><h2>Une courbe décrit un épisode. Elle ne donne pas une orientation personnelle.</h2><p>Le voicebot ne choisit jamais un hôpital et ne transforme pas un chiffre daté en consigne actuelle. En cas de suspicion, l’orientation reste le 151.</p></div></article></div></section>

    <section className="band band-sand"><div className="shell"><PageIntro kicker="Repères dans le temps" title={<>Trois flambées, trois périodes clairement identifiées.</>}><p>Chaque carte renvoie à sa publication primaire. Le statut historique ne doit jamais être réutilisé pour décrire une situation locale aujourd’hui.</p></PageIntro><div className="outbreak-grid">{outbreaks.map((outbreak) => <a className="outbreak-card" href={outbreak.href} target="_blank" rel="noreferrer" key={outbreak.date} data-bento data-reveal><SpriteIcon sheet={outbreak.sheet} col={outbreak.icon[0]} row={outbreak.icon[1]} label={outbreak.title} /><time>{outbreak.date}</time><h2>{outbreak.title}</h2><p>{outbreak.text}</p><span>{outbreak.status} · Source officielle ↗</span></a>)}</div></div></section>

    <section className="band band-cool"><div className="shell"><PageIntro kicker="Empreinte du rapport 2026" title={<>Six provinces mentionnées dans l’instantané du 9 septembre.</>}><p>Cette liste documente le rapport intégré. Pour une information actuelle, consultez le Ministère ou appelez le 151.</p></PageIntro><div className="province-grid">{provinces.map((province, index) => <article data-bento data-reveal key={province}><SpriteIcon sheet="platform" col={5} row={2} label={`Localisation ${province}`} /><span className="province-index">0{index + 1}</span><h2>{province}</h2><p>Province citée dans l’instantané du 9 septembre 2026; aucune disponibilité de centre n’est déduite de cette mention.</p></article>)}</div><aside className="official-note" data-bento data-reveal><SpriteIcon col={2} row={2} label="Alerte" /><div><h3>Ne vous rendez pas directement dans un centre nommé.</h3><p>Les capacités et admissions changent rapidement. Le 151 vous indique la conduite à tenir avant tout déplacement.</p></div><a className="button button-primary" href="tel:151">Appeler le 151</a></aside></div></section>
  </ContentPage>;
}
