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

  assert.match(output, /HYROX Daily Training Checklist/);
  assert.match(output, /HYROX 每日训练清单/);
  assert.match(output, /Phase \/ 阶段: Build \/ 建设期/);
  assert.match(output, /Threshold 1 km rhythm/);
  assert.match(output, /Training Goal \/ 训练目标/);
  assert.match(output, /Completion Target \/ 完成标准/);
  assert.match(output, /Source Anchors \/ 来源/);
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

test("renders a bilingual seven-day checklist from a start date", () => {
  const output = run([
    "--level",
    "recreational",
    "--start-date",
    "2026-06-10",
    "--date",
    "2026-06-10",
    "--days",
    "7"
  ]);

  assert.match(output, /2026-06-10 · Wednesday \/ 星期三/);
  assert.match(output, /2026-06-16 · Tuesday \/ 星期二/);
  assert.match(output, /Strength base: squat, hinge, push, pull, carry \/ 基础力量/);
  assert.match(output, /Prescription \/ 具体安排/);
  assert.match(output, /Readiness Adjustment \/ 状态调整/);
});

test("keeps the original basic renderer available", () => {
  const output = run(["--level", "recreational", "--week", "6", "--day", "tuesday", "--format", "basic"]);

  assert.match(output, /HYROX Daily Plan - Tuesday/);
  assert.match(output, /Official preparation/);
});
