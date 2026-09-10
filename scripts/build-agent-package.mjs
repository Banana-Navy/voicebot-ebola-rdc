import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const readText = (path) => readFile(resolve(root, path), 'utf8');
const readJson = async (path) => JSON.parse(await readText(path));
const sha256 = (value) => createHash('sha256').update(value).digest('hex');

const [prompt, knowledge, config, contacts, situation] = await Promise.all([
  readText('agent/system-prompt.md'),
  readText('knowledge/base-connaissances.md'),
  readJson('config/voicebot.json'),
  readJson('config/contacts-rdc.json'),
  readJson('config/situation-rdc.json'),
]);

const payload = {
  schema_version: 1,
  generated_at: new Date().toISOString(),
  deployment_status: 'blocked_until_human_approval_and_voice_selection',
  configuration: config,
  controlled_content: {
    system_prompt: prompt,
    knowledge_base: knowledge,
    hashes: {
      system_prompt_sha256: sha256(prompt),
      knowledge_base_sha256: sha256(knowledge),
    },
  },
  verified_contacts: contacts,
  situation_snapshot_metadata: {
    snapshot_date: situation.snapshot_date,
    source: situation.source,
    voicebot_can_speak_snapshot_statistics: situation.voicebot_can_speak_snapshot_statistics,
  },
};

const outputDir = resolve(root, 'build');
const outputPath = resolve(outputDir, 'elevenlabs-agent-package.json');
await mkdir(outputDir, { recursive: true });
await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

console.log(JSON.stringify({
  ok: true,
  output: outputPath,
  system_prompt_sha256: payload.controlled_content.hashes.system_prompt_sha256,
  knowledge_base_sha256: payload.controlled_content.hashes.knowledge_base_sha256,
}, null, 2));

