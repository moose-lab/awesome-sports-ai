import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { recommendedSourceAnchors, renderAssetSummaryLines } from "../src/crossfit/assets.mjs";
import { renderHtmlDocument } from "../src/crossfit/html-renderer.mjs";
import { renderProfileMarkdownLines, resolveAthleteProfile, taxonomySummary } from "../src/crossfit/profile.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const programPath = join(root, "data", "crossfit", "training-program.json");

const program = JSON.parse(readFileSync(programPath, "utf8"));
const sourceAnchors = recommendedSourceAnchors();

const dayNames = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const zhDayNames = {
  monday: "星期一",
  tuesday: "星期二",
  wednesday: "星期三",
  thursday: "星期四",
  friday: "星期五",
  saturday: "星期六",
  sunday: "星期日"
};

const zhLevelLabels = {
  beginner: "入门基础组",
  recreational: "普通盒子组",
  competitive: "Open/比赛准备组",
  advanced: "高阶竞技路径组"
};

const zhPhaseLabels = {
  foundation: "基础期",
  build: "建设期",
  integration: "整合期",
  benchmark: "基准测试与减量期"
};

const zhPhasePurposes = {
  foundation: "建立动作机制、稳定性、轻松心肺能力和可靠的 Scale 习惯，再进入强度训练。",
  build: "增加力量技术、体操密度、举重技术和跨时间域的可控强度。",
  integration: "在疲劳下整合力量、技能和体能，同时保持动作经济性和配速。",
  benchmark: "锐化、测试选定基准，并降低疲劳，让进步可以被衡量。"
};

const zhTypeLabels = {
  recovery: "恢复",
  "recovery aerobic": "恢复有氧",
  "mechanics strength": "动作机制力量",
  "strength + metcon": "力量加 MetCon",
  engine: "心肺",
  rest: "休息",
  "mixed modal": "混合模式",
  "long easy": "长轻松有氧",
  "strength endurance": "力量耐力",
  "weightlifting + metcon": "举重加 MetCon",
  "engine intervals": "心肺间歇",
  accessory: "辅助训练",
  "benchmark style": "基准风格",
  "easy aerobic": "轻松有氧",
  "Open prep": "Open 备赛",
  "heavy + skill": "重训加技能",
  chipper: "长串训练",
  simulation: "模拟课",
  primer: "激活课",
  "light strength": "轻力量",
  test: "测试"
};

const zhTitles = {
  "Mechanics reset and easy engine": "动作机制重置与轻松心肺",
  "Squat, pull, press mechanics": "蹲、拉、推动作机制",
  "Strength skill plus short mixed-modal workout": "力量技术加短混合模式训练",
  "Monostructural pacing and breathing": "单一周期动作配速与呼吸",
  "Rest or mobility plus skill review": "休息或活动度加技能复盘",
  "Controlled class-style triplet": "可控课堂式三动作组合",
  "Easy aerobic base and weekly review": "轻松有氧基础与周复盘",
  "Recovery and limiter audit": "恢复与短板审计",
  "Strength plus gymnastics density": "力量加体操密度",
  "Weightlifting technique and short AMRAP": "举重技术与短 AMRAP",
  "Engine intervals and pace discipline": "心肺间歇与配速纪律",
  "Accessory that solves the limiter": "解决短板的辅助训练",
  "Benchmark-style mixed modal workout": "基准风格混合模式训练",
  "Long easy aerobic and fueling practice": "长轻松有氧与补给练习",
  "Recovery and benchmark review": "恢复与基准复盘",
  "Open-style couplet intervals": "Open 风格二动作间歇",
  "Heavy day plus skill EMOM": "重训日加技能 EMOM",
  "Chipper pacing and movement economy": "Chipper 配速与动作经济性",
  "Rest and tissue care": "休息与组织护理",
  "Full class simulation": "完整课堂模拟",
  "Easy aerobic and mobility": "轻松有氧与活动度",
  "Rest and benchmark selection": "休息与基准选择",
  "Benchmark primer": "基准激活",
  "Light strength and standards": "轻力量与动作标准",
  "Short engine sharpening": "短心肺锐化",
  "Rest and logistics": "休息与后勤",
  "Benchmark or Open-style test day": "基准或 Open 风格测试日",
  "Post-test recovery": "测试后恢复"
};

