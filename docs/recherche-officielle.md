# Voicebot Ebola pour la République démocratique du Congo

## Résumé exécutif

Le projet doit être conçu comme une ligne d'information et d'orientation sanitaire, pas comme un outil de diagnostic ou une centrale d'urgence. La flambée active en République démocratique du Congo est causée par le virus Bundibugyo. Le dernier rapport national intégré lors de cette revue, daté du 9 septembre 2026 et publié le 10 septembre, fait état d'une transmission active dans six provinces et soixante et une zones de santé.^1

Le numéro sanitaire national officiellement publié est le **151**. Il doit être prononcé immédiatement pour toute personne malade, tout décès suspect, toute exposition symptomatique ou tout contact avec des fluides. La Primature décrit le **112** comme numéro traditionnel de la Police nationale congolaise dans le contexte de sa relance; cette source ne confirme pas une joignabilité nationale continue. Il ne doit jamais être présenté comme la ligne Ebola ni comme un transfert garanti.^2,3

Le bot doit fonctionner en français, anglais et kiswahili, avec un accueil français dans la première version. L'objectif ultérieur d'un parcours principalement kiswahili est techniquement compatible avec ElevenLabs : Eleven v3 Conversational prend en charge le swahili et Scribe v2 Realtime l'identifie avec une précision annoncée comme élevée. Une validation humaine reste indispensable, car la prise en charge d'une langue ne garantit ni une prosodie congolaise naturelle ni l'exactitude des formulations de santé publique.^4,5

La meilleure architecture initiale ne nécessite pas Supabase. Le contenu officiel peut rester versionné dans Git et injecté comme corpus fermé. Supabase devient pertinent seulement si une autorité doit approuver des changements en ligne, administrer des contacts, organiser des rappels humains ou consulter des événements anonymisés. Les transcriptions et enregistrements audio doivent rester désactivés par défaut.

## 1. Périmètre géographique retenu

Le mot « Congo » peut désigner la République démocratique du Congo ou la République du Congo. Le présent projet retient la **République démocratique du Congo (code pays CD, indicatif +243)**, car la flambée active décrite par le Ministère de la Santé et l'OMS se situe dans cette juridiction.

Cette décision doit être validée avant l'achat d'un numéro. Les contacts, institutions, provinces et zones de santé de la République du Congo ne sont pas interchangeables avec ceux de la RDC.

## 2. Situation épidémiologique vérifiée

Le Ministère de la Santé de la RDC a déclaré la dix-septième flambée d'Ebola le 15 mai 2026, après confirmation du virus Bundibugyo par l'Institut national de recherche biomédicale. Les premières zones citées étaient Rwampara, Mongbwalu et Bunia, dans la province de l'Ituri.^6

Au 9 septembre 2026, le SitRep national indiquait :

| Indicateur | Valeur datée |
|---|---:|
| Cas confirmés cumulés | 6 942 |
| Décès confirmés cumulés | 3 349 |
| Personnes guéries | 1 647 |
| Patients en isolement ou centre de traitement | 823 |
| Provinces touchées | 6 |
| Zones de santé touchées | 61 |

Ces chiffres sont une photographie et ne doivent pas être prononcés comme « situation actuelle » par un agent statique. Ils peuvent être affichés sur une page uniquement avec leur date, leur source et une procédure de retrait rapide. Le voicebot doit dire que la situation évolue et orienter vers la rubrique « Surveillance épidémiologique » du Ministère.^1

Les provinces mentionnées dans ce SitRep sont l'Ituri, le Nord-Kivu, le Haut-Uélé, la Tshopo, le Sud-Kivu et le Bas-Uélé. L'Ituri restait l'épicentre. L'OMS classait le risque comme très élevé en RDC et élevé pour les pays partageant une frontière terrestre avec la RDC.^7

## 3. Symptômes et diagnostic

La période d'incubation varie de deux à vingt et un jours. Les symptômes peuvent débuter soudainement par fièvre, grande fatigue, malaise, douleurs musculaires, mal de tête et mal de gorge. Ils peuvent être suivis de vomissements, diarrhée, douleurs abdominales, éruption et troubles rénaux ou hépatiques.^8

