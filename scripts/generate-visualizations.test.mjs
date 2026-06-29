import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
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

test("NBA event SVG reflects the source data event state", () => {
  regenerate();

  const source = readJson("visualizations/source-data.json");
  const nba = read("visualizations/nba-finals-2026.svg");
  assert.match(nba, new RegExp(escapeRegExp(source.nbaFinals.updated)));
  assert.match(nba, new RegExp(escapeRegExp(source.nbaFinals.series.record)));
  assert.match(nba, new RegExp(escapeRegExp(source.nbaFinals.games[4].score)));
  assert.match(nba, new RegExp(escapeRegExp(source.nbaFinals.games[4].insight)));
});

test("event visualization assets stay outside the main README", () => {
  regenerate();

  const readme = read("README.md");
  const visualizationsReadme = read("visualizations/README.md");

  assert.equal(existsSync(join(root, "visualizations", "fifa-world-cup-2026.svg")), false);
  assert.match(visualizationsReadme, /\[nba-finals-2026\.svg\]\(nba-finals-2026\.svg\)/);
  assert.doesNotMatch(readme, /fifa-world-cup-2026\.svg/);
  assert.doesNotMatch(readme, /group-stage snapshot/i);
  assert.doesNotMatch(readme, /FIFA World Cup 2026 live score visualization/);
  assert.doesNotMatch(readme, /Congratulations, New York Knicks/);
  assert.doesNotMatch(readme, /\[!\[[^\]]+\]\(visualizations\//);
});
