import express from "express";

import { artifacts, modelFeatures, payload, scoringLane, summary, verification } from "./services/leadScoringService";
import { renderDocs, renderModelFeatures, renderOverview, renderScoringLane, renderVerification } from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5428);

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/scoring-lane", (_req, res) => res.type("html").send(renderScoringLane()));
app.get("/model-features", (_req, res) => res.type("html").send(renderModelFeatures()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/scoring-lane", (_req, res) => res.json(scoringLane()));
app.get("/api/model-features", (_req, res) => res.json(modelFeatures()));
app.get("/api/model-artifacts", (_req, res) => res.json(artifacts()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`Inbound Lead Scorer ML listening on http://127.0.0.1:${port}`);
  });
}

export default app;