Les saignements ne sont pas systématiques. Ils surviennent moins fréquemment que ne le suggère l'image populaire de la maladie et peuvent apparaître plus tard. Un bot qui attendrait un saignement avant d'orienter la personne serait dangereux.^8

Le diagnostic clinique est difficile, car les premiers symptômes ressemblent notamment à ceux du paludisme, de la typhoïde, de la shigellose et d'autres infections. Seul un test de laboratoire peut confirmer Ebola. Le bot doit donc éviter deux erreurs symétriques : annoncer « c'est Ebola » et rassurer par « ce n'est probablement pas Ebola ».^8

## 4. Transmission

Le virus se transmet par contact direct, via une peau lésée ou les muqueuses, avec le sang ou d'autres fluides d'une personne malade ou décédée. Les vêtements, la literie, les objets et les surfaces contaminés peuvent également transmettre le virus. Un passage de l'animal à l'humain peut survenir après contact avec des animaux sauvages infectés, malades ou morts.^8

Une personne ne transmet pas Ebola avant l'apparition de symptômes. En revanche, un corps peut rester très infectieux. Les cérémonies funéraires impliquant un contact direct avec le corps ont contribué à la transmission lors de flambées antérieures.^8

Le bot ne doit pas dire qu'Ebola se transmet couramment par l'air. Il doit cependant éviter de transformer une explication scientifique en permission de s'approcher : l'action simple est de ne pas toucher, d'éloigner les autres personnes et d'appeler le 151.

## 5. Conduite à tenir pour la population

### Personne actuellement malade

La priorité est l'appel immédiat au 151. Pendant l'attente des instructions : ne pas toucher la personne, son sang, ses vomissures, ses selles, ses vêtements ou les objets souillés; demander aux autres personnes de rester à distance et laisser intervenir les équipes formées. Le bot ne doit pas conseiller un nettoyage domestique ni un déplacement en transport collectif.^2,8

Le Ministère demande de signaler immédiatement tout cas suspect au centre de santé ou via le numéro vert 151, de ne pas toucher les malades suspects ni les corps non pris en charge, de ne pas manipuler ou consommer les animaux trouvés morts, de se laver les mains et de rejeter la stigmatisation.^2

### Contact possible sans symptôme

Le contact doit appeler le 151 et suivre les instructions des équipes sanitaires. La période de suivi habituelle est de vingt et un jours. Si un symptôme apparaît, la personne doit rester à distance des autres et rappeler immédiatement le 151.^8

### Décès ou corps

Ne pas toucher, laver, déplacer ou enterrer le corps. Éloigner les autres personnes et appeler le 151 afin qu'une équipe assure une prise en charge et un enterrement sûrs, dignes et respectueux. Le dialogue doit reconnaître le deuil et respecter les coutumes, tout en maintenant les limites de sécurité.^2,9

### Animaux sauvages

Ne pas toucher ni consommer un animal sauvage trouvé malade ou mort. Éviter tout contact avec le sang, les organes et les fluides des animaux sauvages. Le message doit rester centré sur le comportement sans stigmatiser une communauté ou une pratique culturelle.^2,8

## 6. Traitement et vaccination pendant la flambée Bundibugyo

Les soins de soutien intensifs et précoces - réhydratation, surveillance, traitement des symptômes et complications - peuvent améliorer la survie. La recherche rapide de soins est donc un message central.^8,10

Les anticorps monoclonaux approuvés et le vaccin Ervebo concernent le virus Ebola Zaïre. Au moment de la revue, aucun traitement spécifique n'était approuvé contre Bundibugyo. Des essais cliniques étaient en cours, et l'utilisation d'Ervebo dans certains groupes s'accompagnait d'une évaluation, car sa protection contre Bundibugyo chez l'humain n'était pas établie.^7

Le bot ne doit pas répondre simplement « oui » à la question « y a-t-il un vaccin ? ». Il doit distinguer le virus concerné, expliquer que les décisions de vaccination pendant la flambée sont prises par les autorités, puis orienter vers le 151 ou les équipes sanitaires.

