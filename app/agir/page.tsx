import { ContentPage } from "../content-page";
import { SpriteIcon } from "../sprite-icon";

const actions = [
  [0, 0, "Lavez-vous les mains", "Utilisez régulièrement de l’eau et du savon, notamment après un contact avec des surfaces partagées."],
  [1, 0, "Évitez les contacts", "Ne touchez pas une personne malade, un corps, du sang ou d’autres fluides. Laissez intervenir les équipes formées."],
  [3, 1, "Reconnaissez les symptômes", "Fièvre, faiblesse, douleurs, vomissements ou diarrhée peuvent apparaître. Seul un test confirme Ebola."],
  [3, 2, "Appelez le 151", "Une personne malade, un décès suspect ou un contact avec des fluides exige un appel immédiat au 151."],
] as const;

const protocols = [
  [3, 1, "Personne malade", "151 immédiatement.", "Ne touchez pas la personne ni ses fluides. Demandez aux autres de rester à distance, laissez intervenir les équipes formées et n’utilisez pas les transports en commun sans instruction sanitaire."],
  [2, 2, "Décès suspect", "Ne touchez pas le corps.", "Ne le lavez pas, ne le déplacez pas et ne l’enterrez pas vous-même. Appelez le 151 pour une prise en charge sûre, digne et respectueuse."],
  [1, 3, "Contact sans symptôme", "Suivi pendant 21 jours.", "Appelez le 151 pour les consignes de suivi. Dès le premier symptôme, restez à distance des autres et rappelez immédiatement."],
] as const;

export default function AgirPage() {
  return <ContentPage active="agir" kicker="Conduite à tenir" title={<>Protéger sans attendre.<br />Agir sans exposer les autres.</>} lead="Ces gestes ne remplacent pas l’évaluation des équipes sanitaires. Ils réduisent les contacts à risque pendant que vous demandez une orientation officielle.">
    <section className="band band-white"><div className="shell"><div className="action-grid action-grid-wide" data-stack>{actions.map(([col, row, title, text]) => <article className="content-card compact" key={title} data-bento data-reveal><SpriteIcon col={col} row={row} label={title} /><h2>{title}</h2><p>{text}</p></article>)}</div></div></section>
    <section className="band band-sand"><div className="shell"><div className="protocol-grid" data-stack>{protocols.map(([col, row, kicker, title, text]) => <article key={title} data-bento data-reveal><SpriteIcon sheet="b" col={col} row={row} label={kicker} /><p className={`kicker ${kicker === "Contact sans symptôme" ? "accent" : "red"}`}>{kicker}</p><h2>{title}</h2><p>{text}</p></article>)}</div></div></section>
  </ContentPage>;
}
