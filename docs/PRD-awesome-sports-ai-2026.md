# Product Requirements Document (PRD): Awesome Sports AI 2026

## 1. Product Overview
**Product Name**: Awesome Sports AI (2026 Edition)
**Target Audience**: Developers, Data Scientists, AI Researchers, Sports Analysts, Coaches, and Sports Media Creators.
**Core Value Proposition**: Transform a static "awesome list" into an active, community-driven incubator for open-source sports AI tools, specifically targeting the massive 2026 trends: FIFA World Cup, Women's Sports, and Emerging/Amateur Sports (Pickleball, Esports).

## 2. Goals and Objectives
* **Goal 1**: Launch three fully functional "mono-tool" prototypes (Phase 6) to demonstrate the "Builder's Path" and provide immediate value.
* **Goal 2**: Build a centralized web showcase ("Sports AI Hub") that surfaces the curated list, the roadmap, and live demos of the mono-tools.
* **Goal 3**: Optimize the GitHub contributor funnel with automated issue templates, clear contribution guidelines, and CI/CD validation.

## 3. Product Features & Execution Scope

### 3.1 Mono-Tool Prototypes (The "Builder's Path")
We will build lightweight, functional prototypes for the top 2026 trends. These will be added to a new `/prototypes` directory in the repository.

#### Feature 1: `llm-match-commentator` (World Cup 2026 Trend)
* **Description**: A Python-based RAG script that takes a JSON stream of match events (e.g., goals, fouls, passes) and uses an LLM to generate localized, dynamic commentary in multiple languages.
* **Inputs**: Synthetic JSON match event data.
* **Outputs**: Text-based commentary stream in English and Spanish.
* **Tech Stack**: Python, OpenAI API (via sandbox env).

#### Feature 2: `wnba-gravity-mapper` (Women's Sports Trend)
* **Description**: A Python script that calculates a simplified "gravity" score (defensive attention drawn) based on player coordinates and generates a 2D court visualization.
* **Inputs**: Synthetic CSV tracking data (X,Y coordinates of players and ball).
* **Outputs**: A generated SVG or PNG map showing player gravity zones.
* **Tech Stack**: Python, Matplotlib, Pandas.

#### Feature 3: `pickleball-court-mapper` (Emerging Sports Trend)
* **Description**: A basic computer vision script using OpenCV to detect court lines or keypoints from a static image of a pickleball court.
* **Inputs**: A sample image of a pickleball court.
* **Outputs**: An annotated image showing detected court boundaries.
* **Tech Stack**: Python, OpenCV.

### 3.2 The Sports AI Hub (Web Application)
* **Description**: A modern, interactive web dashboard to replace/supplement the static README. It will display the categorized awesome list, the 2026 roadmap, and live visualizations.
* **Features**:
  * Interactive categorization and search for sports AI tools.
  * Live display of the generated SVGs (e.g., FIFA World Cup sync, WNBA gravity maps).
  * Direct links to the GitHub repository and "Good First Issues".
* **Tech Stack**: Vite + React + TypeScript + TailwindCSS (via `webdev_init_project`).

### 3.3 GitHub Infrastructure Upgrades
* **Description**: Enhancing the repository's operations to welcome contributors.
* **Features**:
  * Create specific GitHub Issue Templates for "Submit a Tool", "Propose a Mono-Tool", and "Bug Report".
  * Update CI/CD pipelines to ensure tests run on the new prototypes.

## 4. Execution Plan
1. **Phase 2**: Build `llm-match-commentator` prototype in Python.
2. **Phase 3**: Build `wnba-gravity-mapper` prototype in Python.
3. **Phase 4**: Build `pickleball-court-mapper` prototype in Python.
4. **Phase 5**: Initialize and build the `web-static` Sports AI Hub.
5. **Phase 6**: Finalize GitHub templates, package the repository, and deliver.

## 5. Success Metrics
* 3 working prototype scripts merged into the repository.
* 1 deployed/functional web application scaffolding.
* 100% completion of the updated GitHub issue templates.
