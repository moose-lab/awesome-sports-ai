import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dataPath = join(root, "visualizations", "source-data.json");
const data = JSON.parse(readFileSync(dataPath, "utf8"));

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const text = (x, y, content, options = {}) => {
  const {
    size = 16,
    weight = 500,
    fill = "#152033",
    anchor = "start",
    family = "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
  } = options;
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${escapeXml(content)}</text>`;
};

const rect = (x, y, width, height, options = {}) => {
  const {
    fill = "#ffffff",
    stroke = "#d8dee9",
    radius = 12,
    strokeWidth = 1,
    opacity = 1,
  } = options;
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"/>`;
};

const pillWidth = (label) => Math.max(72, label.length * 8 + 24);

const pill = (x, y, label, fill, color = "#ffffff") => {
  const width = pillWidth(label);
  return [
    rect(x, y, width, 28, { fill, stroke: fill, radius: 14 }),
    text(x + width / 2, y + 19, label, {
      size: 12,
      weight: 700,
      fill: color,
      anchor: "middle",
    }),
  ].join("");
};

const svgFrame = (width, height, body) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc" xmlns="http://www.w3.org/2000/svg">
  <title id="title">Awesome Sports AI event visualization</title>
  <desc id="desc">Generated sports event visualization for the repository README.</desc>
  <defs>
    <linearGradient id="nbaBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f6f9ff"/>
      <stop offset="1" stop-color="#fff7f0"/>
    </linearGradient>
    <linearGradient id="fifaBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f4fbf8"/>
      <stop offset="1" stop-color="#f9f6ff"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#1a2638" flood-opacity="0.12"/>
    </filter>
  </defs>
${body}
</svg>
`;

const cleanSvg = (svg) =>
  svg
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");

function renderNba(finals) {
  const teams = Object.fromEntries(finals.teams.map((team) => [team.abbr, team]));
  const [leader, challenger] = finals.teams;

  const teamStamp = (x, y, team, options = {}) => {
    const { active = false } = options;
    return `
  <g>
    <circle cx="${x}" cy="${y}" r="38" fill="${team.color}" stroke="${team.accent}" stroke-width="${active ? 5 : 2}"/>
    <circle cx="${x}" cy="${y}" r="28" fill="#ffffff" opacity="0.9"/>
    ${text(x, y + 7, team.abbr, { size: 18, weight: 950, fill: team.accent, anchor: "middle" })}
    ${text(x, y + 58, `${team.seriesWins} wins`, { size: 12, weight: 800, fill: active ? team.accent : "#64748b", anchor: "middle" })}
  </g>`;
  };

  const winSeal = (x, y, team) => `
  <g transform="rotate(-10 ${x} ${y})">
    <circle cx="${x}" cy="${y}" r="26" fill="${team.color}" stroke="${team.accent}" stroke-width="3"/>
    <circle cx="${x}" cy="${y}" r="18" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.9"/>
    ${text(x, y + 5, "WIN", { size: 12, weight: 950, fill: "#ffffff", anchor: "middle" })}
  </g>`;

  const signalCards = finals.signals
    .map((signal, index) => {
      const x = 42 + index * 340;
      return [
        rect(x, 168, 306, 82, { fill: "#ffffff", stroke: index === 0 ? leader.color : "#dfe6f0", radius: 16 }),
        text(x + 20, 194, signal.label, { size: 12, weight: 850, fill: "#64748b" }),
        text(x + 20, 222, signal.value, { size: 24, weight: 950, fill: index === 0 ? leader.accent : "#0f2544" }),
        text(x + 20, 242, signal.detail, { size: 12, weight: 650, fill: "#526174" }),
      ].join("");
    })
    .join("");

  const gameCards = finals.games
    .map((game, index) => {
      const col = index % 4;
      const row = Math.floor(index / 4);
      const x = 42 + col * 258;
      const y = 298 + row * 134;
      const isFinal = game.status === "Final";
      const winner = teams[game.winner];
      const cardFill = isFinal ? "#fff7ed" : row === 0 ? "#ffffff" : "#f8fafc";
      const border = isFinal && winner ? winner.color : "#dfe6f0";
      const statusX = x + 226 - pillWidth(game.status);
      return `
  <g>
    ${rect(x, y, 236, 112, { fill: cardFill, stroke: border, radius: 16, strokeWidth: isFinal ? 2 : 1 })}
    ${text(x + 18, y + 28, game.game, { size: 17, weight: 950, fill: isFinal && winner ? winner.accent : "#0f4c81" })}
    ${text(x + 68, y + 27, game.date, { size: 13, weight: 800, fill: "#152033" })}
    ${text(x + 18, y + 51, game.venue, { size: 12, weight: 700, fill: "#526174" })}
    ${text(x + 18, y + 78, game.score, { size: 16, weight: isFinal ? 900 : 750, fill: isFinal ? "#0f2544" : "#526174" })}
    ${text(x + 18, y + 101, game.insight, { size: 11, weight: 700, fill: isFinal ? "#b45309" : "#64748b" })}
    ${isFinal && winner ? winSeal(x + 196, y + 38, winner) : pill(statusX, y + 16, game.status, "#e2e8f0", "#475569")}
    ${isFinal && winner ? text(x + 182, y + 102, `${winner.abbr} ${game.margin}`, { size: 12, weight: 950, fill: winner.accent }) : ""}
  </g>`;
    })
    .join("");

  return svgFrame(
    1100,
    690,
    `
  ${rect(0, 0, 1100, 690, { fill: "url(#nbaBg)", stroke: "none", radius: 0 })}
  ${rect(24, 24, 1052, 642, { fill: "#ffffff", stroke: "#dfe6f0", radius: 22, opacity: 0.94 })}
  ${text(42, 72, finals.title, { size: 30, weight: 900, fill: "#0f2544" })}
  ${text(42, 100, finals.subtitle, { size: 16, weight: 650, fill: "#526174" })}
  ${pill(860, 50, finals.updated, "#0f4c81")}

  ${teamStamp(766, 104, leader, { active: true })}
  ${text(836, 108, finals.series.record, { size: 30, weight: 950, fill: "#0f2544", anchor: "middle" })}
  ${teamStamp(912, 104, challenger)}

  ${rect(42, 122, 636, 38, { fill: "#eef6ff", stroke: "#c9ddf4", radius: 14 })}
  ${text(62, 147, `${finals.series.winsNeeded} · ${finals.series.momentum}`, { size: 14, weight: 800, fill: "#0f2544" })}

  ${signalCards}
  ${text(42, 282, "Game-by-game read", { size: 18, weight: 950, fill: "#0f2544" })}
  ${gameCards}
  ${text(42, 642, "Generated from source-data.json. Official hubs: NBA Finals hub + NBA Stats.", { size: 12, weight: 600, fill: "#64748b" })}
