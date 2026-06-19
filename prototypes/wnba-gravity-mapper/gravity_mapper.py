#!/usr/bin/env python3
"""
wnba-gravity-mapper
===================
Calculates a simplified "gravity" score for each player — how much defensive
attention they draw — based on how closely defenders track them across frames.
Generates a 2D half-court visualization with gravity heatmap overlays.

Part of the awesome-sports-ai Phase 6 roadmap.
Input : sample_tracking.csv  (frame, player_id, player_name, team, x, y, has_ball)
Output: gravity_map.png + gravity_scores.csv
"""

import os
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.colors import LinearSegmentedColormap
from scipy.ndimage import gaussian_filter

# ── Paths ─────────────────────────────────────────────────────────────────────
BASE_DIR   = os.path.dirname(__file__)
INPUT_CSV  = os.path.join(BASE_DIR, "sample_tracking.csv")
OUTPUT_PNG = os.path.join(BASE_DIR, "gravity_map.png")
OUTPUT_CSV = os.path.join(BASE_DIR, "gravity_scores.csv")

# ── Court dimensions (half-court, feet) ───────────────────────────────────────
COURT_W, COURT_H = 47.0, 25.0   # half-court: 47 ft wide, 25 ft tall
BASKET_X, BASKET_Y = 41.75, 12.5

# ── Gravity calculation ────────────────────────────────────────────────────────
def compute_gravity(df: pd.DataFrame) -> pd.DataFrame:
    """
    Gravity score = average number of defenders within 8 ft per frame,
    weighted by whether the player has the ball.
    """
    offense_team = df.groupby("player_name")["team"].first()
    # Identify offensive team as the one with ball possession
    ball_holder = df[df["has_ball"] == 1]["team"].mode()
    off_team = ball_holder.iloc[0] if len(ball_holder) else df["team"].unique()[0]

    offense = df[df["team"] == off_team].copy()
    defense = df[df["team"] != off_team].copy()

    gravity_records = []
    for player_name, p_group in offense.groupby("player_name"):
        total_defenders_drawn = 0
        frames = p_group["frame"].unique()
        for frame in frames:
            p_pos = p_group[p_group["frame"] == frame][["x", "y"]].values
            d_pos = defense[defense["frame"] == frame][["x", "y"]].values
            if len(p_pos) == 0 or len(d_pos) == 0:
                continue
            dists = np.linalg.norm(d_pos - p_pos[0], axis=1)
            defenders_within_8ft = np.sum(dists <= 8.0)
            has_ball_bonus = 2 if p_group[p_group["frame"] == frame]["has_ball"].values[0] == 1 else 1
            total_defenders_drawn += defenders_within_8ft * has_ball_bonus
        gravity_score = total_defenders_drawn / max(len(frames), 1)
        avg_x = p_group["x"].mean()
        avg_y = p_group["y"].mean()
        gravity_records.append({
            "player_name": player_name,
            "team": off_team,
            "gravity_score": round(gravity_score, 3),
            "avg_x": round(avg_x, 2),
            "avg_y": round(avg_y, 2),
        })

    return pd.DataFrame(gravity_records).sort_values("gravity_score", ascending=False)

# ── Draw the WNBA half-court ───────────────────────────────────────────────────
def draw_half_court(ax):
    court_color = "#F5E6C8"
    line_color  = "#5B3A29"
    lw = 1.5

    ax.set_facecolor(court_color)
    ax.set_xlim(0, COURT_W)
    ax.set_ylim(0, COURT_H)

    # Court boundary
    court_rect = patches.Rectangle((0, 0), COURT_W, COURT_H,
                                    linewidth=2, edgecolor=line_color,
                                    facecolor=court_color)
    ax.add_patch(court_rect)

    # Paint (key) — 12 ft wide, 19 ft deep from baseline
    paint = patches.Rectangle((COURT_W - 19, COURT_H/2 - 6), 19, 12,
                               linewidth=lw, edgecolor=line_color, facecolor="#E8D5A3")
    ax.add_patch(paint)

    # Free throw circle
    ft_circle = plt.Circle((COURT_W - 19, COURT_H / 2), 6,
                            color=line_color, fill=False, linewidth=lw)
    ax.add_patch(ft_circle)

    # Basket
    basket = plt.Circle((BASKET_X, BASKET_Y), 0.75,
                         color=line_color, fill=True, zorder=5)
    ax.add_patch(basket)

    # 3-point arc (simplified as a partial circle, radius ~22 ft from basket)
    theta = np.linspace(np.pi * 0.55, np.pi * 1.45, 200)
    arc_x = BASKET_X + 22 * np.cos(theta)
    arc_y = BASKET_Y + 22 * np.sin(theta)
    ax.plot(arc_x, arc_y, color=line_color, linewidth=lw)

    # Half-court line
    ax.axvline(x=0, color=line_color, linewidth=2)

    ax.set_aspect("equal")
    ax.axis("off")

