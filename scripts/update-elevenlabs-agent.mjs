import { readFile } from "node:fs/promises";

const agentId = "agent_0401m2687nc4frqbr731emnmhtcy";
const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) throw new Error("ELEVENLABS_API_KEY est absent.");
if (!process.argv.includes("--confirm-update")) throw new Error("Ajoutez --confirm-update pour autoriser la mise à jour distante.");

const headers = { "xi-api-key": apiKey, "content-type": "application/json" };
const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${agentId}`, { headers });
const current = await response.json();
if (!response.ok) throw new Error(`Lecture impossible (${response.status}).`);

const systemPrompt = await readFile(new URL("../agent/system-prompt.md", import.meta.url), "utf8");
const knowledge = await readFile(new URL("../knowledge/base-connaissances.md", import.meta.url), "utf8");
const firstMessage = "Bonjour et bienvenue sur la ligne d'information et d'orientation Ebola pour la République démocratique du Congo, pour continuer, dites français, anglais ou kiswahili.";

// La voix française/anglaise par défaut utilise le modèle v3 et un débit naturel.
// Les presets FR/EN/SW restent actifs afin que l'outil de langue applique aussi
// la voix kiswahili dédiée, avec des vitesses cohérentes entre les trois parcours.
const naturalVoice = {
  voice_id: "8R6pzcy1HIr4WcoApmzw",
  model_id: "eleven_v3_conversational",
  speed: 1.05,
  stability: 0.38,
  similarity_boost: 0.8,
  expressive_mode: false,
  suggested_audio_tags: [],
  text_normalisation_type: "system_prompt",
  optimize_streaming_latency: 0,
};

const agent = structuredClone(current.conversation_config.agent);
agent.first_message = firstMessage;
agent.language = "fr";
agent.prompt.prompt = `${systemPrompt}\n\n# Base de connaissances contrôlée\n\n${knowledge}`;
if (agent.prompt.built_in_tools?.language_detection) {
  agent.prompt.built_in_tools.language_detection.description = "EBOLA RDC — Au premier tour, dès que français, anglais ou kiswahili est identifiable, appelle silencieusement cet outil avant tout texte. Utilise fr, en ou sw uniquement. Après le résultat, poursuis naturellement sans rejouer l'accueil. Pour une langue non prise en charge, demande uniquement : Français, English ou Kiswahili ?";
  agent.prompt.built_in_tools.language_detection.pre_tool_speech = "off";
  agent.prompt.built_in_tools.language_detection.force_pre_tool_speech = false;
}

const turn = {
  ...current.conversation_config.turn,
  turn_eagerness: "normal",
  turn_timeout: 7,
  soft_timeout_config: {
    ...(current.conversation_config.turn?.soft_timeout_config ?? {}),
    timeout_seconds: -1,
    use_llm_generated_message: false,
    randomize_fillers: false,
  },
};

const payload = {
  conversation_config: {
    agent,
    tts: { ...current.conversation_config.tts, ...naturalVoice },
    turn,
  },
  platform_settings: {
    ...current.platform_settings,
    privacy: {
      ...(current.platform_settings?.privacy ?? {}),
      record_voice: false,
      retention_days: 0,
      delete_audio: true,
      delete_transcript_and_pii: true,
      apply_to_existing_conversations: false,
      zero_retention_mode: false,
      user_memory: { enabled: false, scale: "balanced" },
    },
  },
  version_description: "Voix Amadou v3 plus fluide, débit naturel, réponses continues FR EN SW",
};

const update = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${agentId}`, {
  method: "PATCH",
  headers,
  body: JSON.stringify(payload),
});
const result = await update.json();
if (!update.ok) throw new Error(`Mise à jour rejetée (${update.status}) : ${JSON.stringify(result)}`);

console.log(JSON.stringify({
  agent_id: result.agent_id,
  version_id: result.version_id,
  first_message: result.conversation_config.agent.first_message,
  language_detection_policy: result.conversation_config.agent.prompt.built_in_tools?.language_detection?.description,
  default_tts: result.conversation_config.tts,
  privacy: result.platform_settings?.privacy,
  preserved_language_presets: Object.keys(result.conversation_config.language_presets ?? {}),
}, null, 2));
