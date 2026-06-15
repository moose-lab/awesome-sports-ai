import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const read = (path) => readFileSync(join(root, path), "utf8");
const readJson = (path) => JSON.parse(read(path));
const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const regenerate = () => {
  execFileSync(process.execPath, [join(root, "scripts", "generate-visualizations.mjs")], {
    cwd: root,
    stdio: "pipe",
  });
};

test("event SVGs reflect the source data event state", () => {
  regenerate();

  const source = readJson("visualizations/source-data.json");
  const nba = read("visualizations/nba-finals-2026.svg");
  assert.match(nba, new RegExp(escapeRegExp(source.nbaFinals.updated)));
  assert.match(nba, new RegExp(escapeRegExp(source.nbaFinals.series.record)));
  assert.match(nba, new RegExp(escapeRegExp(source.nbaFinals.games[4].score)));
  assert.match(nba, new RegExp(escapeRegExp(source.nbaFinals.games[4].insight)));

  const fifa = read("visualizations/fifa-world-cup-2026.svg");
  const featuredFixtures = [
    source.fifaWorldCup.confirmedFixtures[0],
    source.fifaWorldCup.confirmedFixtures.find((fixture) => fixture.status === "Live"),
    source.fifaWorldCup.confirmedFixtures.find((fixture) => fixture.status === "Scheduled"),
  ].filter(Boolean);

  assert.match(fifa, new RegExp(escapeRegExp(source.fifaWorldCup.updated)));
  assert.match(fifa, new RegExp(escapeRegExp(source.fifaWorldCup.fixtureSummary.label)));
  assert.match(fifa, new RegExp(escapeRegExp(source.fifaWorldCup.fixtureSummary.detail)));
  featuredFixtures.forEach((fixture) => {
    assert.match(fifa, new RegExp(escapeRegExp(fixture.match)));
    assert.match(fifa, new RegExp(escapeRegExp(fixture.score)));
  });
});

test("README exposes direct event tags for visualization assets", () => {
  const readme = read("README.md");

  assert.match(readme, /\[NBA Finals 2026: Knicks Champions\]\(visualizations\/nba-finals-2026\.svg\)/);
  assert.match(readme, /Congratulations, New York Knicks: 2026 NBA Champions!/);
  assert.match(readme, /\[FIFA World Cup 2026\]\(visualizations\/fifa-world-cup-2026\.svg\)/);
  assert.match(readme, /FIFA World Cup 2026 live score visualization/);
});
