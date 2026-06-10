import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const programPath = join(root, "data", "hyrox", "training-program.json");
const assetsPath = join(root, "data", "hyrox", "training-assets.json");

const program = JSON.parse(readFileSync(programPath, "utf8"));
const assets = JSON.parse(readFileSync(assetsPath, "utf8"));

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
  casual: "入门完赛组",
  recreational: "休闲公开组",
  competitive: "年龄组竞争组",
  elite: "精英路径组"
};

const zhPhaseLabels = {
  foundation: "基础期",
  build: "建设期",
  specific: "专项期",
  peak: "峰值与减量期"
};

const zhTypeLabels = {
  recovery: "恢复",
  aerobic: "有氧",
  strength: "力量",
  "aerobic intervals": "有氧间歇",
  rest: "休息",
  "hyrox brick": "HYROX 组合训练",
  "long aerobic": "长有氧",
  "run quality": "跑步质量课",
  "strength endurance": "力量耐力",
  "recovery aerobic": "恢复有氧",
  "hyrox strength circuit": "HYROX 力量循环",
  "station endurance": "站点耐力",
  simulation: "模拟训练",
  "light strength": "轻力量",
  "easy aerobic": "轻松有氧",
  primer: "赛前激活"
};

const zhTitles = {
  "Reset mobility and aerobic walk": "重置活动度与轻松有氧走",
  "Easy run plus movement standards": "轻松跑与动作标准",
  "Strength base: squat, hinge, push, pull, carry": "基础力量：深蹲、髋铰链、推、拉、负重行走",
  "Erg aerobic intervals": "划船机/滑雪机有氧间歇",
  "Rest or easy mobility": "休息或轻松活动度",
  "Intro compromised running": "受干扰跑入门",
  "Long easy aerobic": "长时间轻松有氧",
  "Rest and readiness check": "休息与状态检查",
  "Threshold 1 km rhythm": "阈值 1 公里节奏",
  "Sled and lower-body strength endurance": "雪橇与下肢力量耐力",
  "Easy run and erg technique": "轻松跑与器械技术",
  "Station density circuit": "站点密度循环",
  "Compromised run builder": "受干扰跑建设课",
  "Long easy plus mobility": "长有氧与活动度",
  "Recovery and race-standard audit": "恢复与比赛标准检查",
  "Race-pace 1 km repeats": "比赛配速 1 公里重复",
  "Race-load station endurance": "比赛负重站点耐力",
  "Easy aerobic and mobility": "轻松有氧与活动度",
  "Controlled HYROX brick": "可控 HYROX 组合课",
  "Long aerobic or full simulation slot": "长有氧或完整模拟窗口",
  "Rest and recovery score": "休息与恢复评分",
  "Rest and taper check": "休息与减量检查",
  "Race-pace sharpening": "比赛配速锐化",
  "Light strength and standards": "轻力量与动作标准",
  "Easy aerobic with strides": "轻松有氧加放松加速跑",
  "Rest, race logistics, and fueling": "休息、比赛后勤与补给",
  "Race primer or race day": "赛前激活或比赛日",
  "Post-race recovery or full rest": "赛后恢复或完全休息"
};

