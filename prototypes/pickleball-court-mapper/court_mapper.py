#!/usr/bin/env python3
"""
pickleball-court-mapper
=======================
Detects court lines from a pickleball court image using OpenCV edge detection
and Hough line transforms, then annotates the image with detected boundaries
and key zones (kitchen/NVZ, service boxes, baselines).

Also generates a synthetic court diagram for demo purposes when no real image
is available.

Part of the awesome-sports-ai Phase 6 roadmap.
Input : court.jpg (or auto-generates a synthetic court)
Output: court_annotated.png + court_diagram.png
"""

import os
import cv2
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as patches

BASE_DIR        = os.path.dirname(__file__)
INPUT_IMAGE     = os.path.join(BASE_DIR, "court.jpg")
OUTPUT_ANNOTATED = os.path.join(BASE_DIR, "court_annotated.png")
OUTPUT_DIAGRAM  = os.path.join(BASE_DIR, "court_diagram.png")

# ── Pickleball court dimensions (feet) ────────────────────────────────────────
# Standard court: 44 ft long × 20 ft wide
# Kitchen (NVZ): 7 ft from net on each side
COURT_L = 44.0
COURT_W = 20.0
NVZ_DEPTH = 7.0
NET_Y = COURT_L / 2  # 22 ft from each baseline

# ── Generate a synthetic court image for demo ─────────────────────────────────
def generate_synthetic_court(path: str, width=880, height=440):
    """Draws a top-down pickleball court on a green background."""
    img = np.full((height, width, 3), (34, 139, 34), dtype=np.uint8)  # green

    # Scale factors
    sx = width / COURT_W
    sy = height / COURT_L

    def cx(x): return int(x * sx)
    def cy(y): return int(y * sy)

    lw = 3
    white = (255, 255, 255)
    yellow = (0, 255, 255)
    red = (0, 80, 220)

    # Court boundary
    cv2.rectangle(img, (cx(0), cy(0)), (cx(COURT_W), cy(COURT_L)), white, lw)

    # Net line
    cv2.line(img, (cx(0), cy(NET_Y)), (cx(COURT_W), cy(NET_Y)), (200, 200, 200), 2)

    # Kitchen (NVZ) lines — 7 ft from net on both sides
    cv2.line(img, (cx(0), cy(NET_Y - NVZ_DEPTH)), (cx(COURT_W), cy(NET_Y - NVZ_DEPTH)), yellow, lw)
    cv2.line(img, (cx(0), cy(NET_Y + NVZ_DEPTH)), (cx(COURT_W), cy(NET_Y + NVZ_DEPTH)), yellow, lw)

    # Center lines (service boxes)
    cv2.line(img, (cx(COURT_W / 2), cy(0)), (cx(COURT_W / 2), cy(NET_Y - NVZ_DEPTH)), white, lw)
    cv2.line(img, (cx(COURT_W / 2), cy(NET_Y + NVZ_DEPTH)), (cx(COURT_W / 2), cy(COURT_L)), white, lw)

    # Labels
    font = cv2.FONT_HERSHEY_SIMPLEX
    cv2.putText(img, "Kitchen (NVZ)", (cx(1), cy(NET_Y - NVZ_DEPTH / 2) - 5),
                font, 0.5, yellow, 1, cv2.LINE_AA)
    cv2.putText(img, "Kitchen (NVZ)", (cx(1), cy(NET_Y + NVZ_DEPTH / 2) - 5),
                font, 0.5, yellow, 1, cv2.LINE_AA)
    cv2.putText(img, "NET", (cx(COURT_W / 2) - 15, cy(NET_Y) - 5),
                font, 0.5, (200, 200, 200), 1, cv2.LINE_AA)

    cv2.imwrite(path, img)
    return img

# ── Detect court lines using Hough transform ──────────────────────────────────
def detect_court_lines(img: np.ndarray) -> list:
    gray    = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edges   = cv2.Canny(blurred, threshold1=50, threshold2=150)
    lines   = cv2.HoughLinesP(edges, rho=1, theta=np.pi / 180,
                               threshold=80, minLineLength=60, maxLineGap=15)
    return lines if lines is not None else []

