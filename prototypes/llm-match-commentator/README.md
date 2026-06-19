# llm-match-commentator

> **Phase 6 Prototype** — Part of the [Awesome Sports AI](../../README.md) 2026 Roadmap.

A RAG-style mono-tool that reads a JSON stream of match events and uses an LLM to generate dynamic, localized sports commentary in multiple languages. Designed to democratize the kind of automated commentary tools used by enterprise providers like Stats Perform and WSC Sport.

## Enterprise Capability Decomposed

| Enterprise System | What it does | What this tool replaces |
|---|---|---|
| Stats Perform / WSC Sport | Generates automated match recaps and commentary at scale | This tool provides the same LLM-driven commentary from any structured event stream |

## How It Works

1. A match event JSON file is loaded (e.g., `sample_events.json`).
2. For each event (goal, foul, substitution, etc.), a structured prompt is built with full match context.
3. The prompt is sent to an LLM (OpenAI `gpt-4o-mini`) to generate one vivid commentary sentence.
4. Commentary is generated in **English** and **Spanish** for each event.
5. The full output is saved to `commentary_output.md`.

## Usage

```bash
# Install dependencies
pip install openai

# Set your OpenAI API key
export OPENAI_API_KEY="your-key-here"

# Run the commentator
python3 commentator.py
```

## Input Format (`sample_events.json`)

```json
{
  "match": { "home_team": "USA", "away_team": "Mexico", ... },
  "events": [
    { "minute": 18, "type": "goal", "team": "USA", "player": "Folarin Balogun", "detail": "Header from a corner kick, 1-0 USA" },
    ...
  ]
}
```

## Output Format (`commentary_output.md`)

```
## ⏱ 18' — Goal
🇺🇸 English: Balogun rises highest to power home a header from the corner — USA take the lead!
🇲🇽 Spanish: ¡Balogun se eleva para rematar de cabeza y poner a Estados Unidos en ventaja!
```

## Extending This Tool

- Add more languages by appending to the `LANGUAGES` list in `commentator.py`.
- Swap the LLM model to a locally hosted model (e.g., via Ollama) for offline use.
- Connect to a live event stream API (e.g., StatsBomb, ESPN) to generate real-time commentary.

## Sports Tag

_Sports: Soccer, Multi-sport._