const itemTranslations = {
  "5 min nasal walk": "鼻呼吸步行 5 分钟",
  "Ankles, hips, thoracic spine, wrists": "活动脚踝、髋、胸椎和手腕",
  "Easy walk, bike, or jog in conversational effort": "轻松步行、骑车或慢跑，保持可对话强度",
  "10 min station-standard review: squat depth, lunge step, wall-ball target line": "10 分钟站点标准复盘：深蹲深度、弓步步幅、墙球目标线",
  "5 min breathing downshift": "5 分钟降速呼吸",
  "Light calves, quads, hip flexors": "轻柔放松小腿、股四头肌和髋屈肌",
  "If Sunday left soreness above 6/10, make today mobility only.": "如果周日后酸痛超过 6/10，今天只做活动度",
  "Elite athletes may add an easy second aerobic session only if sleep and soreness are good.": "精英运动员只有在睡眠和酸痛状态良好时才加第二次轻松有氧",
  "8 min easy jog or run-walk": "8 分钟轻松慢跑或跑走结合",
  "3 x 20 sec relaxed strides": "3 组 20 秒放松加速跑",
  "Easy run or run-walk": "轻松跑或跑走结合",
  "Then 3 rounds smooth: 10 air squats, 8 light kettlebell deadlifts, 6 inchworms": "随后顺畅完成 3 轮：10 次徒手深蹲、8 次轻壶铃硬拉、6 次毛毛虫爬行",
  "5 min walk": "步行 5 分钟",
  "Record average heart rate, RPE, and any niggles": "记录平均心率、主观强度 RPE 和任何不适",
  "Casual level may use 3 min jog / 2 min walk.": "入门组可以使用 3 分钟慢跑 / 2 分钟步行",
  "Do not chase pace yet; build repeatability.": "暂时不要追配速，先建立可重复性",
  "5 min row or SkiErg easy": "划船机或滑雪机轻松 5 分钟",
  "2 rounds: 8 lunges, 8 glute bridges, 8 scap push-ups": "2 轮：8 次弓步、8 次臀桥、8 次肩胛俯卧撑",
  "Goblet squat or front squat 3-5 x 6": "高脚杯深蹲或前蹲 3-5 组 x 6 次",
  "Romanian deadlift 3-5 x 6": "罗马尼亚硬拉 3-5 组 x 6 次",
  "Push-up or bench press 3-4 x 8": "俯卧撑或卧推 3-4 组 x 8 次",
  "Row or pull-up variation 3-4 x 8": "划船或引体变化动作 3-4 组 x 8 次",
  "Farmers carry 4-8 x 30 m": "农夫走 4-8 组 x 30 米",
  "Easy 5 min bike": "轻松骑车 5 分钟",
  "Forearm, lats, glutes": "放松前臂、背阔肌和臀部",
  "Casual level uses lighter loads and perfect reps.": "入门组使用更轻重量，优先保证动作完美",
  "Competitive and elite can finish with 4 x 20 m low sled push if technique is clean.": "竞争组和精英组如果技术稳定，可最后加 4 x 20 米轻雪橇推",
  "8 min easy row or SkiErg": "划船机或滑雪机轻松 8 分钟",
  "3 x 20 sec technique build": "3 组 20 秒技术递加强度",
  "6-10 x 2 min steady erg / 1 min easy": "6-10 组：2 分钟稳定器械输出 / 1 分钟轻松恢复",
  "Alternate row and SkiErg if both are available": "如果设备齐全，交替使用划船机和滑雪机",
  "5 min easy": "轻松 5 分钟",
  "Lat and hamstring mobility": "背阔肌和腘绳肌活动度",
  "Keep stroke mechanics smooth.": "保持划桨动作顺畅",
  "This builds aerobic work without adding running impact.": "这能增加有氧刺激，同时减少跑步冲击",
  "Easy walk": "轻松步行",
  "Mobility for calves, hips, thoracic spine, wrists": "小腿、髋、胸椎、手腕活动度",
  "Optional 15-25 min zone 1 bike": "可选 15-25 分钟 1 区骑车",
  "Sleep, hydration, and food check": "检查睡眠、补水和进食",
  "Do not turn today into conditioning.": "不要把今天变成体能课",
  "If resting heart rate is elevated, keep it complete rest.": "如果静息心率偏高，今天完全休息",
  "10 min easy run": "轻松跑 10 分钟",
  "Movement prep for lunges, burpees, carries": "弓步、波比和负重行走动作准备",
  "3-6 rounds: 400-800 m easy run, then one station skill at controlled effort": "3-6 轮：400-800 米轻松跑，然后完成一个站点技术动作，强度可控",
  "Rotate station skills: SkiErg, row, light carry, light sandbag lunge, wall-ball mechanics": "轮换站点技术：滑雪机、划船、轻负重行走、轻沙袋弓步、墙球技术",
  "10 min easy walk or bike": "轻松步行或骑车 10 分钟",
  "Write down which station disrupted running most": "记录哪个站点最影响后续跑步",
  "This is not a race simulation yet.": "这还不是比赛模拟",
  "Stop a station set before technique breaks.": "在动作变形前停止该组站点训练",
  "5-10 min walk/jog progression": "5-10 分钟步行到慢跑递进",
  "Continuous easy run, run-walk, bike, or mixed aerobic session": "连续轻松跑、跑走结合、骑车或混合有氧",
  "Keep the last 10 min as easy as the first 10 min": "最后 10 分钟要和前 10 分钟一样轻松",
  "Refuel with protein plus carbs": "补充蛋白质和碳水",
  "The goal is time on feet, not speed.": "目标是脚下时间，不是速度",
  "Casual athletes can split into two shorter walks.": "入门者可拆成两次更短的步行",
  "12 min easy jog": "轻松慢跑 12 分钟",
  "4 x 20 sec strides": "4 组 20 秒加速跑",
  "3-8 x 1 km at controlled threshold with 2 min easy jog or walk": "3-8 组 1 公里可控阈值跑，组间 2 分钟轻松慢跑或步行",
  "Finish with 2 sets of 15-30 wall balls or wall-ball substitutes": "最后完成 2 组 15-30 次墙球或墙球替代动作",
  "10 min easy jog or bike": "轻松慢跑或骑车 10 分钟",
  "Calf and quad reset": "重置小腿和股四头肌",
  "Casual athletes use 4 x 3 min instead of full 1 km repeats.": "入门者用 4 组 3 分钟替代完整 1 公里重复",
  "Elite athletes may add a second easy aerobic session later in the day.": "精英者可在当天稍晚增加第二次轻松有氧"
};

