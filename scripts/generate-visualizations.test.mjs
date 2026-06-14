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

test("event SVGs reflect the June 14, 2026 event state", () => {
  regenerate();

  const nba = read("visualizations/nba-finals-2026.svg");
  assert.match(nba, /Updated June 14, 2026/);
  assert.match(nba, /4-1/);
  assert.match(nba, /NYK 94 - SAS 90/);
  assert.match(nba, /Title clincher/);

  const fifa = read("visualizations/fifa-world-cup-2026.svg");
  assert.match(fifa, /Updated June 14, 2026/);
  assert.match(fifa, /Group-stage live snapshot/);
  assert.match(fifa, /Seven matches are final/);
  assert.match(fifa, /Mexico v South Africa/);
  assert.match(fifa, /MEX 2 - RSA 0/);
  assert.match(fifa, /USA v Paraguay/);
  assert.match(fifa, /USA 4 - PAR 1/);
  assert.match(fifa, /Brazil v Morocco/);
  assert.match(fifa, /AUS 1 - TUR 0/);
  assert.match(fifa, /Sweden v Tunisia/);
});

test("README exposes direct event tags for visualization assets", () => {
  const readme = read("README.md");

  assert.match(readme, /\[NBA Finals 2026: Knicks Champions\]\(visualizations\/nba-finals-2026\.svg\)/);
  assert.match(readme, /Congratulations, New York Knicks: 2026 NBA Champions!/);
  assert.match(readme, /\[FIFA World Cup 2026\]\(visualizations\/fifa-world-cup-2026\.svg\)/);
  assert.match(readme, /FIFA World Cup 2026 live score visualization/);
});
