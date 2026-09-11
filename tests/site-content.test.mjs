import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const files = ["app/page.tsx", "app/site-chrome.tsx", "app/agir/page.tsx", "app/flambees/page.tsx", "app/technologie/page.tsx", "app/confidentialite/page.tsx", "app/mentions-legales/page.tsx"];

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
  assert.match(script, /bienvenue sur la ligne d'information et d'orientation Ebola/);
});

test("tous les visuels éditoriaux retenus et leurs sources sont référencés", async () => {
  const text = (await Promise.all(["app/page.tsx", "app/agir/page.tsx", "app/sources/page.tsx", "app/technologie/page.tsx", "app/site-chrome.tsx", "app/sprite-icon.tsx", "app/layout.tsx", "scripts/crop-visuals.sh"].map((path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")))).join("\n");
  for (const name of ["hero-rdc.webp", "capabilities-grid.png", "voicebot-flow.webp", "community-response.png", "voicebot-trust.webp", "prevention-icons-a.png", "prevention-icons-b.png", "platform-icons.png", "technology-hero.webp", "brand-mark.webp", "favicon.png"]) assert.match(text, new RegExp(name.replace(".", "\\.")));
});

test("les planches sont toujours découpées et jamais affichées comme des images groupées", async () => {
  const text = (await Promise.all(["app/page.tsx", "app/agir/page.tsx", "app/sources/page.tsx", "app/technologie/page.tsx", "app/flambees/page.tsx"].map((path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")))).join("\n");
  const [sprite, css, crops] = await Promise.all(["app/sprite-icon.tsx", "app/globals.css", "scripts/crop-visuals.sh"].map((path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")));
  assert.doesNotMatch(text, /<img[^>]+(?:prevention-icons|platform-icons|capabilities-grid|community-response)/);
  assert.match(sprite, /\/visuals\/crops\//);
  assert.match(sprite, /<img/);
  assert.doesNotMatch(`${sprite}\n${css}`, /background-size/);
  assert.match(crops, /crop_cells/);
});

test("la navigation publique nomme et publie la page Technologie", async () => {
  const [chrome, technology] = await Promise.all(["app/site-chrome.tsx", "app/technologie/page.tsx"].map((path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")));
  assert.match(chrome, /href: "\/technologie", label: "Technologie"/);
  assert.doesNotMatch(chrome, /href: "\/architecture"/);
  assert.doesNotMatch(technology, /Direction visuelle|Interface publique|Supabase|Pas en phase 1/i);
  assert.doesNotMatch(technology, /Validation avant ouverture|La technologie n’est prête que/i);
  for (const label of ["Une conversation utile", "Sept points de contrôle", "Trois couches de protection", "Périmètre opérationnel", "Composants technologiques"]) assert.match(technology, new RegExp(label));
});

test("la navigation présente les flambées comme des épisodes datés", async () => {
  const [chrome, outbreaks] = await Promise.all(["app/site-chrome.tsx", "app/flambees/page.tsx"].map((path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")));
  assert.match(chrome, /href: "\/flambees", label: "Flambées"/);
  assert.doesNotMatch(chrome, /href: "\/situation"|label: "Situation"/);
  assert.match(outbreaks, /Flambées documentées/);
  assert.match(outbreaks, /9 septembre 2026/);
  assert.match(outbreaks, /23 avril — 4 juillet 2022/);
  assert.match(outbreaks, /21 août — 27 septembre 2022/);
});

test("les animations bento sont accessibles et couvrent le fallback pointerout", async () => {
  const [effects, css] = await Promise.all(["app/use-site-effects.ts", "app/globals.css"].map((path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")));
  assert.match(effects, /pointerout/);
  assert.match(effects, /pointerleave/);
  assert.match(effects, /\(hover: hover\) and \(pointer: fine\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /\[data-bento\]/);
});