const sessionFocus = {
  "Reset mobility and aerobic walk": {
    goal: {
      en: "Restore range of motion, keep blood flow high, and prepare joints for the next quality session.",
      zh: "恢复关节活动范围，维持血流，让身体为下一次质量训练做好准备。"
    },
    target: {
      en: "Finish looser than you started, with soreness trending down and no breathing strain.",
      zh: "结束时应比开始更放松，酸痛下降，没有呼吸压力。"
    }
  },
  "Easy run plus movement standards": {
    goal: {
      en: "Build easy aerobic durability while rehearsing clean movement patterns for HYROX stations.",
      zh: "建立轻松有氧耐受，同时复习 HYROX 站点动作标准。"
    },
    target: {
      en: "Keep the run conversational and make every bodyweight rep look controlled.",
      zh: "跑步保持可对话强度，所有徒手动作都要稳定可控。"
    }
  },
  "Strength base: squat, hinge, push, pull, carry": {
    goal: {
      en: "Build the force-production patterns behind sleds, carries, lunges, wall balls, and posture under fatigue.",
      zh: "建立雪橇、负重行走、弓步、墙球以及疲劳姿态所需的基础发力模式。"
    },
    target: {
      en: "All work sets should finish with 2-3 reps in reserve; carries stay tall with quiet steps.",
      zh: "每个正式组保留 2-3 次余力；农夫走保持身体高、脚步稳定。"
    }
  },
  "Erg aerobic intervals": {
    goal: {
      en: "Accumulate low-impact aerobic volume and sharpen row/SkiErg rhythm without adding run impact.",
      zh: "用低冲击方式累积有氧容量，并优化划船机/滑雪机节奏。"
    },
    target: {
      en: "Each interval should be steady, repeatable, and technically smoother than a race effort.",
      zh: "每组间歇都要稳定、可重复，技术质量高于比赛冲刺强度。"
    }
  },
  "Rest or easy mobility": {
    goal: {
      en: "Absorb the week, restore tissues, and protect the weekend HYROX brick.",
      zh: "吸收本周训练，恢复组织状态，并保护周末 HYROX 组合训练质量。"
    },
    target: {
      en: "Leave the session fresher, not fitter; no conditioning today.",
      zh: "结束时应更清爽，不是更累；今天不做体能刺激。"
    }
  },
  "Intro compromised running": {
    goal: {
      en: "Introduce running after station fatigue while keeping station skill clean and controlled.",
      zh: "开始练习站点疲劳后的跑步，同时保持站点动作干净可控。"
    },
    target: {
      en: "Post-station running should settle within 60-90 seconds without panic breathing.",
      zh: "站点后跑步应在 60-90 秒内重新稳定，不能出现失控喘息。"
    }
  },
  "Long easy aerobic": {
    goal: {
      en: "Build the aerobic base that supports 8 km of HYROX running and faster recovery between stations.",
      zh: "建立支撑 HYROX 8 公里跑和站点间恢复的有氧基础。"
    },
    target: {
      en: "Keep effort easy enough that the final 10 minutes are as controlled as the first 10.",
      zh: "强度要足够轻松，最后 10 分钟和前 10 分钟一样可控。"
    }
  },
  "Threshold 1 km rhythm": {
    goal: {
      en: "Build repeatable 1 km rhythm near threshold without turning every rep into a time trial.",
      zh: "建立接近阈值的可重复 1 公里节奏，而不是每组都全力测试。"
    },
    target: {
      en: "Last rep should be within 3-5 percent of the first rep with stable breathing.",
      zh: "最后一组与第一组差距控制在 3-5% 内，呼吸稳定。"
    }
  }
};

