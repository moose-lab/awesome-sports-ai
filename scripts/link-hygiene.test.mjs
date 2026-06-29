import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
const goodFirstIssueUrl =
  "https://github.com/moose-lab/awesome-sports-ai/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22";

test("Sports AI Hub links use public, non-404 targets", () => {
  assert.doesNotMatch(readme, /https:\/\/moose-lab\.github\.io\/sports-ai-hub\/?/);
  assert.doesNotMatch(readme, /https:\/\/sports-ai-hub\.manus\.space\/?/);
  assert.doesNotMatch(readme, /https:\/\/github\.com\/moose-lab\/sports-ai-hub/);
});

test("README presents a developer-focused awesome list path", () => {
  assert.match(
    readme,
    /resource-type-first awesome list for Sports & AI builders/i,
  );
  assert.match(readme, /## Quick Start for Builders/);
  assert.match(readme, /## Who This Is For/);
  assert.match(readme, /Developers building sports AI apps/);
  assert.match(readme, /Tool users who want to find a working project/);
  assert.match(readme, /## Vibe-Coding Lookup Paths/);
  assert.match(readme, /## Sports & AI Relevance Rule/);
  assert.match(readme, /## Builder Paths & Scenarios/);
  assert.match(readme, /World Cup 2026 assistant toolkit/);
  assert.match(readme, /World Cup 2026 knockout-stage tool map/);
  assert.match(readme, /World Cup 2026 zone plan/);
  assert.match(readme, /\[`data\/catalog\.json`\]\(data\/catalog\.json\)/);
  assert.match(readme, /\[`llm-match-commentator`\]\(prototypes\/llm-match-commentator\/\)/);
  assert.match(readme, /\[`wnba-gravity-mapper`\]\(prototypes\/wnba-gravity-mapper\/\)/);
  assert.match(readme, /\[`pickleball-court-mapper`\]\(prototypes\/pickleball-court-mapper\/\)/);
  assert.match(readme, /\*\*Contribute:\*\* \[CONTRIBUTING\.md\]\(CONTRIBUTING\.md\)/);
  assert.match(readme, new RegExp(goodFirstIssueUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(
    readme,
    /The open-source toolkit for decomposing enterprise sports AI into runnable mono-tools\./,
  );
  assert.doesNotMatch(readme, /docs\/assets\/readme\/llm-match-commentator-output\.svg/);
  assert.doesNotMatch(readme, /visualizations\/fifa-world-cup-2026\.svg/);
  assert.doesNotMatch(readme, /Congratulations, New York Knicks/);
  assert.doesNotMatch(readme, /Build Your Own 2026 Trending App/);
  assert.doesNotMatch(readme, /#build-your-own-2026-trending-app/);
});
