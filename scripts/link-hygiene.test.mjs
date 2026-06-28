import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
const goodFirstIssueUrl =
  "https://github.com/moose-lab/awesome-sports-ai/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22";

test("Sports AI Hub links use public, non-404 targets", () => {
  assert.doesNotMatch(readme, /https:\/\/moose-lab\.github\.io\/sports-ai-hub\/?/);
  assert.doesNotMatch(readme, /https:\/\/sports-ai-hub\.manus\.space\/?/);
  assert.doesNotMatch(readme, /https:\/\/github\.com\/moose-lab\/sports-ai-hub/);
});

test("README presents the landing-page prototype path", () => {
  assert.match(
    readme,
    /The open-source toolkit for decomposing enterprise sports AI into runnable mono-tools\./,
  );
  assert.match(readme, /\[llm-match-commentator\]\(prototypes\/llm-match-commentator\/\)/);
  assert.match(readme, /\[wnba-gravity-mapper\]\(prototypes\/wnba-gravity-mapper\/\)/);
  assert.match(readme, /\[pickleball-court-mapper\]\(prototypes\/pickleball-court-mapper\/\)/);
  assert.match(readme, /docs\/assets\/readme\/llm-match-commentator-output\.svg/);
  assert.match(readme, /prototypes\/wnba-gravity-mapper\/gravity_map\.png/);
  assert.match(readme, /prototypes\/pickleball-court-mapper\/court_diagram\.png/);
  assert.match(readme, /\*\*\[Start contributing\]\(CONTRIBUTING\.md\)\*\*/);
  assert.match(readme, new RegExp(goodFirstIssueUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});

test("README prototype visual assets exist", () => {
  [
    "../docs/assets/readme/llm-match-commentator-output.svg",
    "../prototypes/wnba-gravity-mapper/gravity_map.png",
    "../prototypes/pickleball-court-mapper/court_diagram.png",
  ].forEach((assetPath) => {
    assert.equal(existsSync(new URL(assetPath, import.meta.url)), true, assetPath);
  });
});