const blockPurposes = {
  warmup: {
    en: "Raise temperature, open key joints, and rehearse the first movement pattern.",
    zh: "提高体温，打开关键关节，预演第一个动作模式。"
  },
  main: {
    en: "Complete the prescribed work at the target intensity while protecting movement quality.",
    zh: "在目标强度内完成处方训练，同时保护动作质量。"
  },
  cooldown: {
    en: "Downshift breathing, reduce tone, and capture useful training feedback.",
    zh: "降低呼吸和肌肉紧张，记录有价值的训练反馈。"
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

function translateItem(item) {
  return itemTranslations[item] ?? "按英文处方执行，保持指定强度与动作质量";
}

function sessionObjective(session) {
  return sessionFocus[session.title] ?? {
    goal: {
      en: "Complete the session with the prescribed intensity, clean standards, and enough control to repeat training later this week.",
      zh: "按照规定强度和动作标准完成训练，并保留本周后续训练的恢复能力。"
    },
    target: {
      en: "No failed reps, no uncontrolled breathing, and no pain that changes mechanics.",
      zh: "不出现失败动作、不失控喘息、不出现改变动作模式的疼痛。"
    }
  };
}

function renderChecklistBlock(labelEn, labelZh, key, items) {
  return [
    `### ${labelEn} / ${labelZh}`,
    `Purpose / 目标: ${blockPurposes[key].en} / ${blockPurposes[key].zh}`,
    "Prescription / 具体安排:",
    ...items.map((item) => `- [ ] ${item} / ${translateItem(item)}`)
  ];
}

function renderChecklist(plan, options = {}) {
  const objective = sessionObjective(plan.session);
  const dateLabel = plan.date ? `${plan.date} · ` : "";
  const compact = options.compact ?? false;
  const lines = [
    `# HYROX Daily Training Checklist / HYROX 每日训练清单 - ${dateLabel}${titleCase(plan.day)} / ${zhDayNames[plan.day]}`,
    "",
    `Level / 水平: ${plan.level.label} / ${zhLevelLabels[plan.level_key]}`,
    `Week / 周期: Week ${plan.week} of ${plan.level.duration_weeks} / 第 ${plan.week} 周，共 ${plan.level.duration_weeks} 周`,
    `Phase / 阶段: ${plan.phase.label} / ${zhPhaseLabels[plan.phase_key]}`,
    `Session / 课程: ${plan.session.title} / ${zhTitles[plan.session.title] ?? "训练课"}`,
    `Type / 类型: ${plan.session.type} / ${zhTypeLabels[plan.session.type] ?? "训练"}`,
    `Duration / 时长: ${plan.duration_minutes} min / ${plan.duration_minutes} 分钟`,
    `Intensity / 强度: ${plan.session.intensity}`,
    "",
    "## Training Goal / 训练目标",
    `EN: ${objective.goal.en}`,
    `ZH: ${objective.goal.zh}`,
    "",
    "## Completion Target / 完成标准",
    `EN: ${objective.target.en}`,
    `ZH: ${objective.target.zh}`,
    "",
    "## Session Prescription / 训练安排",
    ...renderChecklistBlock("Warm-up", "热身", "warmup", plan.session.warmup),
    "",
    ...renderChecklistBlock("Main Work", "主训练", "main", plan.session.main),
    "",
    ...renderChecklistBlock("Cooldown", "放松", "cooldown", plan.session.cooldown),
    "",
    "## Coaching Constraints / 教练限制",
    ...plan.session.notes.map((item) => `- [ ] ${item} / ${translateItem(item)}`),
    "",
    "## Readiness Adjustment / 状态调整",
    "- Green / 绿色: do the plan as written. / 按计划执行。",
    "- Yellow / 黄色: reduce rounds, load, or distance by 20-30 percent. / 轮数、重量或距离减少 20-30%。",
    "- Red / 红色: stop hard work; use mobility/rest and seek qualified help for red-flag symptoms. / 停止高强度训练，改为活动度或休息；如有危险症状寻求专业帮助。"
  ];

  if (!compact) {
    lines.push(
      "",
      "## Source Anchors / 来源",
      `- Race format / 赛制: ${assets.official_reference[0].url}`,
      `- Official preparation / 官方备赛: ${assets.official_reference[3].url}`,
      `- Science basis / 科学依据: ${assets.science_and_methodology[0].url}`
    );
  }

  return `${lines.join("\n")}\n`;
}

function buildPlan(args) {
  const levelKey = args.level ?? "recreational";
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
    week: boundedWeek,
    day,
    date,
    phase_key: phaseKey,
    phase: program.phases[phaseKey],
    session,
    duration_minutes: session.duration_minutes[levelKey],
    race_day_notes: program.race_day_notes
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
  if (args.format && args.format !== "checklist") {
    throw new Error(`Unknown format: ${args.format}. Use checklist or basic.`);
  }
  return plans.map((plan) => renderChecklist(plan, { compact: plans.length > 1 })).join("\n---\n");
}

function usage() {
  return `Usage:
  node scripts/hyrox-day-plan.mjs --level recreational --week 6 --day tuesday
  node scripts/hyrox-day-plan.mjs --level casual --start-date 2026-06-10 --date 2026-06-24
  node scripts/hyrox-day-plan.mjs --level recreational --start-date 2026-06-10 --date 2026-06-10 --days 7
  node scripts/hyrox-day-plan.mjs --level recreational --week 6 --day tuesday --format basic
  node scripts/hyrox-day-plan.mjs --list-levels

Levels: ${Object.keys(program.levels).join(", ")}
Days: ${dayNames.join(", ")}
Formats: checklist, basic
`;
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(usage());
  } else if (args["list-levels"]) {
    process.stdout.write(`${listLevels()}\n`);
  } else {
    const plans = buildPlans(args);
    if (args.json) {
      process.stdout.write(`${JSON.stringify(plans.length === 1 ? plans[0] : { plans }, null, 2)}\n`);
    } else {
      process.stdout.write(renderPlans(plans, args));
    }
  }
} catch (error) {
  process.stderr.write(`${error.message}\n\n${usage()}`);
  process.exitCode = 1;
}
