# Voicebot Ebola — RDC

Socle de travail pour un voicebot d'information et d'orientation sur Ebola en République démocratique du Congo, en français, anglais et kiswahili.

## Démonstration

- Landing page : <https://banana-navy.github.io/voicebot-ebola-rdc/>
- Agent ElevenLabs : `agent_0401m2687nc4frqbr731emnmhtcy` (`Voicebot Ebola — RDC — FR EN SW — Naturel v2`)
- Mode d’accès : conversation vocale dans le navigateur; aucun numéro téléphonique n’est attaché au bot.

## État du projet

- Corpus sanitaire sourcé : prêt pour revue médicale.
- Prompt trilingue : prêt pour tests de conversation.
- Accueil actuel : français.
- Cible ultérieure : accueil et parcours principal en kiswahili.
- Agent ElevenLabs distant : créé et connecté à la landing page; greeting français, presets FR/EN/SW.
- Landing page : visuels éditoriaux retenus intégrés, planches d’icônes découpées individuellement, export statique et publication GitHub Pages.
- Supabase : volontairement différé, car la première version ne doit collecter ni identité ni données médicales.

Ce voicebot ne remplace pas un professionnel de santé. En RDC, le numéro sanitaire officiel vérifié est le **151**. La Primature décrit le **112** comme numéro traditionnel de la Police, mais la source consultée ne confirme pas sa joignabilité locale; il ne doit jamais être présenté comme la ligne Ebola.

## Fichiers principaux

- `agent/system-prompt.md` : comportement conversationnel et règles de sécurité.
- `knowledge/base-connaissances.md` : faits autorisés et réponses sanitaires.
- `config/contacts-rdc.json` : numéros et règles de routage vérifiés.
- `config/situation-rdc.json` : photographie officielle datée de l'épidémie; non utilisable comme donnée temps réel.
- `config/voicebot.json` : paramètres fonctionnels du futur agent ElevenLabs.
- `docs/recherche-officielle.md` : rapport de recherche et recommandations.
- `docs/architecture-technique.md` : choix des outils et chemin de mise en production.
- `docs/landing-page-brief.md` : structure éditoriale de la future landing page.
- `tests/scenarios.json` : scénarios de conversation à valider.

## Vérification locale

```bash
npm install
npm run dev
npm run validate
npm test
npm run build:agent
```

Le build de contenu produit `build/elevenlabs-agent-package.json`. L’agent distant existe, mais il reste un prototype : la voix kiswahili doit être auditionnée avec des locuteurs congolais et les conversations réelles doivent être validées avant ouverture au public.

## Conditions avant publication

1. Validation médicale et opérationnelle par le Ministère de la Santé/COUSP ou une organisation mandatée.
2. Validation linguistique du kiswahili par des locuteurs de l'Est de la RDC.
3. Attribution d'un numéro national ou court par un opérateur congolais et validation de son routage.
4. Test humain complet en français, anglais et kiswahili, y compris les urgences, les interruptions et les rumeurs.
5. Politique de confidentialité publiée; enregistrement audio et collecte de données désactivés par défaut.
