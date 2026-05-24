# Inbound Lead Scorer ML Architecture

`inbound-lead-scorer-ml` models the ranking layer that sits between captured demand and sales routing. It turns feature weighting, threshold logic, data confidence, and lead explanations into one operator surface.

## Core surfaces

- `Overview`
  - dashboard summary of feature posture, attention-required inputs, and high-priority leads
- `Scoring Lane`
  - lead-by-lead view of score rationale, routing band, and next action
- `Model Features`
  - scoring-input view across fit, behavior, attribution, committee depth, and data confidence
- `Verification`
  - concise proof of what the repo demonstrates
- `Docs`
  - architecture explanation and model specimen context

## Artifact model

- `models/feature-weights.json`
- `models/threshold-playbook.yml`
- `models/training-snapshot.csv`

These artifacts anchor the HTML views and API payloads, giving the repo a concrete lead-scoring control surface rather than a vague scoring dashboard.
