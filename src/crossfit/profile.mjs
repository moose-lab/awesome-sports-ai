import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const taxonomy = JSON.parse(readFileSync(join(root, "data", "crossfit", "training-taxonomy.json"), "utf8"));

const levelRank = {
  beginner: 0,
  recreational: 1,
  competitive: 2,
  advanced: 3
};

const lower = (value) => (value ? String(value).toLowerCase() : undefined);

function requireKnown(collection, key, label) {
  if (!collection[key]) {
    throw new Error(`Unknown ${label}: ${key}. Use one of: ${Object.keys(collection).join(", ")}`);
  }
}

function strongestLevel(...levels) {
  return levels
    .filter(Boolean)
    .sort((a, b) => (levelRank[b] ?? 0) - (levelRank[a] ?? 0))[0] ?? "recreational";
}

function resolveLevel(args, goal, experience) {
  if (args.level) {
    return lower(args.level);
  }
  if (experience.default_level !== "recreational") {
    return strongestLevel(experience.default_level, goal.default_level);
  }
  return goal.default_level;
}

export function resolveAthleteProfile(args, levels) {
  const goalKey = lower(args.goal) ?? "general_fitness";
  const equipmentKey = lower(args.equipment) ?? "affiliate";
  const experienceKey = lower(args.experience) ?? "recreational";
  const limiterKey = lower(args.limiter) ?? "unknown";

  requireKnown(taxonomy.goals, goalKey, "goal");
  requireKnown(taxonomy.equipment, equipmentKey, "equipment");
  requireKnown(taxonomy.experience, experienceKey, "experience");
  requireKnown(taxonomy.limiters, limiterKey, "limiter");

  const goal = taxonomy.goals[goalKey];
  const equipment = taxonomy.equipment[equipmentKey];
  const experience = taxonomy.experience[experienceKey];
  const limiter = taxonomy.limiters[limiterKey];
  const levelKey = resolveLevel(args, goal, experience);
  requireKnown(levels, levelKey, "level");

  return {
    goal_key: goalKey,
    equipment_key: equipmentKey,
    experience_key: experienceKey,
    limiter_key: limiterKey,
    level_key: levelKey,
    label_en: goal.label_en,
    label_zh: goal.label_zh,
    equipment_label_en: equipment.label_en,
    equipment_label_zh: equipment.label_zh,
    experience_label_en: experience.label_en,
    experience_label_zh: experience.label_zh,
    limiter_label_en: limiter.label_en,
    limiter_label_zh: limiter.label_zh,
    coaching: [
      ...goal.coaching,
      ...equipment.coaching,
      ...experience.coaching,
      ...limiter.coaching
    ]
  };
}

export function renderProfileMarkdownLines(profile) {
  return [
    `Profile / 用户画像: ${profile.label_en} / ${profile.label_zh}`,
    `Equipment / 器械条件: ${profile.equipment_label_en} / ${profile.equipment_label_zh}`,
    `Experience / 经验: ${profile.experience_label_en} / ${profile.experience_label_zh}`,
    `Limiter / 当前短板: ${profile.limiter_label_en} / ${profile.limiter_label_zh}`
  ];
}

export function taxonomySummary() {
  return {
    goals: Object.keys(taxonomy.goals),
    equipment: Object.keys(taxonomy.equipment),
    experience: Object.keys(taxonomy.experience),
    limiters: Object.keys(taxonomy.limiters)
  };
}
