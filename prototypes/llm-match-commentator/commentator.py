#!/usr/bin/env python3
"""
llm-match-commentator
=====================
A RAG-style mono-tool that reads a JSON stream of match events and uses an LLM
to generate dynamic, localized sports commentary in English and Spanish.

Part of the awesome-sports-ai Phase 6 roadmap.
Input : sample_events.json (or any compatible match event file)
Output: Printed commentary stream + saved commentary_output.md
"""

import json
import os
import sys
from openai import OpenAI

# ── Configuration ─────────────────────────────────────────────────────────────
EVENTS_FILE = os.path.join(os.path.dirname(__file__), "sample_events.json")
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "commentary_output.md")
LANGUAGES   = ["English", "Spanish"]

# ── Load match data ────────────────────────────────────────────────────────────
def load_events(path: str) -> dict:
    with open(path, "r") as f:
        return json.load(f)

# ── Build a context string for the LLM ────────────────────────────────────────
def build_context(match: dict) -> str:
    return (
        f"Match: {match['home_team']} vs {match['away_team']}\n"
        f"Competition: {match['competition']}\n"
        f"Venue: {match['venue']}\n"
        f"Date: {match['date']}"
    )

# ── Generate commentary for a single event ────────────────────────────────────
def generate_commentary(client: OpenAI, context: str, event: dict, language: str) -> str:
    player_str = f"Player: {event['player']}. " if event.get("player") else ""
    team_str   = f"Team: {event['team']}. "    if event.get("team")   else ""

    prompt = (
        f"You are a passionate, professional sports commentator for a major international football match.\n"
        f"Match context:\n{context}\n\n"
        f"Event at minute {event['minute']}:\n"
        f"  Type: {event['type'].replace('_', ' ').title()}\n"
        f"  {team_str}{player_str}Detail: {event['detail']}\n\n"
        f"Write ONE vivid, energetic commentary sentence in {language} for this event. "
        f"Keep it under 40 words. Do not add any extra explanation."
    )

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=80,
        temperature=0.85,
    )
    return response.choices[0].message.content.strip()

# ── Main ───────────────────────────────────────────────────────────────────────
def main():
    data    = load_events(EVENTS_FILE)
    match   = data["match"]
    events  = data["events"]
    context = build_context(match)
    client  = OpenAI()

    lines = []
    header = (
        f"# LLM Match Commentator — {match['home_team']} vs {match['away_team']}\n"
        f"**Competition**: {match['competition']}  \n"
        f"**Venue**: {match['venue']}  \n"
        f"**Date**: {match['date']}\n\n"
        f"---\n"
    )
    print(header)
    lines.append(header)

    for event in events:
        minute = event["minute"]
        etype  = event["type"].replace("_", " ").title()
        block  = f"## ⏱ {minute}' — {etype}\n"
        print(block, end="")
        lines.append(block)

        for lang in LANGUAGES:
            flag = "🇺🇸" if lang == "English" else "🇲🇽"
            try:
                commentary = generate_commentary(client, context, event, lang)
            except Exception as e:
                commentary = f"[Error generating {lang} commentary: {e}]"
            line = f"{flag} **{lang}**: {commentary}\n"
            print(line, end="")
            lines.append(line)

        lines.append("\n")
        print()

    # Save output
    with open(OUTPUT_FILE, "w") as f:
        f.writelines(lines)
    print(f"\n✅ Commentary saved to: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
