# HYROX Professional Training Assets

Last verified: 2026-06-10

This is the working source map for the `app/hyrox` branch. It collects official HYROX race references, training infrastructure, science, videos, blogs, and podcasts that an AI agent can use to produce daily HYROX training plans without inventing the sport model.

## Operating Model

HYROX is a fixed-format indoor fitness race: 8 x 1 km running, each followed by one functional station. The fixed order is SkiErg, Sled Push, Sled Pull, Burpee Broad Jump, Row, Farmers Carry, Sandbag Lunges, and Wall Balls. The official page also lists Open, Pro, Doubles, and Relay divisions plus the current station weights and distances.

The training implication is simple: a plan must not train stations in isolation. It needs running volume, station strength endurance, compromised running, movement-standard practice, pacing, recovery, food, and hydration.

## Source Tiers

Tier 1: Official HYROX sources

- [HYROX - The Fitness Race](https://hyrox.com/the-fitness-race/) - Race format, station order, divisions, distances, and weights.
- [HYROX Rulebooks](https://hyrox.com/rulebook/) - Official rulebook hub for single, doubles, relay, adaptive, anti-doping, and TUE documents.
- [2025/2026 Singles Rulebook PDF](https://hyrox.com/wp-content/uploads/2025/07/25_26_HYROX_RulebookSingles_EN.pdf) - Exact season rules and Elite 15 qualification language.
- [HYROX Best Preparation](https://hyrox.com/best-hyrox-preparation/) - Official preparation notes on running, standards, pacing, rest, food, and hydration.
- [HYROX Training Club Finder](https://hyrox.com/find-gym/) - Certified gym discovery for equipment and coached standards.
- [HYROX Performance Coach Directory](https://coaches.hyrox.com/) - Certified coach handoff for individualized plans and elite prep.
- [HYROX Online Training Partners](https://hyrox.com/hyrox-online-training-partners/) - Official partner index across strength, running, mobility, and endurance.
- [HYROX Results and Rankings](https://hyroxresults.com/) - Results benchmarking by race, division, and age group.
- [HYROX PFT](https://pft.hyrox.com/) - Official fitness-test entry point.
- [HYROX Elite 15 Leaderboard](https://points.hyrox.com/) - Current elite benchmark context.

Tier 2: Science and health rails

- [Frontiers in Physiology - Acute physiological responses and performance determinants in Hyrox](https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2025.1519240/full) - Supports the plan emphasis on aerobic capacity, endurance volume, HIIT, compromised running, and pacing.
- [ACSM Physical Activity Guidelines](https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/) - Baseline adult activity and strength minimums.
- [CDC Adult Physical Activity Guidelines](https://www.cdc.gov/physical-activity-basics/guidelines/adults.html) - General adult aerobic and muscle-strengthening baseline.

Tier 3: Video and technique sources

- [HYROX YouTube](https://www.youtube.com/@HYROXWORLD) - Race footage, athlete interviews, and official visual context.
- [Centr - Training for HYROX](https://centr.com/blog/show/33989/training-for-hyrox-everything-you-need-to-know) - Official equipment ecosystem guidance and practical station prep.
- [Concept2 SkiErg Technique](https://www.concept2.com/training/technique/skierg) - SkiErg mechanics.
- [Concept2 RowErg Technique](https://www.concept2.com/training/technique/rowing) - Row mechanics.

Tier 4: Blogs and training guides

- [Rox Lyfe - HYROX Training Plan Fundamentals](https://roxlyfe.com/hyrox-training-plan-fundamentals/) - Practical programming considerations from a HYROX-focused publication.
- [Runna - Ultimate Functional Fitness and HYROX Running Training Guide](https://support.runna.com/en/articles/6781532-the-ultimate-functional-fitness-and-hyrox-running-training-guide) - Running-specific progression from an official HYROX partner.
- [Centr x HYROX Training Partner Page](https://hyrox.com/training-partner/centr/) - HYROX-certified starter and accelerator program context.
- [PureGym - Free HYROX Training Plan](https://www.puregym.com/us/blog/hyrox-training-plan-a-free-workout-plan-to-get-hyrox-ready) - Public 12-week plan reference for accessibility and structure comparison.

Tier 5: Podcasts and media

- [Rox Lyfe - The HYROX Podcast](https://podcasts.apple.com/us/podcast/rox-lyfe-the-hyrox-podcast/id1648250425) - Athlete interviews, strategy, and expert coaching discussion.
- [Fitness Racing Podcast](https://podcasts.apple.com/gb/podcast/fitness-racing-podcast/id1606012623) - HYROX, DEKAFIT, and hybrid fitness racing news/interviews.
- [Hybrid Fitness Media](https://podcasts.apple.com/us/podcast/hybrid-fitness-media/id1685720261) - Race coverage, interviews, and analysis.
- [Race Brain Media](https://www.racebrain.media/) - Elite race analysis and data-driven commentary.
- [HYROX Rundown presented by Race Brain](https://open.spotify.com/show/62SiSBqkKt1Q1yOf8D2KnX) - HYROX-focused race commentary.
- [Hybrid Coaching Podcast](https://open.spotify.com/show/6qRPwW8T15oZpod4jSahc0) - Coach-led hybrid fitness discussion.

## Agent Data Files

- [training-assets.json](../data/hyrox/training-assets.json) stores the structured source registry.
- [training-program.json](../data/hyrox/training-program.json) stores levels, phase rules, weekly templates, safety rails, and race-day notes.
- [hyrox-day-plan.mjs](../scripts/hyrox-day-plan.mjs) renders a daily plan from level/week/day or from a start date.

## Maintenance Rules

- Re-check official HYROX rulebook and weights at the start of every season.
- Re-check online training partners quarterly because partner programs can change.
- Treat podcast and media sources as qualitative context, not official rules.
- When a user asks for rankings, event dates, or Elite 15 context, refresh live because those facts change during the season.
- Never copy paid training-plan content into this repo; cite and summarize only.
