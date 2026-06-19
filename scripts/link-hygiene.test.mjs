import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
const publicHubUrl = "https://github.com/moose-lab/awesome-sports-ai#build-your-own-2026-trending-app";

test("Sports AI Hub links use public, non-404 targets", () => {
  assert.match(readme, new RegExp(publicHubUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(readme, /https:\/\/moose-lab\.github\.io\/sports-ai-hub\/?/);
  assert.doesNotMatch(readme, /https:\/\/sports-ai-hub\.manus\.space\/?/);
  assert.doesNotMatch(readme, /https:\/\/github\.com\/moose-lab\/sports-ai-hub/);
});
