import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const files = ["app/page.tsx", "app/site-chrome.tsx", "app/agir/page.tsx", "app/situation/page.tsx", "app/architecture/page.tsx", "app/confidentialite/page.tsx", "app/mentions-legales/page.tsx"];

test("la page distingue le voicebot du numéro sanitaire officiel", async () => {
  const text = (await Promise.all(files.map((path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")))).join("\n");
  assert.match(text, /Parler au voicebot/);
  assert.match(text, /tel:151/);
  assert.match(text, /ne (contacte|remplace)/i);
  assert.doesNotMatch(text, /numéro du bot[^\n]*151/i);
});

test("les trois langues et le greeting français restent publiés", async () => {
  const [page, prompt, script] = await Promise.all(["app/page.tsx", "agent/system-prompt.md", "scripts/create-elevenlabs-agent.mjs"].map((path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")));
  for (const text of [page, prompt, script]) assert.match(text, /français/i);
  assert.match(page, /English/);
  assert.match(page, /Kiswahili/);
  assert.match(script, /Vous êtes sur la ligne d'information et d'orientation Ebola/);
});

test("tous les visuels fournis sont intégrés", async () => {
  const text = (await Promise.all(["app/page.tsx", "app/agir/page.tsx", "app/sources/page.tsx", "app/architecture/page.tsx", "app/site-chrome.tsx"].map((path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")))).join("\n");
  for (const name of ["hero-rdc.png", "capabilities-grid.png", "voicebot-flow.png", "community-response.png", "voicebot-trust.png", "vision-landing.png", "prevention-icons-a.png", "prevention-icons-b.png", "platform-icons.png"]) assert.match(text, new RegExp(name.replace(".", "\\.")));
});

test("les animations bento sont accessibles et couvrent le fallback pointerout", async () => {
  const [effects, css] = await Promise.all(["app/use-site-effects.ts", "app/globals.css"].map((path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")));
  assert.match(effects, /pointerout/);
  assert.match(effects, /pointerleave/);
  assert.match(effects, /\(hover: hover\) and \(pointer: fine\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /\[data-bento\]/);
});