## 7. Hôpitaux, centres de traitement et villes

Le SitRep et les communications de l'OMS mentionnent des structures à Bunia, Nizi, Pawa, Isiro, Makiso-Kisangani et Mongbwalu. Au 1er septembre 2026, l'OMS rapportait vingt-cinq structures de prise en charge en Ituri, dont quinze centres de traitement Ebola et dix centres de transit, et cinquante-neuf structures identifiées dans l'ensemble des provinces affectées.^1,11

Ces noms sont utiles pour améliorer la reconnaissance vocale et comprendre un appelant. Ils ne constituent pas un annuaire stable. Les capacités peuvent être saturées, les sites peuvent changer et un déplacement spontané peut exposer d'autres personnes. Le bot doit donc répondre : « Les capacités des centres changent rapidement. Appelez le 151 pour recevoir l'orientation officielle avant de vous déplacer. »

Les zones de santé répertoriées dans `config/situation-rdc.json` proviennent du SitRep national du 9 septembre. Elles servent aux tests de reconnaissance, jamais à affirmer qu'une zone est encore touchée ou sûre au moment de l'appel. Le rapport mentionne aussi un cas importé à Bulu, dans le Sud-Ubangi, tout en conservant un total de six provinces affectées; le prototype ne déduit donc pas une septième province de cette seule mention.

## 8. Comment la riposte communique avec la population

La communication efficace ne consiste pas seulement à répéter des consignes. Les sources de l'OMS sur la flambée actuelle insistent sur l'écoute, l'empathie, la compréhension des rumeurs et la participation de personnes connues et respectées : relais communautaires, responsables des zones de santé, chefs locaux, leaders religieux, groupes de femmes et de jeunes.^9,12

Les préoccupations relevées en 2026 portent sur la peur des centres de traitement, les injections supposées dangereuses, les enterrements sûrs, les sacs mortuaires, la décontamination, les remèdes traditionnels et le soupçon que la flambée serait inventée pour des raisons politiques ou financières.^9,13

Le modèle de réponse conseillé pour le bot est :

1. reconnaître la peur ou la question sans jugement;
2. donner un seul fait vérifié;
3. proposer une action immédiate et réalisable;
4. indiquer clairement une incertitude au lieu de l'inventer.

Exemple : « Je comprends que le centre de traitement puisse faire peur. Une prise en charge précoce augmente les chances de survie et des patients guérissent. Pour connaître l'orientation sûre près de chez vous, appelez le 151. »

Le bot ne doit pas argumenter contre une croyance religieuse ou traditionnelle. Il doit chercher l'objectif commun - protéger la famille - et proposer le comportement le plus sûr.

## 9. Stratégie linguistique

### Français

L'accueil actuel est français. Les phrases doivent rester simples, sans jargon médical, avec le numéro prononcé « un cinq un ». Le français peut servir de langue de sécurité par défaut pendant la phase pilote.

### Anglais

La version anglaise doit conserver exactement les mêmes faits, numéros et seuils de prudence. Elle peut servir aux travailleurs humanitaires, voyageurs et personnes transfrontalières, sans jamais devenir une source de règles différentes.

### Kiswahili

Le projet vise à terme un parcours principalement kiswahili. Les formulations actuelles emploient un kiswahili simple et reprennent des principes de messages officiels déjà utilisés en Afrique de l'Est : ne pas toucher, éloigner les autres et appeler pour obtenir de l'aide.^14

Une revue par des locuteurs congolais de l'Est est obligatoire. Elle doit vérifier : vocabulaire réellement compris en Ituri et au Nord-Kivu, niveau de politesse, prononciation des noms de zones, rythme sur téléphone à huit kilohertz, compréhension de « un cinq un » en kiswahili et absence de tournures trop tanzaniennes ou kényanes.

## 10. Architecture technique recommandée

