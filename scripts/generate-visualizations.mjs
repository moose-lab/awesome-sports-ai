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

const pill = (x, y, label, fill, color = "#ffffff") => {
  const width = Math.max(72, label.length * 8 + 24);
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
  <title id="title">Awesome Sports Collection event visualization</title>
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

function renderNba(finals) {
  const rows = finals.games
    .map((game, index) => {
      const y = 224 + index * 38;
      const isFinal = game.status === "Final";
      return [
        rect(40, y - 25, 1020, 32, {
          fill: isFinal ? "#fff7ed" : "#ffffff",
          stroke: "#e6ebf2",
          radius: 8,
        }),
        text(58, y - 4, game.game, { size: 13, weight: 800, fill: "#0f4c81" }),
        text(130, y - 4, game.date, { size: 13, weight: 700 }),
        text(230, y - 4, game.venue, { size: 13, weight: 600, fill: "#48566a" }),
        text(450, y - 4, game.status, { size: 13, weight: 600, fill: isFinal ? "#b45309" : "#56657a" }),
        text(700, y - 4, game.score, { size: 13, weight: isFinal ? 800 : 600, fill: isFinal ? "#152033" : "#56657a" }),
      ].join("");
    })
    .join("");

  const total = finals.series.knicksPoints + finals.series.spursPoints;
  const barWidth = 350;
  const knicksWidth = Math.round((finals.series.knicksPoints / total) * barWidth);
  const spursWidth = barWidth - knicksWidth;

  return svgFrame(
    1100,
    620,
    `
  ${rect(0, 0, 1100, 620, { fill: "url(#nbaBg)", stroke: "none", radius: 0 })}
  ${rect(24, 24, 1052, 572, { fill: "#ffffff", stroke: "#dfe6f0", radius: 22, opacity: 0.94 })}
  ${text(42, 72, finals.title, { size: 30, weight: 900, fill: "#0f2544" })}
  ${text(42, 100, finals.subtitle, { size: 16, weight: 650, fill: "#526174" })}
  ${pill(860, 50, finals.updated, "#0f4c81")}

  ${rect(42, 124, 300, 58, { fill: "#eef6ff", stroke: "#c9ddf4", radius: 14 })}
  ${text(62, 148, "Series", { size: 12, weight: 800, fill: "#526174" })}
  ${text(62, 171, `${finals.series.leader} ${finals.series.record}`, { size: 19, weight: 900, fill: "#0f2544" })}

  ${rect(372, 124, 300, 58, { fill: "#fff7ed", stroke: "#fed7aa", radius: 14 })}
  ${text(392, 148, "NBA Stats snapshot", { size: 12, weight: 800, fill: "#8a4b0f" })}
  ${text(392, 171, `${finals.series.knicksPoints}-${finals.series.spursPoints} total points`, { size: 19, weight: 900, fill: "#0f2544" })}

  ${rect(702, 124, 300, 58, { fill: "#f4f7fb", stroke: "#d8dee9", radius: 14 })}
  ${text(722, 148, "Point differential", { size: 12, weight: 800, fill: "#526174" })}
  ${text(722, 171, finals.series.pointDifferential, { size: 19, weight: 900, fill: "#0f2544" })}

  ${text(46, 216, "Game", { size: 11, weight: 800, fill: "#6b778c" })}
  ${text(130, 216, "Date", { size: 11, weight: 800, fill: "#6b778c" })}
  ${text(230, 216, "Venue", { size: 11, weight: 800, fill: "#6b778c" })}
  ${text(450, 216, "Status", { size: 11, weight: 800, fill: "#6b778c" })}
  ${text(700, 216, "Score / Tipoff", { size: 11, weight: 800, fill: "#6b778c" })}
  ${rows}

  ${rect(42, 540, barWidth, 16, { fill: "#eef2f7", stroke: "none", radius: 8 })}
  ${rect(42, 540, knicksWidth, 16, { fill: "#f97316", stroke: "none", radius: 8 })}
  ${rect(42 + knicksWidth, 540, spursWidth, 16, { fill: "#94a3b8", stroke: "none", radius: 0 })}
  ${text(42, 578, "Generated from source-data.json. Official hubs: NBA Finals schedule + NBA Stats.", { size: 12, weight: 600, fill: "#64748b" })}
`
  );
}

function renderFifa(worldCup) {
  const statCards = worldCup.stats
    .map((stat, index) => {
      const x = 42 + index * 270;
      return [
        rect(x, 124, 206, 84, { fill: "#ffffff", stroke: "#d8e7df", radius: 14 }),
        text(x + 22, 156, stat.value, { size: 30, weight: 900, fill: "#086c5b" }),
        text(x + 22, 184, stat.label, { size: 14, weight: 700, fill: "#526174" }),
      ].join("");
    })
    .join("");

  const milestones = worldCup.milestones
    .map((item, index) => {
      const y = 286;
      const x = 110 + index * 290;
      return [
        `<circle cx="${x}" cy="${y}" r="10" fill="#086c5b"/>`,
        text(x, y + 33, item.date, { size: 13, weight: 900, fill: "#086c5b", anchor: "middle" }),
        text(x, y + 54, item.label, { size: 13, weight: 800, fill: "#152033", anchor: "middle" }),
      ].join("");
    })
    .join("");

  const detailRows = worldCup.milestones
    .map((item, index) => {
      const y = 432 + index * 28;
      return [
        text(42, y, item.date, { size: 12, weight: 900, fill: "#086c5b" }),
        text(120, y, `${item.label}: ${item.detail}`, { size: 12, weight: 600, fill: "#526174" }),
      ].join("");
    })
    .join("");

  return svgFrame(
    1100,
    620,
    `
  ${rect(0, 0, 1100, 620, { fill: "url(#fifaBg)", stroke: "none", radius: 0 })}
  ${rect(24, 24, 1052, 572, { fill: "#ffffff", stroke: "#dfe6f0", radius: 22, opacity: 0.94 })}
  ${text(42, 72, worldCup.title, { size: 30, weight: 900, fill: "#12342f" })}
  ${text(42, 100, worldCup.subtitle, { size: 16, weight: 650, fill: "#526174" })}
  ${pill(860, 50, worldCup.updated, "#086c5b")}
  ${statCards}

  ${text(42, 250, "Tournament timeline", { size: 17, weight: 900, fill: "#12342f" })}
  <line x1="110" y1="286" x2="980" y2="286" stroke="#cfe5dc" stroke-width="8" stroke-linecap="round"/>
  ${milestones}
  ${detailRows}
  ${text(42, 578, "Generated from source-data.json. Official hubs: FIFA match schedule + tournament hub.", { size: 12, weight: 600, fill: "#64748b" })}
`
  );
}

writeFileSync(join(root, "visualizations", "nba-finals-2026.svg"), renderNba(data.nbaFinals));
writeFileSync(join(root, "visualizations", "fifa-world-cup-2026.svg"), renderFifa(data.fifaWorldCup));

console.log("Generated visualizations/nba-finals-2026.svg");
console.log("Generated visualizations/fifa-world-cup-2026.svg");
