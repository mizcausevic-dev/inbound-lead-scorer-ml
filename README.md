# Inbound Lead Scorer ML

Board-ready Kinetic Gain surface for scoring inbound leads using fit, behavior, attribution, and pipeline-priority signals.

- Live: [http://leads.kineticgain.com/](http://leads.kineticgain.com/)
- Repo: [https://github.com/mizcausevic-dev/inbound-lead-scorer-ml](https://github.com/mizcausevic-dev/inbound-lead-scorer-ml)

## What it shows

- weighted scoring inputs across fit, behavior, attribution, committee depth, and data confidence
- modeled lead-ranking decisions with explainable priority bands
- concrete model artifacts for feature weights, thresholds, and training context
- operator verification for score-based routing trust

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
