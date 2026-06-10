const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const renderList = (items) =>
  `<ul>${items.map((item) => `<li><span class="check"></span><span>${escapeHtml(item)}</span></li>`).join("")}</ul>`;

function renderBlock(block) {
  return `<section class="block">
    <h3>${escapeHtml(block.title)}</h3>
    <p class="purpose">${escapeHtml(block.purpose)}</p>
    ${renderList(block.items)}
  </section>`;
}

function renderPlan(plan) {
  return `<article class="session-card">
    <header class="session-header">
      <p class="eyebrow">${escapeHtml(plan.dateLine)}</p>
      <h1>${escapeHtml(plan.sessionTitle)}</h1>
      <div class="meta-grid">
        <span>${escapeHtml(plan.profileLine)}</span>
        <span>${escapeHtml(plan.ageLine)}</span>
        <span>${escapeHtml(plan.experienceLine)}</span>
        <span>${escapeHtml(plan.phaseLine)}</span>
        <span>${escapeHtml(plan.durationLine)}</span>
        <span>${escapeHtml(plan.intensityLine)}</span>
      </div>
    </header>

    <section class="goal-grid">
      <div>
        <h2>Training Goal / 训练目标</h2>
        <p>${escapeHtml(plan.goal.en)}</p>
        <p lang="zh-CN">${escapeHtml(plan.goal.zh)}</p>
      </div>
      <div>
        <h2>Completion Target / 完成标准</h2>
        <p>${escapeHtml(plan.target.en)}</p>
        <p lang="zh-CN">${escapeHtml(plan.target.zh)}</p>
      </div>
    </section>

    <section class="standard">
      <h2>Division Standard / 组别标准</h2>
      <p>${escapeHtml(plan.divisionStandard)}</p>
    </section>

    <section class="prescription">
      <h2>Session Prescription / 训练安排</h2>
      ${plan.blocks.map(renderBlock).join("")}
    </section>

    <section class="constraints">
      <h2>Coaching Constraints / 教练限制</h2>
      ${renderList(plan.constraints)}
    </section>

    <section class="readiness">
      <h2>Readiness Adjustment / 状态调整</h2>
      <div class="readiness-row">
        <p><strong>Green / 绿色</strong><br>Do the plan as written. / 按计划执行。</p>
        <p><strong>Yellow / 黄色</strong><br>Reduce rounds, load, or distance by 20-30%. / 轮数、重量或距离减少 20-30%。</p>
        <p><strong>Red / 红色</strong><br>Stop hard work and switch to mobility/rest. / 停止高强度训练，改为活动度或休息。</p>
      </div>
    </section>

    <section class="sources">
      <h2>Source Anchors / 来源</h2>
      ${renderList(plan.sources)}
    </section>
  </article>`;
}

export function renderHtmlDocument(plans) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>HYROX Daily Training Checklist</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f6f7f5;
      --surface: #ffffff;
      --ink: #16201b;
      --muted: #647067;
      --line: #dfe5df;
      --accent: #f2643a;
      --accent-soft: #fff0ea;
      --green: #18794e;
      --yellow: #9a6700;
      --red: #c24130;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--ink);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.45;
    }
    main {
      width: min(980px, calc(100% - 32px));
      margin: 32px auto;
    }
    .session-card {
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 28px;
    }
    .session-header {
      padding: 28px;
      border-bottom: 1px solid var(--line);
      background: #fbfcfa;
    }
    .eyebrow {
      margin: 0 0 8px;
      color: var(--accent);
      font-size: 13px;
      font-weight: 750;
      text-transform: uppercase;
      letter-spacing: 0;
    }
    h1, h2, h3, p { margin-top: 0; }
    h1 {
      max-width: 840px;
      margin-bottom: 18px;
      font-size: 28px;
      line-height: 1.18;
      letter-spacing: 0;
    }
    h2 {
      margin-bottom: 10px;
      font-size: 17px;
      letter-spacing: 0;
    }
    h3 {
      margin-bottom: 6px;
      font-size: 15px;
      letter-spacing: 0;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 8px;
      color: var(--muted);
      font-size: 14px;
    }
    .goal-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 18px;
      padding: 24px 28px;
      border-bottom: 1px solid var(--line);
    }
    .goal-grid > div, .standard, .constraints, .readiness, .sources {
      background: #fbfcfa;
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 18px;
    }
    .standard, .constraints, .readiness, .sources {
      margin: 24px 28px;
    }
    .prescription {
      padding: 24px 28px 0;
    }
    .block {
      border-top: 1px solid var(--line);
      padding: 18px 0;
    }
    .purpose {
      color: var(--muted);
      font-size: 14px;
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: 10px;
    }
    li {
      display: grid;
      grid-template-columns: 20px 1fr;
      gap: 10px;
      align-items: start;
    }
    .check {
      width: 16px;
      height: 16px;
      margin-top: 3px;
      border: 2px solid var(--accent);
      border-radius: 4px;
      background: var(--accent-soft);
    }
    .readiness-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 12px;
    }
    .readiness-row p {
      margin: 0;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid var(--line);
      background: var(--surface);
    }
    .readiness-row p:nth-child(1) strong { color: var(--green); }
    .readiness-row p:nth-child(2) strong { color: var(--yellow); }
    .readiness-row p:nth-child(3) strong { color: var(--red); }
    @media (max-width: 640px) {
      main { width: min(100% - 20px, 980px); margin: 16px auto; }
      .session-header, .goal-grid, .prescription { padding: 18px; }
      .standard, .constraints, .readiness, .sources { margin: 18px; }
      h1 { font-size: 23px; }
    }
  </style>
</head>
<body>
  <main>
    ${plans.map(renderPlan).join("\n")}
  </main>
</body>
</html>
`;
}
