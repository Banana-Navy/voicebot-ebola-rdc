import { readFile } from "node:fs/promises";

if (!process.argv.includes("--confirm-create")) {
  throw new Error("Ajoutez --confirm-create pour autoriser la création distante.");
}

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) throw new Error("ELEVENLABS_API_KEY est absent.");

const referenceAgentId = "agent_6301m0hrk7vbeyeadt55q1rc1xzv";
const firstMessage = "Bonjour. Vous êtes sur la ligne d'information et d'orientation Ebola pour la République démocratique du Congo. Pour continuer, dites français, English ou Kiswahili.";
const headers = { "xi-api-key": apiKey, "content-type": "application/json" };

const referenceResponse = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${referenceAgentId}`, { headers });
if (!referenceResponse.ok) throw new Error(`Agent de référence indisponible (${referenceResponse.status}).`);
const reference = await referenceResponse.json();

const systemPrompt = await readFile(new URL("../agent/system-prompt.md", import.meta.url), "utf8");
const knowledge = await readFile(new URL("../knowledge/base-connaissances.md", import.meta.url), "utf8");
const prompt = `${systemPrompt}\n\n# Base de connaissances contrôlée\n\n${knowledge}`;
const conversation = structuredClone(reference.conversation_config);

conversation.agent.first_message = firstMessage;
conversation.agent.language = "fr";
conversation.agent.disable_first_message_interruptions = false;
conversation.agent.prompt.prompt = prompt;
conversation.agent.prompt.llm = "claude-sonnet-4-5";
conversation.agent.prompt.temperature = 0;
conversation.agent.prompt.max_tokens = 220;
conversation.agent.prompt.enable_reasoning_summary = false;
conversation.agent.prompt.thinking_budget = null;
conversation.agent.prompt.reasoning_effort = null;
conversation.agent.prompt.backup_llm_config = { preference: "override", order: ["claude-haiku-4-5"] };
conversation.agent.prompt.tools = [];
conversation.agent.prompt.tool_ids = [];
conversation.agent.prompt.mcp_server_ids = [];
conversation.agent.prompt.native_mcp_server_ids = [];
conversation.agent.prompt.knowledge_base = [];
conversation.agent.prompt.rag = { ...(conversation.agent.prompt.rag ?? {}), enabled: false, optional_rag_enabled: false };

const referenceTools = conversation.agent.prompt.built_in_tools ?? {};
conversation.agent.prompt.built_in_tools = {
  ...Object.fromEntries(Object.keys(referenceTools).map((key) => [key, null])),
  language_detection: referenceTools.language_detection,
  end_call: referenceTools.end_call,
};

if (!conversation.agent.prompt.built_in_tools.language_detection || !conversation.agent.prompt.built_in_tools.end_call) {
  throw new Error("Les outils système de changement de langue et de fin d’appel sont introuvables.");
}

Object.assign(conversation.agent.prompt.built_in_tools.language_detection, {
  description: "EBOLA RDC — Au premier tour, dès que français, English ou Kiswahili est identifiable, appelle silencieusement cet outil avant tout texte, y compris si une urgence est décrite. Utilise fr, en ou sw uniquement. En cours d'appel, utilise l'outil avant de répondre dans une autre langue prise en charge. Après le résultat, poursuis sans rejouer l'accueil. Pour une langue non prise en charge, demande uniquement : Français, English ou Kiswahili ?",
  pre_tool_speech: "off",
  force_pre_tool_speech: false,
  interruption_mode: "disable_during_tool_and_turn",
  tool_call_sound: null,
});
conversation.agent.prompt.built_in_tools.language_detection.params = {
  ...(conversation.agent.prompt.built_in_tools.language_detection.params ?? {}),
  system_tool_type: "language_detection",
  only_at_conversation_start: false,
};

Object.assign(conversation.agent.prompt.built_in_tools.end_call, {
  description: "EBOLA RDC — Termine uniquement lorsque l'appelant confirme qu'il raccroche ou n'a plus de question. Prononce une seule clôture dans la langue active : Merci de votre appel. / Thank you for calling. / Asante kwa kupiga simu. N'appelle jamais cet outil automatiquement après une consigne d'urgence; attends la confirmation de l'appelant.",
  pre_tool_speech: "off",
  force_pre_tool_speech: false,
  tool_call_sound: null,
});