# ── Annotate image with detected lines ────────────────────────────────────────
def annotate_image(img: np.ndarray, lines: list, output_path: str):
    annotated = img.copy()
    for line in lines:
        x1, y1, x2, y2 = line[0]
        cv2.line(annotated, (x1, y1), (x2, y2), (0, 0, 255), 2)

    # Add overlay text
    cv2.putText(annotated, f"Detected {len(lines)} line segments",
                (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
    cv2.putText(annotated, "pickleball-court-mapper | awesome-sports-ai",
                (10, annotated.shape[0] - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.45, (200, 200, 200), 1)

    cv2.imwrite(output_path, annotated)
    print(f"✅ Annotated image saved to: {output_path}")

# ── Generate a clean labeled court diagram ────────────────────────────────────
def generate_court_diagram(output_path: str):
    fig, ax = plt.subplots(figsize=(8, 16))
    fig.patch.set_facecolor("#1A1A2E")
    ax.set_facecolor("#2D5A27")
    ax.set_xlim(-1, COURT_W + 1)
    ax.set_ylim(-1, COURT_L + 1)
    ax.set_aspect("equal")
    ax.axis("off")

    # Court boundary
    court = patches.Rectangle((0, 0), COURT_W, COURT_L,
                               linewidth=3, edgecolor="white", facecolor="#3A7A32")
    ax.add_patch(court)

    # Kitchen zones
    nvz_top = patches.Rectangle((0, NET_Y - NVZ_DEPTH), COURT_W, NVZ_DEPTH,
                                 linewidth=2, edgecolor="#FFD700", facecolor="#2D6B27", alpha=0.5)
    nvz_bot = patches.Rectangle((0, NET_Y), COURT_W, NVZ_DEPTH,
                                 linewidth=2, edgecolor="#FFD700", facecolor="#2D6B27", alpha=0.5)
    ax.add_patch(nvz_top)
    ax.add_patch(nvz_bot)

    # Net
    ax.axhline(y=NET_Y, color="#AAAAAA", linewidth=3, linestyle="--")

    # Center lines
    ax.plot([COURT_W / 2, COURT_W / 2], [0, NET_Y - NVZ_DEPTH], color="white", linewidth=2)
    ax.plot([COURT_W / 2, COURT_W / 2], [NET_Y + NVZ_DEPTH, COURT_L], color="white", linewidth=2)

    # Dimension annotations
    ax.annotate("", xy=(COURT_W, COURT_L / 2), xytext=(0, COURT_L / 2),
                arrowprops=dict(arrowstyle="<->", color="white", lw=1.5))
    ax.text(COURT_W / 2, COURT_L / 2 + 0.8, "20 ft", ha="center", color="white", fontsize=10)

    ax.annotate("", xy=(COURT_W + 0.5, COURT_L), xytext=(COURT_W + 0.5, 0),
                arrowprops=dict(arrowstyle="<->", color="white", lw=1.5))
    ax.text(COURT_W + 0.7, COURT_L / 2, "44 ft", ha="left", color="white", fontsize=10, rotation=90, va="center")

    # Labels
    ax.text(COURT_W / 2, NET_Y - NVZ_DEPTH / 2, "Kitchen\n(NVZ)", ha="center", va="center",
            color="#FFD700", fontsize=11, fontweight="bold")
    ax.text(COURT_W / 2, NET_Y + NVZ_DEPTH / 2, "Kitchen\n(NVZ)", ha="center", va="center",
            color="#FFD700", fontsize=11, fontweight="bold")
    ax.text(COURT_W / 2, NET_Y, "NET", ha="center", va="center",
            color="#CCCCCC", fontsize=9, fontweight="bold",
            bbox=dict(boxstyle="round,pad=0.2", facecolor="#333", edgecolor="none"))

    # Service boxes
    for y_center in [NET_Y - NVZ_DEPTH - (NET_Y - NVZ_DEPTH) / 2,
                     NET_Y + NVZ_DEPTH + (COURT_L - NET_Y - NVZ_DEPTH) / 2]:
        for x_center in [COURT_W / 4, 3 * COURT_W / 4]:
            ax.text(x_center, y_center, "Service\nBox", ha="center", va="center",
                    color="white", fontsize=9, alpha=0.7)

    ax.set_title("Pickleball Court Diagram\npickleball-court-mapper | awesome-sports-ai Phase 6",
                 color="white", fontsize=12, fontweight="bold", pad=12)

    plt.tight_layout()
    plt.savefig(output_path, dpi=150, bbox_inches="tight", facecolor=fig.get_facecolor())
    plt.close()
    print(f"✅ Court diagram saved to: {output_path}")

# ── Main ───────────────────────────────────────────────────────────────────────
def main():
    # Use real image if available, otherwise generate synthetic
    if os.path.exists(INPUT_IMAGE):
        print(f"Loading real court image: {INPUT_IMAGE}")
        img = cv2.imread(INPUT_IMAGE)
    else:
        print("No court.jpg found — generating synthetic court image...")
        img = generate_synthetic_court(INPUT_IMAGE)

    # Detect lines
    lines = detect_court_lines(img)
    print(f"Detected {len(lines)} line segments via Hough transform.")

    # Annotate
    annotate_image(img, lines, OUTPUT_ANNOTATED)

    # Generate clean diagram
    generate_court_diagram(OUTPUT_DIAGRAM)

if __name__ == "__main__":
    main()
