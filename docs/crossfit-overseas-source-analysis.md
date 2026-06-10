# CrossFit Overseas Source Analysis

Last verified: 2026-06-10

This file records how the `skills/crossfit` agent translates overseas public CrossFit sources into daily training-plan behavior. It is intentionally source-level and conservative: official CrossFit sources define rules and methodology; public athlete/coach media provides qualitative examples, not binding standards.

## Official CrossFit Methodology

Primary sources:

- [CrossFit - What Is CrossFit?](https://www.crossfit.com/what-is-crossfit)
- [CrossFit Workout of the Day](https://www.crossfit.com/workouts/)
- [CrossFit Level 1 Training Guide](https://library.crossfit.com/free/pdf/CFJ_English_Level1_TrainingGuide.pdf)
- [CrossFit Level 2 Training Guide and Workbook](https://library.crossfit.com/free/pdf/CFJ_English_L2_TrainingGuide.pdf)
- [CrossFit Education Resources](https://www.crossfit.com/education/resources)
- [A Theoretical Template for CrossFit Programming](https://www.crossfit.com/essentials/a-theoretical-template-for-crossfit-programming)
- [CrossFit Essentials - Scaling](https://www.crossfit.com/essentials/scaling-crossfit-workouts)
- [CrossFit Essentials - Mechanics, Consistency, Intensity](https://www.crossfit.com/essentials/mechanics-consistency-and-intensity)
- [CrossFit Exercises and Movement Demos](https://www.crossfit.com/exercises)

Agent translation:

- Every session carries a modality tag: `M`, `G`, `W`, or a blend. This follows the monostructural, gymnastics, and weightlifting programming lens.
- Every session includes an intended stimulus. Without a stimulus, a WOD becomes random fatigue rather than training.
- Every session includes a scaling path. Scaling adjusts load, reps, range, skill demand, or time cap so the athlete can still hit the stimulus.
- The safety progression is `mechanics -> consistency -> intensity`. This is enforced in the skill text and readiness rules.
- Daily class flow uses warm-up, skill or strength, MetCon, cooldown, and review, matching the coaching structure implied by Level 1/Level 2 education resources.
- The weekly templates rotate time domains and modal domains instead of repeating only short metcons.

## Official Video and Competition Context

Primary sources:

- [CrossFit YouTube](https://www.youtube.com/@CrossFit)
- [CrossFit Games YouTube](https://www.youtube.com/@CrossFitGamesTV)

Agent translation:

- Official video sources are used for movement context, standards, workout previews, and examples of how workouts look under fatigue.
- CrossFit Games footage is useful for competitive pacing and standards, but the skill does not copy Games workouts into daily prescriptions unless the user asks for competition-style testing.
- Competition context informs the `competitive` and `advanced` levels: benchmark evidence, limiter-specific work, and planned testing are required before adding extra volume.

## Professional Coach and Athlete Media

Public sources:

- [Mayhem Athlete](https://www.youtube.com/@MayhemAthlete)
- [PRVN Fitness](https://www.youtube.com/@PRVNFitness)
- [Invictus Fitness](https://www.youtube.com/@CrossFitInvictus)
- [Training Think Tank](https://www.youtube.com/@TrainingThinkTank)

Agent translation:

- These sources support qualitative coaching themes: limiter diagnosis, Open preparation, pacing strategy, gymnastics progressions, and sustainable competition prep.
- They are not treated as official rules. The agent uses them to shape prompts and review notes, not to override CrossFit methodology.
- For advanced athletes, the skill requires coach review or benchmark evidence before recommending higher volume because public elite examples are not automatically appropriate for recreational athletes.
- Invictus and Training Think Tank are especially useful for skill-progressions and limiter framing; Mayhem and PRVN are useful for competitive context and Open-style preparation framing.

## Safety and General Training Context

Primary sources:

- [ACSM Physical Activity Guidelines](https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/)
- [CDC Adult Physical Activity Guidelines](https://www.cdc.gov/physical-activity-basics/guidelines/adults.html)
- [Feito et al. injury incidence study](https://pmc.ncbi.nlm.nih.gov/articles/PMC6201188/)

Agent translation:

- Newcomers start with mechanics and consistency before intensity.
- The plan keeps at least one recovery/rest day in most weeks.
- Red-flag symptoms override the workout.
- High-skill gymnastics and Olympic lifting should be scaled or coached when the athlete lacks reliable mechanics.

## Programming Rules Added to the Skill

- Do not increase load, speed, skill difficulty, and volume in the same week.
- Use accessory work only when it solves a visible limiter.
- Treat breathing and rhythm as performance skills.
- Keep benchmark and Open-style tests as evidence-gathering tools, not everyday training.
- Preserve the intended stimulus before chasing Rx.
