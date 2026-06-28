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

test("README does not expose the old World Cup group-stage visualization", () => {
  regenerate();

  const readme = read("README.md");

  assert.equal(existsSync(join(root, "visualizations", "fifa-world-cup-2026.svg")), false);
  assert.doesNotMatch(readme, /fifa-world-cup-2026\.svg/);
  assert.doesNotMatch(readme, /group-stage snapshot/i);
  assert.doesNotMatch(readme, /FIFA World Cup 2026 live score visualization/);
  assert.doesNotMatch(readme, /Congratulations, New York Knicks/);
  assert.match(readme, /World Cup 2026 Knockout Toolkit/);
  assert.match(readme, /Round of 32/);
  assert.match(readme, /Bracket and Elimination Scenarios/);
});