# ── Visualize gravity heatmap + player positions ───────────────────────────────
def visualize(df_raw: pd.DataFrame, gravity_df: pd.DataFrame):
    fig, axes = plt.subplots(1, 2, figsize=(18, 9))
    fig.patch.set_facecolor("#1A1A2E")

    # ── Left: Gravity Heatmap ─────────────────────────────────────────────────
    ax1 = axes[0]
    draw_half_court(ax1)

    # Build heatmap grid
    grid = np.zeros((100, 200))
    for _, row in gravity_df.iterrows():
        xi = int(row["avg_x"] / COURT_W * 200)
        yi = int(row["avg_y"] / COURT_H * 100)
        xi = min(max(xi, 0), 199)
        yi = min(max(yi, 0), 99)
        grid[yi, xi] += row["gravity_score"]

    grid_smooth = gaussian_filter(grid, sigma=8)
    cmap = LinearSegmentedColormap.from_list(
        "gravity", ["#F5E6C8", "#FFD700", "#FF6B35", "#C0392B"], N=256
    )
    ax1.imshow(
        grid_smooth,
        extent=[0, COURT_W, 0, COURT_H],
        origin="lower",
        cmap=cmap,
        alpha=0.65,
        aspect="auto",
        zorder=2,
    )

    # Plot player positions with gravity bubble size
    for _, row in gravity_df.iterrows():
        size = max(row["gravity_score"] * 400, 80)
        ax1.scatter(row["avg_x"], row["avg_y"], s=size,
                    c="#E74C3C", alpha=0.85, zorder=6, edgecolors="white", linewidths=1.5)
        ax1.text(row["avg_x"], row["avg_y"] + 1.2, row["player_name"].split()[-1],
                 ha="center", va="bottom", fontsize=7.5, color="white",
                 fontweight="bold", zorder=7)

    ax1.set_title("Player Gravity Map\n(bubble size = gravity score)",
                  color="white", fontsize=13, fontweight="bold", pad=10)

    # ── Right: Bar Chart of Gravity Scores ────────────────────────────────────
    ax2 = axes[1]
    ax2.set_facecolor("#16213E")
    colors = ["#E74C3C" if i == 0 else "#3498DB" for i in range(len(gravity_df))]
    bars = ax2.barh(gravity_df["player_name"], gravity_df["gravity_score"],
                    color=colors, edgecolor="white", linewidth=0.5)
    ax2.set_xlabel("Gravity Score (defenders drawn per frame)", color="white", fontsize=11)
    ax2.set_title("WNBA Player Gravity Scores\nIndiana Fever vs New York Liberty",
                  color="white", fontsize=13, fontweight="bold")
    ax2.tick_params(colors="white", labelsize=10)
    ax2.spines[:].set_color("#444")
    for bar, val in zip(bars, gravity_df["gravity_score"]):
        ax2.text(val + 0.02, bar.get_y() + bar.get_height() / 2,
                 f"{val:.2f}", va="center", color="white", fontsize=9)
    ax2.invert_yaxis()

    # ── Shared title ──────────────────────────────────────────────────────────
    fig.suptitle("wnba-gravity-mapper  |  awesome-sports-ai Phase 6",
                 color="#AAB7B8", fontsize=10, y=0.02)

    plt.tight_layout(rect=[0, 0.04, 1, 1])
    plt.savefig(OUTPUT_PNG, dpi=150, bbox_inches="tight",
                facecolor=fig.get_facecolor())
    plt.close()
    print(f"✅ Gravity map saved to: {OUTPUT_PNG}")

# ── Main ───────────────────────────────────────────────────────────────────────
def main():
    df = pd.read_csv(INPUT_CSV)
    print(f"Loaded {len(df)} tracking rows across {df['frame'].nunique()} frames.")

    gravity_df = compute_gravity(df)
    gravity_df.to_csv(OUTPUT_CSV, index=False)
    print("\nGravity Scores:")
    print(gravity_df.to_string(index=False))

    visualize(df, gravity_df)
    print(f"✅ Gravity scores saved to: {OUTPUT_CSV}")

if __name__ == "__main__":
    main()
