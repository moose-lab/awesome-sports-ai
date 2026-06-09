import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const read = (path) => readFileSync(join(root, path), "utf8");

const regenerate = () => {
  execFileSync(process.execPath, [join(root, "scripts", "generate-visualizations.mjs")], {
    cwd: root,
    stdio: "pipe",
  });
};

test("event SVGs reflect the June 9, 2026 event state", () => {
  regenerate();

  const nba = read("visualizations/nba-finals-2026.svg");
  assert.match(nba, /Updated June 9, 2026/);
  assert.match(nba, /2-1/);
  assert.match(nba, /SAS 115 - NYK 111/);
  assert.match(nba, /Game 4 tie chance/);

  const fifa = read("visualizations/fifa-world-cup-2026.svg");
  assert.match(fifa, /Updated June 9, 2026/);
  assert.match(fifa, /Opening confirmed fixtures/);
  assert.match(fifa, /Mexico v South Africa/);
  assert.match(fifa, /USA v Paraguay/);
  assert.match(fifa, /Brazil v Morocco/);
  assert.match(fifa, /England v Croatia/);
});

test("README exposes direct event tags for visualization assets", () => {
  const readme = read("README.md");

  assert.match(readme, /\[NBA Finals 2026\]\(visualizations\/nba-finals-2026\.svg\)/);
  assert.match(readme, /\[FIFA World Cup 2026\]\(visualizations\/fifa-world-cup-2026\.svg\)/);
});
