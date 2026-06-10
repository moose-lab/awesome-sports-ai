# CrossFit Professional Training Assets

Last verified: 2026-06-10

This is the working source map for the `app/crossfit` branch. It combines official CrossFit methodology, the user-supplied Xiaohongshu profile, public professional/athlete video sources, and safety references into a practical agent skill for daily CrossFit training plans.

## Operating Model

CrossFit is built around constantly varied functional movements performed at high intensity. For planning, that does not mean random fatigue. A useful daily plan needs a clear intended stimulus, a scaling path, movement standards, structured variation across monostructural/gymnastics/weightlifting domains, and enough recovery to let the athlete train again.

The agent should produce class-style training: warm-up, skill or strength, MetCon, cooldown, scaling path, readiness adjustment, and one practical review note.

Detailed analysis files:

- [CrossFit Xiaohongshu analysis](crossfit-xiaohongshu-analysis.md)
- [CrossFit overseas source analysis](crossfit-overseas-source-analysis.md)

## Chinese Creator Source

Primary profile:

- [阿蛋CrossFit笔记](https://www.xiaohongshu.com/user/profile/5fb745a0000000000101e624) - Chinese CrossFit learning-entry profile. The retrieved profile description says it shares CrossFit knowledge and training understanding, with a focus on breaking down training logic.

Local Xiaohongshu MCP evidence:

- User profile retrieval succeeded for `5fb745a0000000000101e624`.
- Profile metadata: nickname `阿蛋CrossFit笔记`, redId `1077292348`, IP location Sichuan, fans `1万+`, likes and collections `1万+`.
- Search retrieval for `CrossFit Scale 阿蛋` returned 22 visible results, including 12 creator-authored CrossFit notes. See [CrossFit Xiaohongshu analysis](crossfit-xiaohongshu-analysis.md) for the note IDs, interaction counts, and theme clustering.
- Full note-detail extraction was inconsistent: direct `get_feed_detail` failed for core searched notes with `noteDetailMap` lookup failure, topic tracking later stalled while loading comments, and direct browser navigation redirected to the Xiaohongshu login screen. Treat the stored Chinese source layer as title/theme evidence, not full-text transcription.

Chinese planning implications:

- `Scale` is a stimulus-preservation decision, not a pride downgrade.
- `不断变化` needs structure; random suffering is not CrossFit programming.
- Movement economy and breathing should be treated as coachable skills.
- Accessory training should solve a visible limiter.
- More volume is often overestimated; quality and recovery must be checked.
- Gymnastics, rowing, clean, rope climb, and deadlift teaching should progress from positions and rhythm before fatigue.

## Source Tiers

Tier 1: Official CrossFit sources

- [CrossFit - What Is CrossFit?](https://www.crossfit.com/what-is-crossfit) - Core definition and methodology.
- [CrossFit Workout of the Day](https://www.crossfit.com/workouts/) - Daily workout and scaling context.
- [CrossFit Level 1 Training Guide](https://library.crossfit.com/free/pdf/CFJ_English_Level1_TrainingGuide.pdf) - Foundational methodology, movements, and progression principles.
- [CrossFit Education Resources](https://www.crossfit.com/education/resources) - Official study material hub.
- [CrossFit Level 2 Training Guide and Workbook](https://library.crossfit.com/free/pdf/CFJ_English_L2_TrainingGuide.pdf) - Class structure, scaling, seeing and correcting, and benchmark-recording guidance.
- [A Theoretical Template for CrossFit Programming](https://www.crossfit.com/essentials/a-theoretical-template-for-crossfit-programming) - Structured variation across modal and time domains.
- [CrossFit Essentials - Scaling](https://www.crossfit.com/essentials/scaling-crossfit-workouts) - Scaling and intended-stimulus framing.
- [CrossFit Essentials - Mechanics, Consistency, Intensity](https://www.crossfit.com/essentials/mechanics-consistency-and-intensity) - Progression order.
- [CrossFit Journal - What Is Fitness?](https://library.crossfit.com/free/pdf/CFJ-trial.pdf) - Broad, general, inclusive fitness model.
- [CrossFit Exercises and Movement Demos](https://www.crossfit.com/exercises) - Movement standards and substitutions.

Tier 2: Professional and athlete video sources

- [CrossFit YouTube](https://www.youtube.com/@CrossFit) - Movement demos, coaching education, and workout context.
- [CrossFit Games YouTube](https://www.youtube.com/@CrossFitGamesTV) - Competition workouts, elite pacing, and standards.
- [Mayhem Athlete](https://www.youtube.com/@MayhemAthlete) - Public coach/athlete training discussion.
- [PRVN Fitness](https://www.youtube.com/@PRVNFitness) - Public training and elite-athlete context.
- [Invictus Fitness](https://www.youtube.com/@CrossFitInvictus) - Movement progressions and coaching references.
- [Training Think Tank](https://www.youtube.com/@TrainingThinkTank) - Limiter analysis and competitive strategy discussion.

Tier 3: Science and safety rails

- [ACSM Physical Activity Guidelines](https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/) - General adult aerobic and strength baseline.
- [CDC Adult Physical Activity Guidelines](https://www.cdc.gov/physical-activity-basics/guidelines/adults.html) - General adult activity baseline.
- [Feito et al. injury incidence study](https://pmc.ncbi.nlm.nih.gov/articles/PMC6201188/) - Safety context for skill progression and load management.

## Agent Data Files

- [training-assets.json](../data/crossfit/training-assets.json) stores the structured source registry.
- [training-taxonomy.json](../data/crossfit/training-taxonomy.json) stores goals, equipment contexts, experience levels, and limiter rules.
- [training-program.json](../data/crossfit/training-program.json) stores levels, phase rules, weekly templates, safety rails, and daily class-style sessions.
- [crossfit-day-plan.mjs](../scripts/crossfit-day-plan.mjs) renders a daily plan from level/week/day or from a start date.

## Maintenance Rules

- Re-check official CrossFit Open and Games rules before producing current competition advice.
- Re-check official WOD pages when the user asks about today's or this week's CrossFit workouts.
- Re-run Xiaohongshu MCP when the user wants full creator-note coverage; do not imply full text was captured if only title/theme data is available.
- Treat public YouTube and creator content as qualitative coaching context, not official rules.
- Never copy paid programming or long creator-note text into this repo; cite and summarize only.
