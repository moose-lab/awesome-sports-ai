import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const script = join(root, "scripts", "hyrox-day-plan.mjs");

const run = (args) =>
  execFileSync(process.execPath, [script, ...args], {
    cwd: root,
    encoding: "utf8"
  });

test("renders a recreational build-phase Tuesday plan", () => {
  const output = run(["--level", "recreational", "--week", "6", "--day", "tuesday"]);

  assert.match(output, /HYROX Daily Plan - Tuesday/);
  assert.match(output, /Phase: Build/);
  assert.match(output, /Threshold 1 km rhythm/);
  assert.match(output, /Official preparation/);
});

test("derives week and day from start date", () => {
  const output = run([
    "--level",
    "casual",
    "--start-date",
    "2026-06-10",
    "--date",
    "2026-06-24",
    "--json"
  ]);
  const plan = JSON.parse(output);

  assert.equal(plan.week, 3);
  assert.equal(plan.day, "wednesday");
  assert.equal(plan.phase_key, "foundation");
  assert.equal(plan.session.title, "Strength base: squat, hinge, push, pull, carry");
});

test("rejects unknown levels", () => {
  const result = spawnSync(process.execPath, [script, "--level", "unknown"], {
    cwd: root,
    encoding: "utf8"
  });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unknown level/);
});