const presetTemplate = structuredClone(conversation.language_presets?.fr ?? conversation.language_presets?.nl ?? conversation.language_presets?.de);
if (!presetTemplate?.overrides) throw new Error("Modèle de preset de langue indisponible.");

const languages = {
  fr: { voiceId: "kRnE5e47lbU8Zg2MPQPm", voiceName: "Moussa FR", speed: 0.94 },
  en: { voiceId: "xXFOA11TH5EKg661vj6I", voiceName: "The Englishman Alex", speed: 0.96 },
  sw: { voiceId: "kRnE5e47lbU8Zg2MPQPm", voiceName: "Moussa FR — pilote kiswahili à valider", speed: 0.92 },
};

conversation.language_presets = {};
for (const [language, settings] of Object.entries(languages)) {
  const preset = structuredClone(presetTemplate);
  preset.overrides ??= {};
  preset.overrides.agent ??= {};
  preset.overrides.agent.language = language;
  preset.overrides.agent.first_message = firstMessage;
  preset.overrides.agent.prompt = { llm: "claude-sonnet-4-5", backup_llm_config: { preference: "override", order: ["claude-haiku-4-5"] } };
  preset.overrides.tts = {
    model_id: "eleven_v3_conversational",
    voice_id: settings.voiceId,
    stability: 0.46,
    similarity_boost: 0.78,
    speed: settings.speed,
  };
  conversation.language_presets[language] = preset;
}

conversation.asr.provider = "scribe_realtime";
conversation.asr.quality = "high";
conversation.asr.keywords = ["Ebola", "Bundibugyo", "RDC", "Congo", "Ituri", "Bunia", "Mongbwalu", "Nizi", "Pawa", "Kisangani", "Nord-Kivu", "Haut-Uélé", "Tshopo", "Sud-Kivu", "Bas-Uélé", "un cinq un", "one five one", "moja tano moja", "français", "English", "Kiswahili"];
conversation.turn.turn_model = "turn_v3";
conversation.turn.turn_eagerness = "normal";
conversation.turn.speculative_turn = false;
conversation.turn.turn_timeout = 7;
conversation.turn.soft_timeout_config = { ...(conversation.turn.soft_timeout_config ?? {}), timeout_seconds: -1, use_llm_generated_message: false, randomize_fillers: false, max_soft_timeouts_per_generation: 1 };
conversation.conversation.max_duration_seconds = 900;
conversation.conversation.file_input.enabled = false;
conversation.tts = {
  ...conversation.tts,
  model_id: "eleven_v3_conversational",
  voice_id: languages.fr.voiceId,
  speed: languages.fr.speed,
  stability: 0.46,
  similarity_boost: 0.78,
  expressive_mode: true,
  suggested_audio_tags: [],
  text_normalisation_type: "elevenlabs",
  supported_voices: [],
};

const platform = structuredClone(reference.platform_settings);
platform.archived = false;
platform.workspace_overrides = {};
platform.data_collection = {};
platform.analysis_items = {};
delete platform.webhook;
platform.privacy = {
  ...platform.privacy,
  record_voice: false,
  retention_days: 0,
  delete_audio: true,
  delete_transcript_and_pii: true,
  apply_to_existing_conversations: false,
  zero_retention_mode: false,
  user_memory: { enabled: false, scale: "balanced" },
};

const payload = {
  name: "Voicebot Ebola — RDC — FR EN SW",
  tags: ["ebola", "drc", "rdc", "fr-en-sw", "prototype", "no-diagnosis"],
  conversation_config: conversation,
  platform_settings: platform,
};

const response = await fetch("https://api.elevenlabs.io/v1/convai/agents/create", { method: "POST", headers, body: JSON.stringify(payload) });
const result = await response.json();
if (!response.ok) throw new Error(`Création rejetée (${response.status}) : ${JSON.stringify(result)}`);

console.log(JSON.stringify({
  agent_id: result.agent_id,
  name: payload.name,
  languages: Object.keys(languages),
  voices: languages,
  greeting_language: "fr",
  phone_number_attached: false,
  browser_widget_ready: true,
  record_voice: false,
  retention_days: 0,
}, null, 2));