Le moteur vocal recommandé est ElevenLabs ElevenAgents avec Scribe v2 Realtime pour la transcription et Eleven v3 Conversational pour la synthèse. Les deux prennent en charge le swahili; ElevenLabs permet des langues et voix spécifiques ainsi que le changement de langue par outil système.^4,5,15

Pour le numéro public, un numéro congolais ou un code court obtenu via un opérateur local doit être privilégié. La liste publique des pays couverts par les numéros Voice de Twilio ne montre pas la RDC, même si Twilio permet les appels sortants vers la RDC et le BYOC SIP. Twilio ne doit donc pas être considéré comme fournisseur garanti d'un numéro local congolais; un opérateur local ou un trunk SIP approuvé reste nécessaire.^16,17

La landing page peut être un export statique Vite ou Next.js, hébergé sur GitHub Pages pour une démonstration. Elle doit rester lisible sur téléphone lent, fonctionner sans compte et contenir un bouton d'appel `tel:151` uniquement après validation réelle du comportement de ce lien sur les réseaux congolais.

## 11. Supabase : décision de phase

Supabase n'est pas nécessaire pour une première version qui diffuse un corpus fermé et ne collecte rien. L'ajouter trop tôt créerait une surface de sécurité et une question de résidence des données sans bénéfice immédiat. Supabase ne propose pas actuellement de région de projet africaine dans sa liste standard; choisir une région proche ne prouve aucune conformité juridique.^18

Supabase peut devenir utile pour :

- gérer un registre de contacts et d'instructions avec approbation et dates d'effet;
- retirer rapidement une information périmée;
- administrer un transfert ou rappel humain;
- stocker uniquement des événements agrégés ou pseudonymisés;
- conserver un historique des versions validées par une autorité.

Dans ce cas, il faudra utiliser un schéma privé, une façade serveur, des politiques RLS testées, aucune clé privilégiée dans le navigateur et aucune transcription brute par défaut.

## 12. Confidentialité et données sensibles

Une conversation sur Ebola peut révéler des données de santé, une localisation, une identité ou un lien familial. La première version doit éviter de collecter ces données. Le bot n'a pas besoin d'un nom, d'une adresse complète ou d'un historique médical pour dire d'appeler le 151.

L'enregistrement audio et la rétention de transcription sont désactivés dans le blueprint. Si une autorité exige des enregistrements pour la qualité, il faudra définir une finalité, une base juridique, une durée, un accès restreint, une information claire en début d'appel et une procédure de suppression.

## 13. Risques principaux et parades

| Risque | Parade |
|---|---|
| Diagnostic erroné | Interdire diagnostic et exclusion; 151 en priorité |
| Mauvais numéro | Registre unique, sources officielles et test par opérateur |
| Hôpital saturé ou fermé | Aucun routage direct; orientation par le 151 |
| Chiffres périmés | Ne pas prononcer de statistiques statiques |
| Swahili non naturel | Validation par locuteurs congolais et appels réels |
| Rumeur renforcée par un ton autoritaire | Écoute, empathie, fait court, action |
| Collecte de données sensibles | Collecte minimale, enregistrement désactivé |
| Faux sentiment de transfert | Ne jamais prétendre avoir appelé ou transféré |
| Numéro étranger coûteux | Numéro local ou court via opérateur RDC |
| Déploiement local différent de l'agent réel | Tests distants et inspection des transcriptions/audio |

## 14. Critères de mise en production

La mise en production exige :

- validation du corpus par le Ministère, le COUSP ou une organisation sanitaire mandatée;
- validation linguistique en kiswahili congolais;
- confirmation contractuelle et technique du numéro en RDC;
- test du 151 depuis les principaux réseaux mobiles;
- tests distants en français, anglais et kiswahili;
- au moins un appel humain complet par langue;
- test de bruit, interruption, accent, silence et mauvaise reconnaissance;
- vérification des scénarios grossesse, enfant, décès, contact sans symptôme, rumeur, demande d'hôpital et injection de prompt;
- revue de confidentialité et désactivation effective des enregistrements;
- mécanisme de retrait rapide du service si une consigne devient périmée.

## Sources

