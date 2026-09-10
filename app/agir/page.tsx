import { assetPath } from "../asset-path";
import { ContentPage } from "../content-page";
import { SpriteIcon } from "../sprite-icon";

const actions = [
  [0, 0, "Lavez-vous les mains", "Utilisez régulièrement de l’eau et du savon, notamment après un contact avec des surfaces partagées."],
  [1, 0, "Évitez les contacts", "Ne touchez pas sans protection une personne malade, un corps, du sang ou d’autres fluides."],
  [2, 0, "Reconnaissez les symptômes", "Fièvre, faiblesse, douleurs, vomissements ou diarrhée peuvent apparaître. Seul un test confirme Ebola."],
  [3, 2, "Appelez le 151", "Une personne malade, un décès suspect ou un contact avec des fluides exige un appel immédiat au 151."],
] as const;

export default function AgirPage() {
  return <ContentPage active="agir" kicker="Conduite à tenir" title={<>Protéger sans attendre.<br />Agir sans exposer les autres.</>} lead="Ces gestes ne remplacent pas l’évaluation des équipes sanitaires. Ils réduisent les contacts à risque pendant que vous demandez une orientation officielle.">
    <section className="band band-white"><div className="shell"><div className="action-layout"><div className="action-grid">{actions.map(([col, row, title, text]) => <article className="content-card compact" key={title} data-bento data-reveal><SpriteIcon col={col} row={row} label={title} /><h2>{title}</h2><p>{text}</p></article>)}</div><div className="visual-frame tall" data-bento data-reveal><img src={assetPath("/visuals/prevention-icons-a.png")} alt="Icônes de prévention Ebola : lavage des mains, absence de contact, symptômes, matériel médical et appel" /></div></div></div></section>
    <section className="band band-sand"><div className="shell"><div className="protocol-grid">
      <article data-bento data-reveal><p className="kicker red">Personne malade</p><h2>151 immédiatement.</h2><p>Ne touchez pas la personne ni ses fluides sans protection. Demandez aux autres de rester à distance. N’utilisez pas les transports en commun sans instruction sanitaire.</p></article>
      <article data-bento data-reveal><p className="kicker red">Décès suspect</p><h2>Ne touchez pas le corps.</h2><p>Ne le lavez pas, ne le déplacez pas et ne l’enterrez pas vous-même. Appelez le 151 pour une prise en charge sûre, digne et respectueuse.</p></article>
      <article data-bento data-reveal><p className="kicker accent">Contact sans symptôme</p><h2>Suivi pendant 21 jours.</h2><p>Appelez le 151 pour les consignes de suivi. Dès le premier symptôme, restez à distance des autres et rappelez immédiatement.</p></article>
    </div></div></section>
  </ContentPage>;
}