const blockPurposes = {
  warmup: {
    en: "Raise temperature, open the exact positions required today, and rehearse the first movement pattern.",
    zh: "提高体温，打开今天需要的位置，并预演第一个动作模式。"
  },
  skill_strength: {
    en: "Build mechanics or force production before fatigue makes feedback noisy.",
    zh: "在疲劳让反馈变杂前，建立动作机制或发力能力。"
  },
  metcon: {
    en: "Complete the conditioning work at the target stimulus while protecting movement quality.",
    zh: "在目标刺激内完成体能训练，同时保护动作质量。"
  },
  cooldown: {
    en: "Downshift breathing, reduce tone, and capture the useful training signal.",
    zh: "降低呼吸和肌肉紧张，并记录有价值的训练信号。"
  }
};

const titleCase = (value) => value.replaceAll("-", " ").replace(/\b\w/g, (char) => char.toUpperCase());

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (!value.startsWith("--")) {
      throw new Error(`Unexpected argument: ${value}`);
    }
    const key = value.slice(2);
    if (key === "json" || key === "list-levels" || key === "list-assets" || key === "help") {
      args[key] = true;
      continue;
    }
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }
    args[key] = next;
    index += 1;
  }
  return args;
}

function parseDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    throw new Error(`Invalid date: ${value}. Use YYYY-MM-DD.`);
  }
  const [, year, month, day] = match.map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function mondayIndex(date) {
  return (date.getDay() + 6) % 7;
}

function normalizeDay(value) {
  if (!value) {
    return dayNames[mondayIndex(new Date())];
  }
  const normalized = value.toLowerCase();
  if (/^\d+$/.test(normalized)) {
    const index = Number(normalized) - 1;
    if (index < 0 || index > 6) {
      throw new Error("--day must be 1-7 or a weekday name");
    }
    return dayNames[index];
  }
  const match = dayNames.find((day) => day.startsWith(normalized));
  if (!match) {
    throw new Error(`Unknown day: ${value}`);
  }
  return match;
}

function deriveWeekAndDay(args, level) {
  if (args["start-date"]) {
    const start = parseDate(args["start-date"]);
    const target = args.date ? parseDate(args.date) : new Date();
    const targetDay = mondayIndex(target);
    const diffDays = Math.floor((target.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0)) / 86400000);
    if (diffDays < 0) {
      throw new Error("--date must be on or after --start-date");
    }
    return {
      week: Math.floor(diffDays / 7) + 1,
      day: dayNames[targetDay],
      date: formatDate(target)
    };
  }

  const week = args.week ? Number(args.week) : 1;
  if (!Number.isInteger(week) || week < 1) {
    throw new Error("--week must be a positive integer");
  }
  return {
    week: Math.min(week, level.duration_weeks),
    day: normalizeDay(args.day),
    date: args.date
  };
}

function phaseFor(levelKey, week) {
  const rules = program.phase_rules[levelKey];
  const rule = rules.find((item) => week >= item.start_week && week <= item.end_week) ?? rules.at(-1);
  return rule.phase;
}

function listLevels() {
  return Object.entries(program.levels)
    .map(([key, level]) => `${key}: ${level.label} (${level.duration_weeks} weeks, ${level.weekly_sessions} sessions/week)`)
    .join("\n");
}

function itemText(item) {
  return `${item.en} / ${item.zh}`;
}

function renderItems(items) {
  return items.map((item) => `- [ ] ${itemText(item)}`);
}

function sourceLine(asset) {
  return asset.url
    ? `${asset.title} / ${asset.category_label}: ${asset.url}`
    : `${asset.title} / ${asset.category_label}`;
}

