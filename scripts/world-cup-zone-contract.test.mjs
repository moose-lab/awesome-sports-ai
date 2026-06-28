import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const safeRead = (path) => {
  try {
    return read(path);
  } catch {
    return "";
  }
};
const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const source = JSON.parse(read("visualizations/source-data.json"));

test("FIFA World Cup zone publishes a knockout-stage contract", () => {
  const format = source.fifaWorldCup.knockoutFormat;
  const stream = source.fifaWorldCup.updateStream;
  const fixtures = source.fifaWorldCup.confirmedFixtures;

  assert.ok(format, "missing fifaWorldCup.knockoutFormat");
  assert.equal(format.teams, "32 teams");
  assert.deepEqual(format.stageOrder, [
    "Round of 32",
    "Round of 16",
    "Quarterfinals",
    "Semifinals",
    "Third-place match",
    "Final",
  ]);
  assert.ok(stream, "missing fifaWorldCup.updateStream");
  assert.equal(stream.label, "Knockout update stream");
  assert.equal(stream.cadence, "Every 5 minutes during the tournament window");
  assert.match(stream.currentWindow, /Round of 32/);
  assert.equal(stream.source, "ESPN FIFA World Cup scoreboard API");
  assert.match(stream.lastVerifiedAt, /^2026-/);
  assert.deepEqual(stream.consumers, ["Sports AI Hub", "Knockout tool map", "Match Center route"]);
  assert.ok(fixtures.every((fixture) => fixture.round), "fixture cards must expose round labels");
  assert.ok(fixtures.every((fixture) => !("group" in fixture)), "fixture cards must not expose legacy group fields");
});

test("FIFA World Cup zone publishes matchday zones and toolkit lanes", () => {
  const zones = source.fifaWorldCup.matchdayZones;
  const toolkit = source.fifaWorldCup.toolkit;

  assert.ok(Array.isArray(zones), "missing fifaWorldCup.matchdayZones");
  assert.ok(Array.isArray(toolkit), "missing fifaWorldCup.toolkit");
  assert.ok(zones.length >= 4);
  assert.ok(toolkit.length >= 6);
  assert.deepEqual(toolkit.map((lane) => lane.slug), [
    "knockout-data",
    "bracket-and-scenarios",
    "match-intelligence",
    "xg-and-shot-quality",
    "video-and-vision",
    "scouting-and-reports",
    "media-and-localization",
  ]);
  toolkit.forEach((lane) => {
    assert.ok(lane.title);
    assert.ok(lane.matchdayUse);
    assert.ok(lane.tools.length >= 2);
  });
});

test("World Cup docs and README expose every toolkit lane", () => {
  const readme = read("README.md");
  const zoneDoc = safeRead("docs/world-cup-2026-zone.md");
  const toolkitDoc = safeRead("docs/world-cup-2026-toolkit.md");

  assert.match(readme, /World Cup 2026 Knockout Toolkit/);
  assert.match(readme, /Round of 32/);
  assert.match(readme, /docs\/world-cup-2026-zone\.md/);
  assert.match(readme, /docs\/world-cup-2026-toolkit\.md/);
  assert.doesNotMatch(readme, /fifa-world-cup-2026\.svg/);
  source.fifaWorldCup.toolkit.forEach((lane) => {
    assert.match(readme, new RegExp(escapeRegExp(lane.title)));
    assert.match(toolkitDoc, new RegExp(`### ${escapeRegExp(lane.title)}`));
    assert.match(zoneDoc, new RegExp(escapeRegExp(lane.slug)));
  });
});
