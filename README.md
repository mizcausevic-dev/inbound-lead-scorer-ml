# Inbound Lead Scorer ML

Board-ready Kinetic Gain surface for scoring inbound leads using fit, behavior, attribution, and pipeline-priority signals.

- Live: [http://leads.kineticgain.com/](http://leads.kineticgain.com/)
- Repo: [https://github.com/mizcausevic-dev/inbound-lead-scorer-ml](https://github.com/mizcausevic-dev/inbound-lead-scorer-ml)

## What it shows

- weighted scoring inputs across fit, behavior, attribution, committee depth, and data confidence
- modeled lead-ranking decisions with explainable priority bands
- concrete model artifacts for feature weights, thresholds, and training context
- operator verification for score-based routing trust

## What this product does

`inbound-lead-scorer-ml` turns raw inbound demand into an explainable routing queue. It shows which accounts deserve immediate sales motion, which need enrichment, and which should stay in nurture because the signal quality is not trustworthy yet.

A SaaS go-to-market analyst can use it to compare lead source quality, intent depth, ICP fit, buying-committee breadth, and handoff speed without arguing from disconnected CRM fields or campaign anecdotes. A SaaS value architect can use it to show where money leaks: bad-fit AE handoffs, slow response to high-conviction accounts, unclear attribution, and channels that create activity without pipeline.

Technically, the repo exposes feature weights, threshold bands, sample training rows, JSON endpoints, prerendered pages, and verification checks. The common Kinetic Gain pattern is a board-readable operating surface: scored risks, named owners, evidence artifacts, remediation actions, and public proof that the system can be reviewed.

## Screenshots

### Overview

![Overview proof](./screenshots/01-overview-proof.png)

### Scoring Lane

![Scoring lane proof](./screenshots/02-scoring-lane-proof.png)

### Model Features

![Model features proof](./screenshots/03-model-features-proof.png)

## Routes

- `/`
- `/scoring-lane`
- `/model-features`
- `/verification`
- `/docs`

## API

- `/api/dashboard/summary`
- `/api/scoring-lane`
- `/api/model-features`
- `/api/model-artifacts`
- `/api/verification`
- `/api/sample`

## Local development

```powershell
cd inbound-lead-scorer-ml
npm install
npm run dev
```

Then open:

- `http://127.0.0.1:5428/`
- `http://127.0.0.1:5428/scoring-lane`
- `http://127.0.0.1:5428/model-features`
- `http://127.0.0.1:5428/verification`
- `http://127.0.0.1:5428/docs`

## Validation

```powershell
npm run verify
npm run prerender
npm run render:assets
```

## Documentation

- [docs/architecture.md](./docs/architecture.md)
- [docs/ORIGIN.md](./docs/ORIGIN.md)