function sessionGoal(plan) {
  return {
    en: `${plan.phase.purpose} Today's priority is ${plan.session.modality}: ${plan.session.type}.`,
    zh: `${zhPhasePurposes[plan.phase_key]}今天优先处理 ${plan.session.modality}: ${zhTypeLabels[plan.session.type] ?? plan.session.type}。`
  };
}

function progressionStandard() {
  return "Mechanics, consistency, then intensity. / 先动作机制，再稳定性，最后才是强度。";
}

function renderChecklistBlock(labelEn, labelZh, key, items) {
  return [
    `### ${labelEn} / ${labelZh}`,
    `Purpose / 目标: ${blockPurposes[key].en} / ${blockPurposes[key].zh}`,
    "Prescription / 具体安排:",
    ...renderItems(items)
  ];
}

function coachingLines(profile) {
  return profile.coaching.map((item) => `- [ ] ${item.en} / ${item.zh}`);
}

function renderMarkdown(plan) {
  const lines = [
    `# CrossFit Daily Plan - ${titleCase(plan.day)}`,
    "",
    `Level: ${plan.level.label}`,
    `Week: ${plan.week} of ${plan.level.duration_weeks}`,
    `Phase: ${plan.phase.label}`,
    `Session: ${plan.session.title}`,
    `Type: ${plan.session.type}`,
    `Duration: ${plan.duration_minutes} min`,
    `Intensity: ${plan.session.intensity}`,
    "",
    "## Phase Purpose",
    plan.phase.purpose,
    "",
    "## Warm-up",
    ...plan.session.warmup.map((item) => `- ${item.en}`),
    "",
    "## Skill or Strength",
    ...plan.session.skill_strength.map((item) => `- ${item.en}`),
    "",
    "## MetCon",
    ...plan.session.metcon.map((item) => `- ${item.en}`),
    "",
    "## Cooldown",
    ...plan.session.cooldown.map((item) => `- ${item.en}`),
    "",
    "## Intended Stimulus",
    plan.session.intended_stimulus.en,
    "",
    "## Scaling Path",
    ...plan.session.scaling_path.map((item) => `- ${item.en}`),
    "",
    "## Source Anchors",
    ...sourceAnchors.slice(0, 3).map((asset) => `- ${asset.title}: ${asset.url ?? "Xiaohongshu MCP title evidence"}`)
  ];
  return `${lines.join("\n")}\n`;
}

function displayPlan(plan) {
  const goal = sessionGoal(plan);
  const dateLabel = plan.date ? `${plan.date} · ` : "";
  return {
    dateLine: `${dateLabel}${titleCase(plan.day)} / ${zhDayNames[plan.day]}`,
    sessionTitle: `${plan.session.title} / ${zhTitles[plan.session.title] ?? "训练课"}`,
    profileLine: `${plan.profile.label_en} / ${plan.profile.label_zh}`,
    equipmentLine: `Equipment / 器械条件: ${plan.profile.equipment_label_en} / ${plan.profile.equipment_label_zh}`,
    experienceLine: `Experience / 经验: ${plan.profile.experience_label_en} / ${plan.profile.experience_label_zh}`,
    limiterLine: `Limiter / 当前短板: ${plan.profile.limiter_label_en} / ${plan.profile.limiter_label_zh}`,
    phaseLine: `Phase / 阶段: ${plan.phase.label} / ${zhPhaseLabels[plan.phase_key]}`,
    durationLine: `Duration / 时长: ${plan.duration_minutes} min / ${plan.duration_minutes} 分钟`,
    intensityLine: `Intensity / 强度: ${plan.session.intensity}`,
    progressionStandard: progressionStandard(),
    goal,
    intendedStimulus: plan.session.intended_stimulus,
    blocks: [
      {
        title: "Warm-up / 热身",
        purpose: `${blockPurposes.warmup.en} / ${blockPurposes.warmup.zh}`,
        items: plan.session.warmup.map(itemText)
      },
      {
        title: "Skill or Strength / 技能或力量",
        purpose: `${blockPurposes.skill_strength.en} / ${blockPurposes.skill_strength.zh}`,
        items: plan.session.skill_strength.map(itemText)
      },
      {
        title: "MetCon / 体能主训练",
        purpose: `${blockPurposes.metcon.en} / ${blockPurposes.metcon.zh}`,
        items: plan.session.metcon.map(itemText)
      },
      {
        title: "Cooldown / 放松",
        purpose: `${blockPurposes.cooldown.en} / ${blockPurposes.cooldown.zh}`,
        items: plan.session.cooldown.map(itemText)
      }
    ],
    scalingPath: plan.session.scaling_path.map(itemText),
    constraints: [...plan.profile.coaching.map(itemText), ...plan.session.notes.map(itemText)],
    sources: sourceAnchors.map(sourceLine)
  };
}

