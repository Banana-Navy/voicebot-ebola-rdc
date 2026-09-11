import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("la configuration évite le débit lent et la cadence robotique", async () => {
  const [prompt, sync] = await Promise.all([
    readFile(new URL("../agent/system-prompt.md", import.meta.url), "utf8"),
    readFile(new URL("../scripts/update-elevenlabs-agent.mjs", import.meta.url), "utf8"),
  ]);
  assert.match(prompt, /un seul paragraphe vocal fluide et continu/i);
  assert.match(prompt, /aucune pause théâtrale, aucun silence artificiel/i);
  assert.match(sync, /speed: 1\.05/);
  assert.match(sync, /model_id: "eleven_v3_conversational"/);
  assert.match(sync, /voice_id: "8R6pzcy1HIr4WcoApmzw"/);
  assert.match(sync, /appelle silencieusement cet outil avant tout texte/);
  assert.doesNotMatch(sync, /speed: 0\.[0-9]+/);
});
