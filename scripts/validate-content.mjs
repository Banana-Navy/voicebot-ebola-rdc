import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const readText = (path) => readFile(resolve(root, path), 'utf8');
const readJson = async (path) => JSON.parse(await readText(path));

const failures = [];
const pass = (condition, message) => {
  if (!condition) failures.push(message);
};

const [prompt, knowledge, contacts, situation, voicebot, scenarios] = await Promise.all([
  readText('agent/system-prompt.md'),
  readText('knowledge/base-connaissances.md'),
  readJson('config/contacts-rdc.json'),
  readJson('config/situation-rdc.json'),
  readJson('config/voicebot.json'),
  readJson('tests/scenarios.json'),
]);

const expectedGreeting = "Bonjour et bienvenue sur la ligne d'information et d'orientation Ebola pour la République démocratique du Congo, pour continuer, dites français, anglais ou kiswahili.";
pass(prompt.includes(expectedGreeting), 'Le prompt ne contient pas le greeting français exact.');
pass(voicebot.greeting.active_text === expectedGreeting, 'Le greeting de la configuration diverge du prompt.');
pass(voicebot.default_language === 'fr', 'La langue initiale doit rester le français.');
pass(voicebot.future_primary_language === 'sw', 'La cible future doit rester le kiswahili.');
pass(JSON.stringify(voicebot.supported_languages) === JSON.stringify(['fr', 'en', 'sw']), 'Les langues doivent être fr, en et sw.');
pass(voicebot.speech.tts_model === 'eleven_v3_conversational', 'Le modèle TTS doit prendre en charge le swahili.');
pass(voicebot.speech.record_voice === false, "L'enregistrement audio doit être désactivé par défaut.");
pass(voicebot.speech.retain_transcript === false, 'La rétention de transcription doit être désactivée par défaut.');
pass(voicebot.speech.language_detection === true, 'La détection de langue doit rester active.');
pass(voicebot.speech.language_detection_only_at_start === true, 'La détection de langue doit être limitée au début de la conversation.');
pass(voicebot.system_tools.includes('language_detection') && voicebot.system_tools.includes('end_call'), 'Les outils système de langue et de clôture doivent rester actifs.');

const contactNumbers = contacts.contacts.map(({ number }) => number);
pass(contactNumbers.length === 2, 'Le registre doit contenir seulement les deux numéros officiels vérifiés.');
pass(contactNumbers.includes('151'), 'Le numéro sanitaire 151 est absent.');
pass(contactNumbers.includes('112'), 'Le numéro Police 112 est absent.');
pass(new Set(contactNumbers).size === contactNumbers.length, 'Le registre contient un numéro dupliqué.');
for (const contact of contacts.contacts) {
  pass(contact.official_sources.length > 0, `Le contact ${contact.id} n'a pas de source officielle.`);
  pass(contact.official_sources.every((url) => url.startsWith('https://')), `Le contact ${contact.id} contient une source non HTTPS.`);
}

const zoneCount = Object.values(situation.provinces).flat().length;
pass(zoneCount === 61, `Le registre contient ${zoneCount} zones au lieu de 61.`);
pass(situation.statistics.affected_health_zones === zoneCount, 'Le total des zones ne correspond pas à la liste.');
pass(situation.voicebot_can_speak_snapshot_statistics === false, 'Les statistiques datées ne doivent pas être prononcées par le voicebot.');
pass(situation.operational_facilities_mentioned_in_official_sources.every((item) => item.routing_allowed === false), 'Une structure autorise un routage direct non validé.');

for (const number of ['151', '112']) {
  pass(prompt.includes(number), `Le prompt ne contient pas ${number}.`);
  pass(knowledge.includes(number), `La base ne contient pas ${number}.`);
}
for (const forbidden of ['071 49 98 17', '+32', '1722', '1771']) {
  pass(!prompt.includes(forbidden), `Le prompt contient le numéro étranger ou hors périmètre ${forbidden}.`);
}

pass(prompt.includes('validé par des locuteurs congolais'), 'Le garde-fou de validation du kiswahili est absent.');
pass(/ne poses? (?:jamais )?de diagnostic/i.test(prompt), 'La limite de diagnostic est absente du prompt.');
pass(/n'utilisez pas les transports en commun/i.test(prompt), 'La consigne de ne pas utiliser les transports collectifs est absente.');
pass(prompt.includes('Ne prononce jamais un nombre de cas'), 'La règle contre les chiffres périmés est absente.');
pass(knowledge.includes('Seul un test de laboratoire peut confirmer Ebola'), 'La limite de confirmation par laboratoire est absente.');

pass(Array.isArray(scenarios) && scenarios.length >= 20, 'Au moins vingt scénarios de validation sont requis.');
pass(new Set(scenarios.map(({ id }) => id)).size === scenarios.length, 'Les identifiants de scénarios doivent être uniques.');
for (const language of ['fr', 'en', 'sw']) {
  pass(scenarios.some((scenario) => scenario.language === language), `Aucun scénario ${language}.`);
  pass(scenarios.some((scenario) => scenario.language === language && scenario.must_include_number === '151'), `Aucun scénario ${language} ne vérifie le 151.`);
}

if (failures.length) {
  console.error(JSON.stringify({ ok: false, failures }, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({
    ok: true,
    languages: voicebot.supported_languages,
    contacts: contactNumbers,
    official_health_zones_in_snapshot: zoneCount,
    scenarios: scenarios.length,
    privacy: { record_voice: false, retain_transcript: false },
  }, null, 2));
}
