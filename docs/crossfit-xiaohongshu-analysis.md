# CrossFit Xiaohongshu Analysis

Last verified: 2026-06-10

This file records the reproducible Xiaohongshu evidence used by the `skills/crossfit` training-plan agent. The source requested by the user is the profile below:

- [阿蛋CrossFit笔记](https://www.xiaohongshu.com/user/profile/5fb745a0000000000101e624)

## Retrieval Status

Local Xiaohongshu MCP was able to retrieve the profile and a stable search-result set, but full note-detail extraction is currently unreliable.

Verified profile metadata:

- User ID: `5fb745a0000000000101e624`
- Nickname: `阿蛋CrossFit笔记`
- Red ID: `1077292348`
- Location shown by profile: Sichuan
- Description: Chinese CrossFit learning entry; shares CrossFit knowledge and training understanding; breaks down training logic.
- Visible follower/interaction scale: `1万+` fans and `1万+` likes plus collections.

Stable search:

- Structured evidence file: [xiaohongshu-search-evidence.json](../data/crossfit/xiaohongshu-search-evidence.json)
- Query: `CrossFit Scale 阿蛋`
- Result count returned by MCP: 22
- Creator-authored CrossFit notes identified in the stable result set: 12
- Direct detail extraction failures reproduced for:
  - `6a2211a900000000350304dd` - `CrossFit 的“Scale”，不是降低难度而是……`
  - `69b01286000000002602f64d` - `阿蛋拆解｜你练的，根本就不叫CrossFit！`
- Failure mode: `feed ... not found in noteDetailMap`
- Broader `track-topic` extraction stalled while loading comments, even at low limits.
- Direct Playwright navigation to a note URL returned HTTP 200 but redirected to `/login`, with visible text limited to the Xiaohongshu login screen.

Because of that boundary, the agent uses the retrieved titles, note IDs, interaction counts, and theme clustering. It does not claim to have stored or analyzed full note bodies.

## Stable Creator-Note Set

| Note ID | Title | Type | Likes | Collections | Comments | Shares | Training Theme |
|---|---|---:|---:|---:|---:|---:|---|
| `6a2211a900000000350304dd` | CrossFit 的“Scale”，不是降低难度而是…… | normal | 17 | 7 | 1 | 4 | Scale preserves stimulus |
| `694ca19f000000001e007b1e` | 阿蛋拆解｜CrossFit训练，进步停滞的八大因素 | video | 488 | 337 | 45 | 261 | Plateau diagnosis |
| `69d8ca37000000002200c649` | 阿蛋拆解｜最被忽略的进步驱动力：动作经济性 | video | 98 | 41 | 6 | 33 | Movement economy |
| `69ed59ee0000000035030cb4` | 怎么同时让力量、举重、体操、体能都进步？ | video | 229 | 145 | 18 | 86 | Domain balance |
| `69495f60000000001e016e59` | 阿蛋拆解｜体能的底层逻辑：呼吸，才是核心能 | video | 245 | 158 | 9 | 95 | Breathing and pacing |
| `69783fb70000000009039f5c` | 阿蛋拆解｜请立刻停止无效的辅助训练！ | video | 191 | 148 | 20 | 60 | Effective accessory work |
| `69de4c4800000000230210ec` | 阿蛋拆解｜为什么训练量总是被高估 | video | 125 | 48 | 5 | 56 | Volume quality |
| `69b01286000000002602f64d` | 阿蛋拆解｜你练的，根本就不叫CrossFit！ | video | 641 | 463 | 37 | 286 | Avoid random fatigue and generic HIIT |
| `69f2197c000000003502df21` | 什么都在练，为什么没有一起进步？ | normal | 92 | 71 | 0 | 20 | Priority management |
| `6960ef1c0000000009039074` | 阿蛋拆解｜力量耐力卡住了：深度解读背后原理 | video | 377 | 286 | 22 | 154 | Strength endurance |
| `6a09abcf00000000350232d6` | CrossFit 的“不断变化”不等于随机乱练 | normal | 72 | 46 | 5 | 14 | Structured variance |
| `6902c36000000000070339f3` | 194｜如何调整倒立撑的强度 | video | 84 | 72 | 0 | 15 | Gymnastics scaling |

## Profile-Feed Themes

The profile feed also surfaced these recent creator themes:

- Kipping pull-up is not simply cheating: distinguish strict strength, kipping skill, and workout efficiency.
- Rowing damper higher is not automatically stronger: setup should match athlete mechanics and stimulus.
- L4 coach T2B warm-up design: warm-ups should prepare the specific positions and rhythm of the day.
- Medicine-ball clean as clean-learning entry: progress from simpler receiving mechanics.
- Rope climb efficiency: solve foot lock, pull timing, and grip fatigue.
- Deadlift start position: teach balance, bracing, and bar path rather than a single visual cue.
- Stable rhythm saves energy: pacing consistency is a trainable skill.
- Endurance athletes should train the stomach: longer sessions and competitions need fueling tolerance.
- WOD decomposition, member growth, and Scale paths can be represented as a training toolkit.

## Translation Into Agent Rules

The CrossFit skill converts the source themes into these plan requirements:

- Every daily plan must name the intended stimulus before prescribing the work.
- Every daily plan must include a `Scaling Path / Scale 路径` section.
- Scaling modifies load, reps, range, skill demand, or time domain to preserve stimulus.
- `Constantly varied` is implemented as deliberate variation across monostructural, gymnastics, and weightlifting domains, not random fatigue.
- Movement economy, breathing, and rhythm appear as completion targets and review prompts.
- Accessory work is limiter-specific; if it does not improve the next WOD, it is unnecessary fatigue.
- Plans avoid pushing volume, speed, load, and skill difficulty at the same time.

## Remaining Gap

The original ambition is full creator-note analysis. Current evidence proves profile-level and title/theme-level analysis, not full-body note analysis. To close the gap, rerun Xiaohongshu extraction with a stable authenticated browser session or an export workflow that can reliably open each note body without comment-loading stalls or login redirects.
