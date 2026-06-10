import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const programPath = join(root, "data", "hyrox", "training-program.json");
const assetsPath = join(root, "data", "hyrox", "training-assets.json");

const program = JSON.parse(readFileSync(programPath, "utf8"));
const assets = JSON.parse(readFileSync(assetsPath, "utf8"));

const dayNames = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const titleCase = (value) => value.replaceAll("-", " ").replace(/\b\w/g, (char) => char.toUpperCase());

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (!value.startsWith("--")) {
      throw new Error(`Unexpected argument: ${value}`);
    }
    const key = value.slice(2);
    if (key === "json" || key === "list-levels" || key === "help") {
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
    const diffDays = Math.floor((target.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0)) / 86400000);
    if (diffDays < 0) {
      throw new Error("--date must be on or after --start-date");
    }
    return {
      week: Math.floor(diffDays / 7) + 1,
      day: dayNames[mondayIndex(target)]
    };
  }

  const week = args.week ? Number(args.week) : 1;
  if (!Number.isInteger(week) || week < 1) {
    throw new Error("--week must be a positive integer");
  }
  return {
    week: Math.min(week, level.duration_weeks),
    day: normalizeDay(args.day)
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

function renderMarkdown(plan) {
  const lines = [
    `# HYROX Daily Plan - ${titleCase(plan.day)}`,
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
    ...plan.session.warmup.map((item) => `- ${item}`),
    "",
    "## Main Work",
    ...plan.session.main.map((item) => `- ${item}`),
    "",
    "## Cooldown",
    ...plan.session.cooldown.map((item) => `- ${item}`),
    "",
    "## Coach Notes",
    ...plan.session.notes.map((item) => `- ${item}`),
    "",
    "## Safety",
    ...program.meta.safety.map((item) => `- ${item}`),
    "",
    "## Source Anchors",
    `- Race format: ${assets.official_reference[0].url}`,
    `- Official preparation: ${assets.official_reference[3].url}`,
    `- Science basis: ${assets.science_and_methodology[0].url}`
  ];
  return `${lines.join("\n")}\n`;
}

function buildPlan(args) {
  const levelKey = args.level ?? "recreational";
  const level = program.levels[levelKey];
  if (!level) {
    throw new Error(`Unknown level: ${levelKey}. Use one of: ${Object.keys(program.levels).join(", ")}`);
  }
  const { week, day } = deriveWeekAndDay(args, level);
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
    week: boundedWeek,
    day,
    phase_key: phaseKey,
    phase: program.phases[phaseKey],
    session,
    duration_minutes: session.duration_minutes[levelKey],
    race_day_notes: program.race_day_notes
  };
}

function usage() {
  return `Usage:
  node scripts/hyrox-day-plan.mjs --level recreational --week 6 --day tuesday
  node scripts/hyrox-day-plan.mjs --level casual --start-date 2026-06-10 --date 2026-06-24
  node scripts/hyrox-day-plan.mjs --list-levels

Levels: ${Object.keys(program.levels).join(", ")}
Days: ${dayNames.join(", ")}
`;
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(usage());
  } else if (args["list-levels"]) {
    process.stdout.write(`${listLevels()}\n`);
  } else {
    const plan = buildPlan(args);
    process.stdout.write(args.json ? `${JSON.stringify(plan, null, 2)}\n` : renderMarkdown(plan));
  }
} catch (error) {
  process.stderr.write(`${error.message}\n\n${usage()}`);
  process.exitCode = 1;
}
