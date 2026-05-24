import { describe, expect, it } from "vitest";

import { artifacts, modelFeatures, payload, scoringLane, summary } from "./services/leadScoringService";

describe("inbound-lead-scorer-ml", () => {
  it("summary exposes scoring posture", () => {
    const result = summary();

    expect(result.featureCount).toBeGreaterThan(0);
    expect(result.artifactCount).toBeGreaterThan(0);
    expect(result.recommendation).toContain("buying readiness");
  });

  it("model features and scoring lane stay concrete", () => {
    expect(modelFeatures().some((item) => item.name.toLowerCase().includes("icp"))).toBe(true);
    expect(scoringLane().some((item) => item.band === "priority-a")).toBe(true);
    expect(artifacts().some((artifact) => artifact.path.includes("models/"))).toBe(true);
  });

  it("payload bundles the full scoring surface", () => {
    const result = payload();

    expect(result.dashboard.featureCount).toBe(result.modelFeatures.length);
    expect(result.scoringLane.length).toBeGreaterThan(0);
    expect(result.artifacts.length).toBeGreaterThan(0);
    expect(result.verification.length).toBe(3);
  });
});
