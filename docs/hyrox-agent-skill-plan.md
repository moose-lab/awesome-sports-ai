# HYROX Agent Skill Plan

This document turns the HYROX research into an implementable agent skill. The first slice is intentionally small: a user can ask for today's HYROX training and receive a level-aware daily plan grounded in structured data.

## Product Goal

Build a HYROX training skill that lets an AI agent answer:

- What should I train today?
- How should I scale today's session for my current level?
- What are today's movement-standard and recovery notes?
- How does this fit into my race prep cycle?
- When should I use a coach, gym, official rules, or updated rankings?

## User Levels

| Level | Weeks | Sessions/week | Target user | Success target |
| --- | ---: | --- | --- | --- |
| Casual starter | 12 | 3-4 | Desk-based starter, casual gamer, relay athlete, first-time Doubles/Open | Finish healthy and learn all stations |
| Recreational Open | 16 | 4-5 | Active gym user or runner | Strong Open finish with controlled pacing |
| Competitive age-group | 20 | 5-6 | Experienced hybrid athlete | Age-group competitiveness or first Pro attempt |
| Elite pathway | 24 | 7-10 | Advanced Pro-load racer with coach oversight | Qualification-oriented benchmarking |

## Training Architecture

The program uses four phases:

1. Foundation - aerobic base, movement literacy, strength base, and tissue tolerance.
2. Build - threshold running, station strength endurance, and compromised running.
3. Race specific - 1 km repeats under fatigue, transition practice, standards, simulations.
4. Peak and taper - reduce fatigue while keeping short race-pace exposures.

The science logic is:

- Running gets priority because HYROX has 8 km of running and current research shows most completion time is spent running.
- Station strength matters enough to meet division standards, but excess max-strength work is not the main limiter once standards are safe.
- Compromised running is mandatory because athletes must run after sleds, carries, lunges, ergs, and wall balls.
- HIIT and threshold work should be dosed carefully because the race sits in hard to very hard intensity ranges.
- Every fourth week should deload or reduce complexity when readiness drops.

## Current Implementation

Implemented in this branch:

- `data/hyrox/training-assets.json` - source registry.
- `data/hyrox/training-program.json` - phase and daily training data.
- `scripts/hyrox-day-plan.mjs` - no-dependency daily-plan renderer.
- `skills/hyrox/SKILL.md` - agent workflow for intake, planning, and daily response.

Example:

```bash
node scripts/hyrox-day-plan.mjs --level recreational --week 6 --day tuesday
```

Date-based query:

```bash
node scripts/hyrox-day-plan.mjs --level casual --start-date 2026-06-10 --date 2026-06-24
```

Seven-day bilingual checklist:

```bash
node scripts/hyrox-day-plan.mjs --level recreational --start-date 2026-06-10 --date 2026-06-10 --days 7
```

Earlier plain Markdown output is still available:

```bash
node scripts/hyrox-day-plan.mjs --level recreational --week 6 --day tuesday --format basic
```

## Why The First Output Felt Unprofessional

The earlier output had the right weekly intent but not enough workout prescription. It listed broad warm-up, main, cooldown, and notes, but it did not tell the athlete what each session should accomplish or what good execution looks like.

Specific gaps:

- No explicit daily training goal.
- No completion target or quality standard.
- No bilingual athlete-facing structure for English-native users who can also read Chinese.
- Too many broad ranges without context for intensity, rest, and success criteria.
- Coach notes were mixed with generic level comments instead of being framed as execution constraints.
- Weekly output had no course-style checklist shape like `Complete`, `Zone`, work/rest, rounds, and finisher blocks.

The professional output should therefore be a bilingual checklist: goal, completion target, warm-up prescription, main-work prescription, cooldown, coaching constraints, and green/yellow/red readiness adjustment.

## Agent Response Contract

Every daily-plan answer should include:

- Level, week, day, phase, and session name in English and Chinese.
- A clear training goal, not only a movement list.
- A completion target that tells the athlete what good execution means.
- Warm-up, main work, cooldown, duration, intensity, work/rest, and round structure where available.
- Coaching constraints specific to the session.
- Readiness adjustment: green/yellow/red rules.
- Source anchors only when useful; do not bury the user in links every day.

The default CLI output is now a bilingual checklist for English-native users who can read Chinese context. Use `--format basic` only for the earlier plain Markdown plan.

## Implementation Tasks

### Phase 1: Static Daily Plan

Acceptance criteria:

- [x] Agent can render a daily plan by level/week/day.
- [x] Agent can derive week/day from start date and target date.
- [x] Program data covers casual, recreational, competitive, and elite levels.
- [x] Default output uses a bilingual professional checklist.
- [x] Agent can render a seven-day checklist from a start date.
- [x] Tests cover checklist rendering, date derivation, invalid level handling, weekly output, and basic-format compatibility.

Verification:

- [x] `node --test scripts/*.test.mjs`

### Phase 2: User Profile and Calendar

Acceptance criteria:

- [ ] Store user profile fields: race date, division, sex/category, current 5 km time, PFT result, injury flags, equipment access, preferred training days, and time budget.
- [ ] Auto-select level from profile and allow explicit override.
- [ ] Generate a 7-day preview and today-only summary.
- [ ] Respect unavailable days and cap weekly hard sessions.

Verification:

- [ ] Add tests for profile-to-level mapping.
- [ ] Add tests for race-date taper placement.

### Phase 3: Adaptive Readiness

Acceptance criteria:

- [ ] Accept readiness inputs: sleep, soreness, resting heart rate trend, motivation, pain, and prior session completion.
- [ ] Downshift sessions when readiness is poor.
- [ ] Suggest substitutions when equipment is missing.
- [ ] Flag red-light symptoms.

Verification:

- [ ] Add tests for readiness downshift.
- [ ] Add tests for equipment substitutions.

### Phase 4: Performance Benchmarks

Acceptance criteria:

- [ ] Add PFT, 5 km, 10 km, 1 km repeat, SkiErg, row, wall-ball, sled, carry, and lunge benchmark schema.
- [ ] Compute realistic race targets from official results and user history.
- [ ] Separate Open, Pro, Doubles, Relay, and Elite pathway advice.

Verification:

- [ ] Add benchmark parser tests.
- [ ] Add target sanity checks against historical result ranges.

## Risk Controls

- Rules drift: refresh official rulebook and weights before rule answers.
- Rankings drift: refresh Elite 15 and results pages before current competitive claims.
- Injury risk: never progress intensity and volume when pain or readiness says stop.
- Copyright risk: summarize paid or proprietary programs; do not reproduce them.
- False precision: present race-time estimates as ranges until the user has recent benchmarks.