function renderChecklist(plan, options = {}) {
  const goal = sessionGoal(plan);
  const dateLabel = plan.date ? `${plan.date} · ` : "";
  const compact = options.compact ?? false;
  const lines = [
    `# CrossFit Daily Training Checklist / CrossFit 每日训练清单 - ${dateLabel}${titleCase(plan.day)} / ${zhDayNames[plan.day]}`,
    "",
    `Level / 水平: ${plan.level.label} / ${zhLevelLabels[plan.level_key]}`,
    ...renderProfileMarkdownLines(plan.profile),
    `Week / 周期: Week ${plan.week} of ${plan.level.duration_weeks} / 第 ${plan.week} 周，共 ${plan.level.duration_weeks} 周`,
    `Phase / 阶段: ${plan.phase.label} / ${zhPhaseLabels[plan.phase_key]}`,
    `Session / 课程: ${plan.session.title} / ${zhTitles[plan.session.title] ?? "训练课"}`,
    `Type / 类型: ${plan.session.type} / ${zhTypeLabels[plan.session.type] ?? "训练"}`,
    `Modality / 模式: ${plan.session.modality}`,
    `Duration / 时长: ${plan.duration_minutes} min / ${plan.duration_minutes} 分钟`,
    `Intensity / 强度: ${plan.session.intensity}`,
    "",
    "## Training Goal / 训练目标",
    `EN: ${goal.en}`,
    `ZH: ${goal.zh}`,
    "",
    "## Intended Stimulus / 目标刺激",
    `EN: ${plan.session.intended_stimulus.en}`,
    `ZH: ${plan.session.intended_stimulus.zh}`,
    "",
    "## Progression Standard / 进阶标准",
    progressionStandard(),
    "",
    "## Session Prescription / 训练安排",
    ...renderChecklistBlock("Warm-up", "热身", "warmup", plan.session.warmup),
    "",
    ...renderChecklistBlock("Skill or Strength", "技能或力量", "skill_strength", plan.session.skill_strength),
    "",
    ...renderChecklistBlock("MetCon", "体能主训练", "metcon", plan.session.metcon),
    "",
    ...renderChecklistBlock("Cooldown", "放松", "cooldown", plan.session.cooldown),
    "",
    "## Scaling Path / Scale 路径",
    ...renderItems(plan.session.scaling_path),
    "",
    "## Coaching Constraints / 教练限制",
    ...coachingLines(plan.profile),
    ...renderItems(plan.session.notes),
    "",
    "## Readiness Adjustment / 状态调整",
    "- Green / 绿色: do the plan as written. / 按计划执行。",
    "- Yellow / 黄色: reduce load, reps, or rounds by 20-30 percent. / 重量、次数或轮数减少 20-30%。",
    "- Red / 红色: stop hard work; use mobility/rest and seek qualified help for red-flag symptoms. / 停止高强度训练，改为活动度或休息；如有危险症状寻求专业帮助。"
  ];

  if (!compact) {
    lines.push(
      "",
      "## Source Anchors / 来源",
      ...sourceAnchors.slice(0, 4).map((asset) => `- ${sourceLine(asset)}`)
    );
  }

  return `${lines.join("\n")}\n`;
}

