# CrossFit Skill Architecture

Last verified: 2026-06-10

## Directory Layout

```text
data/crossfit/
  training-assets.json
  training-program.json
  training-taxonomy.json
  xiaohongshu-search-evidence.json

src/crossfit/
  assets.mjs
  html-renderer.mjs
  profile.mjs

scripts/
  crossfit-day-plan.mjs
  crossfit-day-plan.test.mjs

docs/
  crossfit-xiaohongshu-analysis.md
  crossfit-overseas-source-analysis.md
  crossfit-professional-training-assets.md
  crossfit-agent-skill-plan.md
  crossfit-skill-architecture.md

skills/crossfit/
  SKILL.md
```

## Data Responsibilities

`training-assets.json`

- Stores official CrossFit methodology references.
- Stores the Xiaohongshu profile, retrieval status, stable search metadata, and retrieved note-title themes.
- Stores public professional/athlete video sources.
- Stores safety/science anchors.

`xiaohongshu-search-evidence.json`

- Stores the stable Xiaohongshu MCP search snapshot used by the Chinese source analysis.
- Keeps note IDs, author IDs, interaction counts, theme labels, and failed detail-extraction attempts testable.
- Does not store full note bodies.

`training-taxonomy.json`

- Keeps profile dimensions out of renderer code.
- Defines goals: `general_fitness`, `affiliate_class`, `open_prep`, `competition`.
- Defines equipment contexts: `home`, `minimal`, `affiliate`, `full`.
- Defines experience defaults and limiter coaching.

`training-program.json`

- Defines levels and duration.
- Defines phase rules.
- Defines the weekly templates for each phase.
- Stores class-style sessions with warm-up, skill/strength, MetCon, cooldown, intended stimulus, scaling path, and notes.

## Runtime Modules

`assets.mjs`

- Flattens the source registry.
- Provides category summaries.
- Picks recommended source anchors for daily plans.

`profile.mjs`

- Resolves profile keys.
- Derives level when the user does not specify one.
- Renders bilingual profile lines.

`html-renderer.mjs`

- Renders a self-contained course-style HTML checklist.
- Keeps the visual output local and dependency-free.

`crossfit-day-plan.mjs`

- CLI entrypoint.
- Supports week/day, date-derived planning, multi-day output, JSON, basic Markdown, HTML, and asset listing.

## Extension Rules

- Add new source material to `training-assets.json` before using it in output.
- Add new profile dimensions to `training-taxonomy.json`, then resolve them in `profile.mjs`.
- Add new phase templates to `training-program.json` rather than hard-coding sessions in the renderer.
- Keep CrossFit programming source-backed: official methodology first, creator/coaching sources second, science/safety rails always present.
- Keep Xiaohongshu material summarized. Do not copy full creator text or imply full-note coverage unless detail extraction has been verified.
