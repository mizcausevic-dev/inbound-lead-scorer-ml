import { featureWeights, fileSamples, modelArtifacts, scoredLeads } from "../data/sampleLeadScoring";

export function summary() {
  const healthy = featureWeights.filter((item) => item.health === "healthy").length;
  const attention = featureWeights.filter((item) => item.health !== "healthy").length;
  const priorityA = scoredLeads.filter((item) => item.band === "priority-a").length;

  return {
    featureCount: featureWeights.length,
    healthy,
    attention,
    priorityA,
    artifactCount: modelArtifacts.length,
    recommendation:
      "Score for buying readiness, not just activity volume, because noisy leads can look busy while hiding low conversion probability."
  };
}

export function modelFeatures() {
  return featureWeights;
}

export function scoringLane() {
  return scoredLeads;
}

export function artifacts() {
  return modelArtifacts.map((artifact) => ({
    ...artifact,
    sample: fileSamples[artifact.path]
  }));
}

export function verification() {
  return [
    "The repo treats scoring as a governed routing surface rather than a black-box number generator.",
    "Feature weights, thresholds, and lead explanations are visible enough for RevOps and sales ownership.",
    "Attribution quality and data confidence are modeled as first-class scoring inputs, not cleanup chores after routing."
  ];
}

export function payload() {
  return {
    dashboard: summary(),
    modelFeatures: modelFeatures(),
    scoringLane: scoringLane(),
    artifacts: artifacts(),
    verification: verification()
  };
}
