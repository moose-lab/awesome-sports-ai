import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync, rmSync } from "node:fs";
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
  assert.match(output, /HYROX Best Preparation/);
});

test("personalizes output from registration division, age group, and experience", () => {
  const output = run([
    "--division",
    "pro",
    "--sex",
    "men",
    "--age-group",
    "30-34",
    "--experience",
    "veteran",
    "--start-date",
    "2026-06-10",
    "--date",
    "2026-06-10"
  ]);

  assert.match(output, /Profile \/ 用户画像: Men Pro \/ 男子 Pro/);
  assert.match(output, /Age Group \/ 年龄组: 30-34/);
  assert.match(output, /Experience \/ 经验: veteran \/ 老鸟/);
  assert.match(output, /Division Standard \/ 组别标准/);
  assert.match(output, /Pro load exposure/);
});

test("renders a course-style HTML training checklist", () => {
  const output = run([
    "--division",
    "open",
    "--sex",
    "women",
    "--age-group",
    "25-29",
    "--experience",
    "newcomer",
    "--start-date",
    "2026-06-10",
    "--date",
    "2026-06-10",
    "--format",
    "html"
  ]);

  assert.match(output, /^<!doctype html>/);
  assert.match(output, /<html lang="en">/);
  assert.match(output, /HYROX Daily Training Checklist/);
  assert.match(output, /Women Open \/ 女子 Open/);
  assert.match(output, /Training Goal/);
  assert.match(output, /Completion Target/);
  assert.match(output, /Session Prescription/);
  assert.match(output, /Readiness Adjustment/);
  assert.match(output, /Source Anchors/);
  assert.match(output, /HYROX YouTube/);
  assert.match(output, /class="session-card"/);
});

test("writes HTML visualization to an output file", () => {
  const outputPath = "/tmp/hyrox-html-render-test.html";
  rmSync(outputPath, { force: true });

  const output = run([
    "--division",
    "open",
    "--sex",
    "women",
    "--age-group",
    "25-29",
    "--experience",
    "newcomer",
    "--start-date",
    "2026-06-10",
    "--date",
    "2026-06-10",
    "--format",
    "html",
    "--output",
    outputPath
  ]);
  const html = readFileSync(outputPath, "utf8");

  assert.match(output, /Wrote \/tmp\/hyrox-html-render-test\.html/);
  assert.match(html, /<!doctype html>/);
  assert.match(html, /class="session-card"/);
  assert.match(html, /Women Open \/ 女子 Open/);
  assert.match(html, /Source Anchors/);
});

test("lists professional asset categories for agent retrieval", () => {
  const output = run(["--list-assets"]);

  assert.match(output, /HYROX training asset registry/);
  assert.match(output, /Official reference \/ 官方资料: 10/);
  assert.match(output, /Video and technique \/ 视频与技术: 4/);
  assert.match(output, /Blogs and training guides \/ 博客与训练指南: 4/);
  assert.match(output, /Podcasts and media \/ 播客与媒体: 6/);
});