`
  );
}

function renderFifa(worldCup) {
  const statCards = worldCup.stats
    .map((stat, index) => {
      const x = 42 + index * 252;
      return [
        rect(x, 124, 228, 84, { fill: "#ffffff", stroke: "#d8e7df", radius: 14 }),
        text(x + 22, 156, stat.value, { size: 30, weight: 900, fill: "#086c5b" }),
        text(x + 22, 184, stat.label, { size: 14, weight: 700, fill: "#526174" }),
      ].join("");
    })
    .join("");

  const groupColors = ["#086c5b", "#1d4ed8", "#b45309", "#7c3aed", "#be123c", "#0f766e"];
  const fixtureCards = worldCup.confirmedFixtures
    .map((fixture, index) => {
      const col = index % 3;
      const row = Math.floor(index / 3);
      const x = 42 + col * 340;
      const y = 318 + row * 88;
      const color = groupColors[row % groupColors.length];
      const featured = fixture.tag === "Opener" || fixture.tag === "Host" || fixture.tag === "Marquee";
      return `
  <g>
    ${rect(x, y, 320, 74, { fill: featured ? "#f7fffb" : "#ffffff", stroke: color, radius: 14, strokeWidth: featured ? 2 : 1 })}
    ${pill(x + 16, y + 12, fixture.date, color)}
    ${text(x + 102, y + 31, fixture.group, { size: 12, weight: 900, fill: color })}
    ${pill(x + 230, y + 12, fixture.tag, featured ? "#0f766e" : "#e2e8f0", featured ? "#ffffff" : "#475569")}
    ${text(x + 18, y + 55, fixture.match, { size: 14, weight: 950, fill: "#12342f" })}
    ${text(x + 18, y + 70, fixture.venue, { size: 10, weight: 650, fill: "#64748b" })}
  </g>`;
    })
    .join("");

  return svgFrame(
    1100,
    760,
    `
  ${rect(0, 0, 1100, 760, { fill: "url(#fifaBg)", stroke: "none", radius: 0 })}
  ${rect(24, 24, 1052, 712, { fill: "#ffffff", stroke: "#dfe6f0", radius: 22, opacity: 0.94 })}
  ${text(42, 72, worldCup.title, { size: 30, weight: 900, fill: "#12342f" })}
  ${text(42, 100, worldCup.subtitle, { size: 16, weight: 650, fill: "#526174" })}
  ${pill(860, 50, worldCup.updated, "#086c5b")}
  ${statCards}

  ${rect(42, 228, 1016, 58, { fill: "#f4fbf8", stroke: "#cfe5dc", radius: 16 })}
  ${text(62, 252, `${worldCup.fixtureSummary.label} · ${worldCup.fixtureSummary.window}`, { size: 17, weight: 950, fill: "#12342f" })}
  ${text(62, 274, worldCup.fixtureSummary.detail, { size: 12, weight: 650, fill: "#526174" })}

  ${fixtureCards}
  ${text(42, 718, "Generated from source-data.json. Official hubs: FIFA match schedule + tournament hub.", { size: 12, weight: 600, fill: "#64748b" })}
`
  );
}

writeFileSync(join(root, "visualizations", "nba-finals-2026.svg"), cleanSvg(renderNba(data.nbaFinals)));
writeFileSync(join(root, "visualizations", "fifa-world-cup-2026.svg"), cleanSvg(renderFifa(data.fifaWorldCup)));

console.log("Generated visualizations/nba-finals-2026.svg");
console.log("Generated visualizations/fifa-world-cup-2026.svg");
