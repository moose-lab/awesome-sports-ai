---
name: crossfit
description: Generate level-aware CrossFit training guidance, daily plans, class-style WOD breakdowns, scaling paths, and source-backed preparation advice for beginners through competitive athletes.
---

# CrossFit Training Skill

Use this skill when the user asks for CrossFit training, today's CrossFit plan, class-style WOD design, CrossFit Open preparation, scaling, movement standards, limiter diagnosis, or progression from beginner to competitive CrossFit.

## Data Sources

Prefer local structured data first:

- `data/crossfit/training-assets.json`
- `data/crossfit/training-program.json`
- `data/crossfit/training-taxonomy.json`
- `src/crossfit/assets.mjs`
- `src/crossfit/profile.mjs`
- `src/crossfit/html-renderer.mjs`
- `scripts/crossfit-day-plan.mjs`

Refresh the public web when the user asks about current CrossFit Open workouts, current rulebooks, current CrossFit Games qualification, current athlete status, current affiliates, or anything that may have changed after the local `last_verified` date.

Use Xiaohongshu tools when the user asks to re-check the Chinese creator source. The current registry includes the user-provided `阿蛋CrossFit笔记` profile and searchable note-title themes, but full note-detail extraction was inconsistent, so do not present stored creator-note themes as verbatim article text.

## Intake

Ask for missing fields only when needed. For today's plan, use defaults and continue.

Useful profile fields:

- Start date or target date.
- Goal: general_fitness, affiliate_class, open_prep, competition, or unknown.
- Equipment: home, minimal, affiliate, full, or unknown.
- Experience: newcomer, recreational, veteran, or competitive.
- Level: beginner, recreational, competitive, or advanced.
- Current limiter: engine, strength, gymnastics, weightlifting, pacing, or unknown.
- Current benchmark scores: Fran, Cindy, Grace, 2k row, 5k run, back squat, clean, pull-ups, toes-to-bar, double-unders.
- Injury constraints or medical red flags.
- Weekly time budget and available days.

Default when unspecified:

- Level: recreational.
- Goal: general_fitness.
- Equipment: affiliate.
- Experience: recreational.
- Limiter: unknown.
- Week: 1.
- Day: current weekday.

## Daily Plan Workflow

1. Determine level, profile, and date context.
2. If the user provides `start_date` and `target_date`, derive the week/day.
3. Call:

```bash
node scripts/crossfit-day-plan.mjs --goal <general_fitness|affiliate_class|open_prep|competition> --equipment <home|minimal|affiliate|full> --experience <newcomer|recreational|veteran|competitive> --limiter <unknown|engine|strength|gymnastics|weightlifting|pacing> --week <week> --day <day>
```

or:

```bash
node scripts/crossfit-day-plan.mjs --level <level> --start-date <YYYY-MM-DD> --date <YYYY-MM-DD>
```

For a seven-day checklist, call:

```bash
node scripts/crossfit-day-plan.mjs --level <level> --start-date <YYYY-MM-DD> --date <YYYY-MM-DD> --days 7
```

For a course-style HTML visualization, call:

```bash
node scripts/crossfit-day-plan.mjs --goal <goal> --equipment <equipment> --experience <experience> --limiter <limiter> --start-date <YYYY-MM-DD> --date <YYYY-MM-DD> --format html --output /tmp/crossfit-plan.html
```

To inspect available training sources, call:

```bash
node scripts/crossfit-day-plan.mjs --list-assets
```

4. Preserve the bilingual checklist structure unless the user asks for a shorter answer.
5. Add readiness adjustment:
   - Green: do as written.
   - Yellow: reduce load, reps, or rounds by 20-30 percent.
   - Red: mobility/rest and seek qualified help for red-flag symptoms.
6. Include one source anchor when the answer depends on methodology, scaling, safety, or a current rule.

## Training Principles

- CrossFit plans must preserve intended stimulus. Scaling is not just lowering difficulty; it adjusts load, reps, range, skill, or time so the athlete gets the right training effect.
- Constantly varied does not mean random. Vary modal domains, time domains, loads, and skills deliberately.
- Mechanics, consistency, then intensity is the progression order, especially for newcomers and high-skill movements.
- Daily class flow should usually include warm-up, skill or strength, MetCon, cooldown, and a review note.
- Accessory work must solve a visible limiter; it should not add random fatigue.
- Movement economy and breathing are performance skills. Plans should teach pacing instead of only prescribing suffering.
- Competitive athletes need benchmark evidence and coach review before adding volume.
- Keep at least one true recovery/rest day in most weeks.

## Response Format

For daily plans, use bilingual English/Chinese output:

```markdown
**CrossFit Daily Training Checklist / CrossFit 每日训练清单**
Level / 水平: ...
Profile / 用户画像: ...
Equipment / 器械条件: ...
Experience / 经验: ...
Limiter / 当前短板: ...
Week / 周期: ...
Phase / 阶段: ...
Session / 课程: ...
Duration / 时长: ...
Intensity / 强度: ...

Training Goal / 训练目标:
- EN: ...
- ZH: ...

Intended Stimulus / 目标刺激:
- ...

Progression Standard / 进阶标准:
- ...

Session Prescription / 训练安排:
- ...

Scaling Path / Scale 路径:
- ...

Readiness Adjustment / 状态调整:
- ...

Source Anchors / 来源:
- ...
```

For broader plans, explain the phase structure, weekly rhythm, limiter checkpoints, scaling strategy, and exactly when to deload or taper.

## Safety

This skill is not medical advice. Stop the session and recommend qualified medical support for chest pain, fainting, acute injury, severe shortness of breath, sudden swelling, neurological symptoms, or pain that changes mechanics. For chronic conditions, pregnancy/postpartum, return from injury, high-skill gymnastics, or Olympic lifting uncertainty, recommend professional coaching or medical supervision.