function buildPlan(args) {
  const profile = resolveAthleteProfile(args, program.levels);
  const levelKey = profile.level_key;
  const level = program.levels[levelKey];
  if (!level) {
    throw new Error(`Unknown level: ${levelKey}. Use one of: ${Object.keys(program.levels).join(", ")}`);
  }
  const { week, day, date } = deriveWeekAndDay(args, level);
  const boundedWeek = Math.min(week, level.duration_weeks);
  const phaseKey = phaseFor(levelKey, boundedWeek);
  const session = program.weekly_templates[phaseKey][day];
  if (!session) {
    throw new Error(`No session for ${phaseKey}/${day}`);
  }
  return {
    generated_at: new Date().toISOString(),
    level_key: levelKey,
    level,
    profile,
    week: boundedWeek,
    day,
    date,
    phase_key: phaseKey,
    phase: program.phases[phaseKey],
    session,
    duration_minutes: session.duration_minutes[levelKey],
    safety: program.meta.safety
  };
}

function buildPlans(args) {
  const days = args.days ? Number(args.days) : 1;
  if (!Number.isInteger(days) || days < 1 || days > 31) {
    throw new Error("--days must be an integer from 1 to 31");
  }
  if (days === 1) {
    return [buildPlan(args)];
  }
  if (!args["start-date"]) {
    throw new Error("--days requires --start-date so the training week can be derived");
  }

  const first = args.date ? parseDate(args.date) : new Date();
  return Array.from({ length: days }, (_, index) => {
    const date = new Date(first);
    date.setDate(first.getDate() + index);
    return buildPlan({ ...args, date: formatDate(date), days: undefined });
  });
}

function renderPlans(plans, args) {
  if ((args.format ?? "checklist") === "basic") {
    return plans.map((plan) => renderMarkdown(plan)).join("\n---\n");
  }
  if (args.format === "html") {
    return renderHtmlDocument(plans.map(displayPlan));
  }
  if (args.format && args.format !== "checklist") {
    throw new Error(`Unknown format: ${args.format}. Use checklist, basic, or html.`);
  }
  return plans.map((plan) => renderChecklist(plan, { compact: plans.length > 1 })).join("\n---\n");
}

function usage() {
  const taxonomy = taxonomySummary();
  return `Usage:
  node scripts/crossfit-day-plan.mjs --level recreational --week 1 --day wednesday
  node scripts/crossfit-day-plan.mjs --level beginner --start-date 2026-06-10 --date 2026-06-24
  node scripts/crossfit-day-plan.mjs --level recreational --start-date 2026-06-10 --date 2026-06-10 --days 7
  node scripts/crossfit-day-plan.mjs --goal open_prep --equipment affiliate --experience veteran --limiter gymnastics --format html --output /tmp/crossfit-plan.html
  node scripts/crossfit-day-plan.mjs --list-assets
  node scripts/crossfit-day-plan.mjs --list-levels

Levels: ${Object.keys(program.levels).join(", ")}
Days: ${dayNames.join(", ")}
Goals: ${taxonomy.goals.join(", ")}
Equipment: ${taxonomy.equipment.join(", ")}
Experience: ${taxonomy.experience.join(", ")}
Limiters: ${taxonomy.limiters.join(", ")}
Formats: checklist, basic, html
`;
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(usage());
  } else if (args["list-levels"]) {
    process.stdout.write(`${listLevels()}\n`);
  } else if (args["list-assets"]) {
    process.stdout.write(`${renderAssetSummaryLines().join("\n")}\n`);
  } else {
    const plans = buildPlans(args);
    if (args.json) {
      const rendered = `${JSON.stringify(plans.length === 1 ? plans[0] : { plans }, null, 2)}\n`;
      if (args.output) {
        writeFileSync(args.output, rendered);
        process.stdout.write(`Wrote ${args.output}\n`);
      } else {
        process.stdout.write(rendered);
      }
    } else {
      const rendered = renderPlans(plans, args);
      if (args.output) {
        writeFileSync(args.output, rendered);
        process.stdout.write(`Wrote ${args.output}\n`);
      } else {
        process.stdout.write(rendered);
      }
    }
  }
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
}
