import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("la configuration garde une voix cohérente, vive et expressive après le choix du français", async () => {
  const [prompt, sync] = await Promise.all([
    readFile(new URL("../agent/system-prompt.md", import.meta.url), "utf8"),
    readFile(new URL("../scripts/update-elevenlabs-agent.mjs", import.meta.url), "utf8"),
  ]);
  assert.match(prompt, /rassurante, énergique et assertive/i);
  assert.match(prompt, /un seul paragraphe vocal fluide et continu/i);
  assert.match(prompt, /aucune pause théâtrale, aucun silence artificiel/i);
  assert.match(sync, /speed: 1\.1/);
  assert.match(sync, /stability: 0\.32/);
  assert.match(sync, /model_id: "eleven_v3_conversational"/);
  assert.match(sync, /voice_id: "8R6pzcy1HIr4WcoApmzw"/);
  assert.match(sync, /expressive_mode: true/);
  assert.match(sync, /fr: naturalVoice,\s*en: naturalVoice/s);
  assert.match(sync, /language_presets: languagePresets/);
  assert.match(sync, /appelle silencieusement cet outil avant tout texte/);
  assert.doesNotMatch(sync, /speed: 0\.[0-9]+/);
});
