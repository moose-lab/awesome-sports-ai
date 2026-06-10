import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const taxonomy = JSON.parse(readFileSync(join(root, "data", "hyrox", "event-taxonomy.json"), "utf8"));

const lower = (value) => (value ? String(value).toLowerCase() : undefined);

function requireKnown(collection, key, label) {
  if (!collection[key]) {
    throw new Error(`Unknown ${label}: ${key}. Use one of: ${Object.keys(collection).join(", ")}`);
  }
}

function resolveLevel(args, division, experience) {
  if (args.level) {
    return args.level;
  }
  if (experience?.default_level === "elite") {
    return "elite";
  }
  if (division.default_level === "competitive" || experience?.default_level === "competitive") {
    return "competitive";
  }
  return experience?.default_level ?? division.default_level;
}

export function resolveAthleteProfile(args, levels) {
  const divisionKey = lower(args.division) ?? "open";
  const sexKey = lower(args.sex) ?? "unknown";
  const experienceKey = lower(args.experience) ?? "recreational";
  const ageGroup = args["age-group"] ?? args.ageGroup ?? "unspecified";

  requireKnown(taxonomy.divisions, divisionKey, "division");
  requireKnown(taxonomy.sexes, sexKey, "sex");
  requireKnown(taxonomy.experience, experienceKey, "experience");
  if (ageGroup !== "unspecified" && !taxonomy.age_groups.includes(ageGroup)) {
    throw new Error(`Unknown age group: ${ageGroup}. Use one of: ${taxonomy.age_groups.join(", ")}`);
  }

  const division = taxonomy.divisions[divisionKey];
  const sex = taxonomy.sexes[sexKey];
  const experience = taxonomy.experience[experienceKey];
  const levelKey = resolveLevel(args, division, experience);
  requireKnown(levels, levelKey, "level");

  const standards = division.standards[sexKey] ?? division.standards.unknown;
  const divisionLabelEn = sexKey === "unknown" ? division.label_en : `${sex.label_en} ${division.label_en}`;
  const divisionLabelZh = sexKey === "unknown" ? division.label_zh : `${sex.label_zh} ${division.label_zh}`;
  const proLoadExposure = divisionKey === "pro"
    ? [
        "Pro load exposure: keep station loads technical until split quality is stable.",
        "Pro 负重暴露：在分段质量稳定前，站点重量以技术质量为先。"
      ]
    : [];

  return {
    division_key: divisionKey,
    sex_key: sexKey,
    age_group: ageGroup,
    experience_key: experienceKey,
    level_key: levelKey,
    label_en: divisionLabelEn,
    label_zh: divisionLabelZh,
    division_label_en: division.label_en,
    division_label_zh: division.label_zh,
    sex_label_en: sex.label_en,
    sex_label_zh: sex.label_zh,
    experience_label_en: experience.label_en,
    experience_label_zh: experience.label_zh,
    standards,
    coaching: [...proLoadExposure, ...experience.coaching]
  };
}

export function renderProfileMarkdownLines(profile) {
  return [
    `Profile / 用户画像: ${profile.label_en} / ${profile.label_zh}`,
    `Age Group / 年龄组: ${profile.age_group}`,
    `Experience / 经验: ${profile.experience_label_en} / ${profile.experience_label_zh}`,
    `Division Standard / 组别标准: ${profile.standards[0]} / ${profile.standards[1]}`
  ];
}

export function taxonomySummary() {
  return {
    divisions: Object.keys(taxonomy.divisions),
    sexes: Object.keys(taxonomy.sexes),
    age_groups: taxonomy.age_groups,
    experience: Object.keys(taxonomy.experience)
  };
}
