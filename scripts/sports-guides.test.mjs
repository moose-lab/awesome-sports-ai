import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (path) => readFileSync(join(root, path), "utf8");

const guidePaths = [
  "docs/sports/README.md",
  "docs/sports/basketball.md",
  "docs/sports/football.md",
  "docs/sports/hyrox.md",
  "docs/sports/running.md",
];

const guideContracts = [
  {
    path: "docs/sports/basketball.md",
    slug: "basketball",
    route: "/sports/basketball",
    scenarios: [
      "Spacing and Gravity Analysis",
      "Player and Game Data Workflows",
      "Video Tracking and Possession Review",
      "Shot Selection and Lineup Insight",
    ],
  },
  {
    path: "docs/sports/hyrox.md",
    slug: "hyrox",
    route: "/sports/hyrox",
    scenarios: [
      "Event Operations (赛事运营)",
      "Training Plan Generation (训练计划生成)",
      "Station Split Analysis (站点分拆分析)",
      "Movement Standard Verification (动作标准验证)",
    ],
  },
  {
    path: "docs/sports/football.md",
    slug: "football",
    route: "/sports/football",
    scenarios: [
      "Match Intelligence and Tactical Reporting",
      "Scouting Board and Player Reports",
      "Video Review and Event Alignment",
      "Shot Quality and Decision Support",
    ],
  },
  {
    path: "docs/sports/running.md",
    slug: "running",
    route: "/sports/running",
    scenarios: [
      "Training Load Monitoring (训练负荷监控)",
      "Pace and Route Analysis (配速与路线分析)",
      "Posture and Biomechanics (姿态与生物力学)",
    ],
  },
];

const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

test("sports scenario guide directory publishes the required files", () => {
  guidePaths.forEach((path) => {
    assert.equal(existsSync(join(root, path)), true, `${path} must exist`);
  });
});

test("sports index explains the two-axis architecture and contribution workflow", () => {
  const index = read("docs/sports/README.md");

  assert.match(index, /## Two-Axis Architecture/);
  assert.match(index, /Sport scenario axis/);
  assert.match(index, /Resource-type axis/);
  assert.match(index, /\[`data\/catalog\.json`\]\(\.\.\/\.\.\/data\/catalog\.json\)/);
  assert.match(index, /Scene first, not tool first/);
  assert.match(index, /Cross-domain tools are explicit/);
  assert.match(index, /Gaps become the prototype roadmap/);
  assert.match(index, /## How to Add a Sport/);
  assert.match(index, /Do not edit the root `README\.md`/);
  assert.match(index, /## Sports AI Hub Sync Contract/);
  assert.match(index, /Guide Metadata/);
  assert.match(index, /level-two scenario heading/);

  guideContracts.forEach((guide) => {
    assert.match(index, new RegExp(`\\[${guide.slug}\\.md\\]\\(${guide.slug}\\.md\\)`));
    assert.match(index, new RegExp(escapeRegExp(guide.route)));
  });
});

test("each sport guide keeps the scene-first template and prototype roadmap", () => {
  guideContracts.forEach((guide) => {
    const markdown = read(guide.path);

    assert.match(markdown, /## Guide Metadata/);
    assert.match(markdown, new RegExp(`\\| Slug \\| ${escapeRegExp(guide.slug)} \\|`));
    assert.match(markdown, new RegExp(escapeRegExp(guide.route)));
    assert.match(markdown, /\*\(Cross-domain\)\*/);
    assert.match(markdown, /## Cross-Domain Patterns to Study/);
    assert.match(markdown, /## Gaps: Tools Yet to be Built/);
    assert.match(markdown, /\/prototypes/);

    guide.scenarios.forEach((scenario) => {
      assert.match(markdown, new RegExp(`^## ${escapeRegExp(scenario)}$`, "m"));
    });
  });
});

test("root README sports-guide links point only to existing sport-guide pages", () => {
  const readme = read("README.md");
  const sportsLinks = [...readme.matchAll(/\]\((docs\/sports\/[^)#]+|docs\/sports\/)\)/g)].map((match) => match[1]);

  assert.ok(sportsLinks.length >= 5, "README should expose the sports guide index and examples");
  assert.match(readme, /docs\/sports\/basketball\.md/);

  sportsLinks.forEach((href) => {
    const path = href.endsWith("/") ? `${href}README.md` : href;
    assert.equal(existsSync(join(root, normalize(path))), true, `${href} must resolve locally`);
  });
});
