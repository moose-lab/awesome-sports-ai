# HYROX Skill Architecture

Last updated: 2026-06-10

The HYROX skill is organized so future agents can add user profiles, race categories, readiness logic, benchmark targets, and new renderers without rewriting the whole CLI.

## File Organization

| Path | Role | Extension point |
| --- | --- | --- |
| `data/hyrox/training-assets.json` | Source registry for official HYROX, science, video, blog, and podcast assets | Add verified sources and source metadata |
| `data/hyrox/training-program.json` | Training phases, daily templates, safety rules, and weekly progression | Add new workouts, phases, and level-specific duration rules |
| `data/hyrox/event-taxonomy.json` | Registration divisions, sex/category labels, age groups, experience tracks, and division standards | Add new HYROX categories, age groups, adaptive classes, or season rule updates |
| `src/hyrox/assets.mjs` | Asset retrieval helpers for source summaries and plan source anchors | Add category filters, current-rule refresh checks, and recommendation logic |
| `src/hyrox/profile.mjs` | Resolves user inputs into a normalized athlete profile and inferred training level | Add profile scoring, PFT mapping, race-date taper logic, and equipment constraints |
| `src/hyrox/html-renderer.mjs` | Renders course-style HTML training checklists | Add dashboard, weekly calendar, mobile layout, print CSS, or share cards |
| `scripts/hyrox-day-plan.mjs` | Thin CLI entry point for plan generation and output routing | Add CLI flags only when they map to reusable profile or renderer behavior |
| `skills/hyrox/SKILL.md` | Agent-facing operating instructions | Update when new intake fields or output contracts are added |

## Profile Model

Current supported profile fields:

- `division`: `open`, `pro`, `doubles`, `relay`
- `sex`: `men`, `women`, `mixed`, `unknown`
- `age-group`: `16-24`, `25-29`, `30-34`, `35-39`, `40-44`, `45-49`, `50-54`, `55-59`, `60-64`, `65-69`, `70+`
- `experience`: `newcomer`, `recreational`, `veteran`, `elite`
- `level`: optional explicit override: `casual`, `recreational`, `competitive`, `elite`

Level inference:

- Newcomer defaults to `casual`.
- Open recreational defaults to `recreational`.
- Pro or veteran defaults to `competitive`.
- Elite experience defaults to `elite`.
- Explicit `--level` overrides inferred level after validation.

Age-band coaching:

- `16-24`: prioritize movement standards before adult race-volume chasing.
- `25-39`: use standard progression when sleep, soreness, and split quality are stable.
- `40-54`: add warm-up time and gate intensity against tendon/joint response.
- `55+`: protect two recovery touchpoints weekly and use lower-impact substitutions when joints are irritated.

## Output Contract

Every professional daily plan must include:

- User profile: division, sex/category, age group, and experience.
- Level, week, phase, session, duration, and intensity.
- Training Goal / 训练目标.
- Completion Target / 完成标准.
- Division Standard / 组别标准.
- Session Prescription / 训练安排.
- Coaching Constraints / 教练限制.
- Readiness Adjustment / 状态调整.
- Source Anchors / 来源.

The default CLI output is bilingual Markdown. `--format html` renders a course-style HTML view for faster scanning.

## Examples

Personalized Markdown:

```bash
node scripts/hyrox-day-plan.mjs \
  --division pro \
  --sex men \
  --age-group 30-34 \
  --experience veteran \
  --start-date 2026-06-10 \
  --date 2026-06-10
```

HTML visualization:

```bash
node scripts/hyrox-day-plan.mjs \
  --division open \
  --sex women \
  --age-group 25-29 \
  --experience newcomer \
  --start-date 2026-06-10 \
  --date 2026-06-10 \
  --format html \
  --output /tmp/hyrox-plan.html
```

Seven-day checklist:

```bash
node scripts/hyrox-day-plan.mjs \
  --division open \
  --sex women \
  --age-group 25-29 \
  --experience newcomer \
  --start-date 2026-06-10 \
  --date 2026-06-10 \
  --days 7
```

Asset registry summary:

```bash
node scripts/hyrox-day-plan.mjs --list-assets
```

## Next Extensions

- Add readiness inputs: sleep, soreness, resting heart rate, pain, and session completion.
- Add equipment access: sled, SkiErg, rower, wall-ball target, kettlebell, sandbag.
- Add PFT and race result benchmark schema.
- Add race-date taper placement.
- Add weekly calendar HTML and printable PDF-ready HTML.