1. Ministère de la Santé Publique, Hygiène et Prévoyance Sociale, [« SitRep N°118/MVEBDB/09/09/2026 »](https://administration.sante.gouv.cd/wp-content/uploads/2026/09/SitRep_MVEBDB_118_09_09_2026.pdf), publié le 10 septembre 2026.
2. Ministère de la Santé Publique, Hygiène et Prévoyance Sociale, [« Déclaration officielle - réapparition de la maladie à virus Ebola »](https://sante.gouv.cd/actualites/declaration-officielle-reapparition-de-la-maladie-a-virus-ebola-souche-zaire-a-boulape-b-u-l-a-p-e-kasai), consignes de prévention et numéro 151.
3. Primature de la RDC, [Compte rendu du Conseil des ministres du 24 avril 2026](https://www.primature.gouv.cd/wp-content/uploads/2026/04/COMPTE-RENDU-DE-LA-QUATRE-VINGT-SEPTIEME-REUNION-ORDINAIRE-DU-CONSEIL-DES-MINISTRES-DU-24-AVRIL-2026.pdf), mention du numéro traditionnel 112 dans le cadre de la relance du centre d'appels de la Police nationale congolaise.
4. ElevenLabs, [« Models »](https://elevenlabs.io/docs/overview/models), langues d'Eleven v3 Conversational.
5. ElevenLabs, [« Transcription »](https://elevenlabs.io/docs/overview/capabilities/speech-to-text/), Scribe v2 Realtime et prise en charge du swahili.
6. OMS, [« Ebola disease caused by Bundibugyo virus, Democratic Republic of the Congo & Uganda »](https://www.who.int/emergencies/disease-outbreak-news/item/2026-DON602), 16 mai 2026.
7. OMS, [« Ebola disease caused by Bundibugyo virus - Democratic Republic of the Congo »](https://www.who.int/emergencies/disease-outbreak-news/item/2026-DON617), 10 septembre 2026.
8. OMS, [« Ebola disease »](https://www.who.int/news-room/fact-sheets/detail/ebola-disease), fiche d'information.
9. OMS Afrique, [« Community dialogue building trust in Ebola response in the Democratic Republic of the Congo »](https://www.afro.who.int/countries/democratic-republic-of-congo/news/community-dialogue-building-trust-ebola-response-democratic-republic-congo), 3 septembre 2026.
10. OMS, [« WHO guidelines for the clinical management of filovirus disease »](https://www.who.int/publications/i/item/B09774), 11 juin 2026.
11. OMS Afrique, [« Adapting care to an evolving Ebola outbreak in the Democratic Republic of the Congo »](https://www.afro.who.int/countries/democratic-republic-of-congo/news/adapting-care-evolving-ebola-outbreak-democratic-republic-congo), 7 septembre 2026.
12. OMS Afrique, [« At the frontline of trust »](https://www.afro.who.int/countries/democratic-republic-of-congo/news/frontline-trust-day-julienne-anoko-whos-ebola-community), 17 juin 2026.
13. OMS Afrique/AIRA, [« Infodemic Trends Report - Special issue on Ebola Bundibugyo »](https://afro.who.int/countries/democratic-republic-of-congo/publication/infodemic-trends-report-special-issue-ebola-bundibugyo-virus-disease-01-30-june-2026), juillet 2026.
14. CDC, [« Hatua za Kujizuia kupata Ebola Unapongoja Usaidizi »](https://stacks.cdc.gov/view/cdc/61136), document communautaire en kiswahili.
15. ElevenLabs, [« Language detection »](https://elevenlabs.io/docs/eleven-agents/customization/tools/system-tools/language-detection).
16. Twilio, [« Voice Guidelines »](https://www.twilio.com/en-us/guidelines/voice), liste des juridictions de numéros Voice.
17. Twilio, [« Programmable Voice pricing - Democratic Republic of the Congo »](https://www.twilio.com/voice/pricing/cd), appels sortants et BYOC.
18. Supabase, [« Available regions »](https://supabase.com/docs/guides/platform/regions), résidence et régions de projet.
