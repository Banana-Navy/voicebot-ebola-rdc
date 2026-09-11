# Architecture technique du voicebot Ebola RDC

## Décision

La première version utilise un agent ElevenLabs, un corpus fermé versionné dans Git et une landing page statique. Elle ne stocke aucune donnée d'appel et n'utilise pas Supabase.

```text
Numéro local RDC ou widget web
              |
              v
      ElevenLabs ElevenAgents
      - accueil français
      - langues FR / EN / SW
      - Scribe v2 Realtime
      - Eleven v3 Conversational
              |
              v
      Prompt + corpus contrôlé
      - 151 santé / Ebola
      - 112 Police seulement, sans garantie de joignabilité locale
      - aucun chiffre temps réel
      - aucun routage hospitalier direct
```

## Composants

### Conversation

- Plateforme : ElevenLabs ElevenAgents.
- Reconnaissance : Scribe v2 Realtime.
- Synthèse : Eleven v3 Conversational, nécessaire pour le kiswahili.
- Langues : `fr`, `en`, `sw`.
- Langue initiale : `fr`.
- Outils système : `language_detection`, `end_call`.
- RAG : désactivé au départ; le corpus est suffisamment court pour être injecté et audité.
- Enregistrement et rétention : désactivés par défaut.

Les identifiants de voix et leurs réglages sont versionnés dans la configuration locale puis synchronisés vers l’agent distant. Il faut continuer à vérifier la prononciation de Bundibugyo, Ituri, Bunia, Mongbwalu, Rwampara, Nord-Kivu, Kisangani et des nombres 151/112. La voix kiswahili doit être évaluée par des locuteurs congolais.

### Téléphonie

Un numéro national congolais ou un code court fourni par un opérateur local est préférable. Twilio peut servir de pont SIP/BYOC, mais la RDC n'apparaît pas dans sa liste publique de juridictions proposant des numéros Voice locaux. Il ne faut pas lancer le service avec un numéro belge ou un numéro international coûteux pour l'appelant.

Chemin recommandé :

1. obtenir l'accord du Ministère/COUSP sur le rôle du bot et l'usage du 151;
2. demander à un opérateur congolais un numéro local ou code court et un trunk SIP entrant;
3. vérifier les coûts pour les abonnés Orange, Airtel, Vodacom et Africell;
4. connecter le trunk à ElevenLabs directement ou via BYOC;
5. tester le décrochage et la qualité audio depuis chaque réseau.

### Données officielles

La v1 utilise les fichiers Markdown et JSON du dépôt. Une statistique datée n'est jamais ajoutée au prompt opérationnel. Toute nouvelle source suit le cycle : extraction, vérification, revue humaine, date d'effet, build, tests, publication.

Une future mise à jour automatique du SitRep doit être semi-automatique : le système peut détecter un nouveau PDF et préparer un diff, mais une personne autorisée doit approuver avant publication. Un parseur ne doit jamais publier automatiquement une consigne médicale ou un nouveau numéro.

### Landing page

La landing page est construite en Next.js et publiée sous forme d’export statique avec le widget ElevenLabs. Aucun backend n’est requis tant qu’il n’y a ni compte, ni formulaire, ni tableau de bord.

## Pourquoi Supabase est différé

Supabase n'apporte pas de valeur à une landing statique et un corpus fermé. Il deviendra utile si le projet exige :

- une console pour que l'autorité sanitaire approuve les contenus;
- un registre dynamique de structures et contacts;
- des dates d'effet et d'expiration;
- un rappel humain ou une file d'escalade;
- des événements agrégés pour mesurer les thèmes demandés;
- une révocation immédiate d'un contenu.

Si Supabase est ajouté :

- conserver les données opérationnelles dans un schéma non exposé;
- n'exposer qu'une Edge Function ou API serveur minimale;
- activer RLS sur toute table exposée;
- utiliser une clé publique uniquement dans le navigateur;
- ne jamais exposer `service_role`;
- ne pas stocker les transcriptions ou l'audio par défaut;
- historiser version, approbateur, source, date d'effet et date d'expiration;
- exécuter les advisors et tester chaque politique avant livraison;
- valider la résidence des données et le cadre juridique avant création du projet.

## Déploiement ElevenLabs actif

L’agent distant `agent_0401m2687nc4frqbr731emnmhtcy` est relié au widget public. Le fichier `build/elevenlabs-agent-package.json` regroupe la configuration fonctionnelle, le prompt et le corpus. Toute création ou mise à jour distante reste protégée par une confirmation explicite dans les scripts.

La procédure de synchronisation :

1. lire l'agent ou un modèle de référence compatible avec le schéma courant;
2. préserver un seul mécanisme d'outils, sans mélanger `tools` et `tool_ids`;
3. configurer les presets `fr`, `en` et `sw`;
4. désactiver l'enregistrement et la rétention;
5. attacher uniquement `language_detection` et `end_call`;
6. exécuter les tests de simulation;
7. inspecter les transcriptions produites;
8. effectuer un appel humain complet dans les trois langues.

## Sécurité de déploiement

- Aucun secret dans Git, la landing ou les fichiers de build.
- Aucun outil de transfert tant qu'il n'existe pas de partenaire opérationnel qui accepte les appels.
- Aucun webhook public qui reçoit une donnée médicale sans authentification et journalisation contrôlée.
- Aucun changement de numéro ou de consigne sans une source officielle datée.
- Interrupteur d'arrêt : le numéro ou widget doit pouvoir être désactivé immédiatement.
- Le bot ne doit jamais se présenter comme une autorité publique sans accord écrit.

## Validation minimale

```bash
npm run validate
npm run build:agent
```

Avant toute ouverture opérationnelle :

- cinq répétitions de chaque scénario critique;
- inspection des transcriptions, pas seulement du statut de test;
- écoute du greeting et des consignes 151;
- validation du changement de langue en cours d'appel;
- tests sur audio téléphonique huit kilohertz, bruit, silence et interruption;
- vérification que le bot ne récite aucune statistique périmée;
- vérification que le bot ne donne jamais un hôpital comme destination directe.
