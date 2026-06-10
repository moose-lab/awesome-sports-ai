import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const script = join(root, "scripts", "crossfit-day-plan.mjs");
const xiaohongshuEvidencePath = join(root, "data", "crossfit", "xiaohongshu-search-evidence.json");

const run = (args) =>
  execFileSync(process.execPath, [script, ...args], {
    cwd: root,
    encoding: "utf8"
  });

test("renders a recreational foundation Wednesday CrossFit plan", () => {
  const output = run(["--level", "recreational", "--week", "1", "--day", "wednesday"]);

  assert.match(output, /CrossFit Daily Training Checklist/);
  assert.match(output, /CrossFit 每日训练清单/);
  assert.match(output, /Phase \/ 阶段: Foundation \/ 基础期/);
  assert.match(output, /Strength skill plus short mixed-modal workout/);
  assert.match(output, /Intended Stimulus \/ 目标刺激/);
  assert.match(output, /Scaling Path \/ Scale 路径/);
  assert.match(output, /Source Anchors \/ 来源/);
});

test("derives CrossFit week and day from start date", () => {
  const output = run([
    "--level",
    "beginner",
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
  assert.equal(plan.session.title, "Strength skill plus short mixed-modal workout");
});

test("rejects unknown CrossFit levels", () => {
  const result = spawnSync(process.execPath, [script, "--level", "unknown"], {
    cwd: root,
    encoding: "utf8"
  });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unknown level/);
});

test("renders a bilingual seven-day CrossFit checklist from a start date", () => {
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
  assert.match(output, /Strength skill plus short mixed-modal workout \/ 力量技术加短混合模式训练/);
  assert.match(output, /Scaling Path \/ Scale 路径/);
  assert.match(output, /Readiness Adjustment \/ 状态调整/);
});

test("personalizes CrossFit output from goal, equipment, experience, and limiter", () => {
  const output = run([
    "--goal",
    "open_prep",
    "--equipment",
    "affiliate",
    "--experience",
    "veteran",
    "--limiter",
    "gymnastics",
    "--start-date",
    "2026-06-10",
    "--date",
    "2026-06-10"
  ]);

  assert.match(output, /Profile \/ 用户画像: CrossFit Open preparation \/ CrossFit Open 备赛/);
  assert.match(output, /Equipment \/ 器械条件: Affiliate gym \/ CrossFit 盒子/);
  assert.match(output, /Experience \/ 经验: veteran \/ 老鸟/);
  assert.match(output, /Limiter \/ 当前短板: Gymnastics \/ 体操/);
  assert.match(output, /Gymnastics limiter rule/);
  assert.match(output, /Preserve the intended stimulus before chasing Rx/);
});

test("renders a course-style HTML CrossFit training checklist", () => {
  const output = run([
    "--goal",
    "general_fitness",
    "--equipment",
    "home",
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
  assert.match(output, /CrossFit Daily Training Checklist/);
  assert.match(output, /General fitness \/ 综合体能/);
  assert.match(output, /Intended Stimulus/);
  assert.match(output, /Scaling Path/);
  assert.match(output, /Mechanics, Consistency, Intensity/);
  assert.match(output, /class="session-card"/);
});

test("writes CrossFit HTML visualization to an output file", () => {
  const outputPath = "/tmp/crossfit-html-render-test.html";
  rmSync(outputPath, { force: true });

  const output = run([
    "--goal",
    "general_fitness",
    "--equipment",
    "home",
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

  assert.match(output, /Wrote \/tmp\/crossfit-html-render-test\.html/);
  assert.match(html, /<!doctype html>/);
  assert.match(html, /class="session-card"/);
  assert.match(html, /General fitness \/ 综合体能/);
  assert.match(html, /Source Anchors/);
});

test("lists CrossFit training asset categories for agent retrieval", () => {
  const output = run(["--list-assets"]);

  assert.match(output, /CrossFit training asset registry/);
  assert.match(output, /Xiaohongshu status \/ 小红书状态: /);
  assert.match(output, /stable query `CrossFit Scale 阿蛋` returned 22 results/);
  assert.match(output, /Official CrossFit methodology \/ 官方 CrossFit 方法论: 10/);
  assert.match(output, /Chinese creator notes \/ 中文创作者笔记: 22/);
  assert.match(output, /Professional and athlete video \/ 专业运动员与教练视频: 6/);
});

test("stores reproducible Xiaohongshu search evidence and extraction boundary", () => {
  const evidence = JSON.parse(readFileSync(xiaohongshuEvidencePath, "utf8"));
  const creatorNotes = evidence.results.filter((item) => item.author_user_id === evidence.profile.user_id);

  assert.equal(evidence.query, "CrossFit Scale 阿蛋");
  assert.equal(evidence.result_count, 22);
  assert.equal(creatorNotes.length, 12);
  assert.equal(evidence.detail_attempts.length, 3);
  assert.equal(evidence.detail_attempts[0].status, "failed");
  assert.match(evidence.detail_attempts[0].error, /noteDetailMap/);
  assert.ok(evidence.detail_attempts.some((attempt) => attempt.status === "login_redirect"));
  assert.ok(creatorNotes.some((item) => item.note_id === "69b01286000000002602f64d"));
});
