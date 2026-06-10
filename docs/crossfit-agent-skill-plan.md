# CrossFit Agent Skill Plan

Last verified: 2026-06-10

## Goal

Build a complete `skills/crossfit` workflow that generates daily CrossFit training plans with source-backed methodology, Chinese/English output, scaling paths, and practical safety rails.

## V1 Behavior

- Generate a daily checklist by `level + week + day`.
- Generate a daily checklist by `start-date + date`.
- Generate a seven-day checklist.
- Personalize by goal, equipment, experience, and limiter.
- Render Markdown, JSON, and course-style HTML.
- List training asset categories for agent retrieval.
- Preserve CrossFit class flow: warm-up, skill or strength, MetCon, cooldown, scaling path, readiness adjustment.

## Levels

- `beginner`: mechanics, consistency, simple scaling, low-skill mixed work.
- `recreational`: regular affiliate training, broad fitness, repeatable weekly rhythm.
- `competitive`: CrossFit Open or local competition prep, benchmark evidence, limiter-specific work.
- `advanced`: high-skill competitive pathway with coach oversight and recovery tracking.

## Phase Structure

- `foundation`: mechanics, consistency, easy engine, Scale habit.
- `build`: strength skill, gymnastics density, weightlifting technique, controlled intensity.
- `integration`: mixed-modal fatigue, movement economy, pacing, benchmark-style formats.
- `benchmark`: selected testing, deload, and next-cycle feedback.

## Source Translation Into Training Logic

Official CrossFit sources define the training spine:

- Constantly varied functional movements performed at high intensity.
- Mechanics, consistency, intensity.
- Structured variation across monostructural, gymnastics, and weightlifting domains.
- Benchmark and WOD formats should preserve intended stimulus.

The Chinese creator-note layer shapes the user-facing coaching:

- Explain Scale as stimulus preservation.
- Distinguish structured variance from random fatigue.
- Surface movement economy and breathing as training skills.
- Use limiter diagnosis before adding accessory volume.
- Use stable rhythm and technical positions as completion standards.

Professional video sources shape examples and references:

- Official CrossFit channels for standards and movement context.
- Mayhem, PRVN, Invictus, and Training Think Tank for public coach/athlete discussion, strategy, and limiter framing.

## Implementation Files

- `skills/crossfit/SKILL.md`
- `data/crossfit/training-assets.json`
- `data/crossfit/training-taxonomy.json`
- `data/crossfit/training-program.json`
- `data/crossfit/xiaohongshu-search-evidence.json`
- `docs/crossfit-xiaohongshu-analysis.md`
- `docs/crossfit-overseas-source-analysis.md`
- `src/crossfit/assets.mjs`
- `src/crossfit/profile.mjs`
- `src/crossfit/html-renderer.mjs`
- `scripts/crossfit-day-plan.mjs`
- `scripts/crossfit-day-plan.test.mjs`

## Verification

Required local checks:

```bash
node --test scripts/crossfit-day-plan.test.mjs
node scripts/crossfit-day-plan.mjs --level recreational --week 1 --day wednesday
node scripts/crossfit-day-plan.mjs --goal open_prep --equipment affiliate --experience veteran --limiter gymnastics --start-date 2026-06-10 --date 2026-06-10 --format html --output /tmp/crossfit-plan.html
node scripts/crossfit-day-plan.mjs --list-assets
```

Before claiming completion, also re-run existing HYROX tests to confirm the copied architecture did not regress.
