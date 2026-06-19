import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");

test("Sports AI Hub links use the canonical GitHub Pages URL", () => {
  assert.match(readme, /https:\/\/moose-lab\.github\.io\/sports-ai-hub\//);
  assert.doesNotMatch(readme, /https:\/\/moose-lab\.github\.io\/sports-ai-hub(?!\/)/);
});
