export type Health = "healthy" | "watch" | "critical";

export const featureWeights = [
  {
    id: "feat-01",
    name: "ICP fit score",
    health: "healthy" as Health,
    owner: "revops",
    weight: 28,
    rule: "Measure employee band, revenue range, vertical alignment, and buyer-role match against the current ICP.",
    risk: "Weak fit wastes sales time even when engagement looks strong."
  },
  {
    id: "feat-02",
    name: "High-intent behavior",
    health: "healthy" as Health,
    owner: "growth-ops",
    weight: 24,
    rule: "Score demo requests, pricing-page depth, repeat visits, and high-signal content consumption above shallow traffic.",
    risk: "Vanity engagement can crowd out real buying behavior."
  },
  {
    id: "feat-03",
    name: "Attribution quality",
    health: "watch" as Health,
    owner: "analytics",
    weight: 16,
    rule: "Favor sourced organic, partner, and high-converting paid channels while downgrading low-trust or unattributed sessions.",
    risk: "Dirty attribution inflates weak leads and hides channel waste."
  },
  {
    id: "feat-04",
    name: "Buying committee depth",
    health: "watch" as Health,
    owner: "sales-strategy",
    weight: 18,
    rule: "Increase score when multiple stakeholders from the same account engage within a short decision window.",
    risk: "Single-threaded interest looks warmer than it really is."
  },
  {
    id: "feat-05",
    name: "Data confidence",
    health: "critical" as Health,
    owner: "data-governance",
    weight: 14,
    rule: "Suppress score escalation when key firmographic or contact fields are missing, stale, or inconsistent.",
    risk: "Confident ranking on poor data creates false urgency and routing mistakes."
  }
];

export const scoredLeads = [
  {
    id: "lead-001",
    company: "Northlake Health Systems",
    contact: "VP Revenue Operations",
    score: 91,
    band: "priority-a",
    health: "healthy" as Health,
    source: "organic_search",
    rationale: "Strong ICP match, high-intent pricing behavior, and three engaged stakeholders in a 10-day window.",
    nextAction: "Route to enterprise AE within 5 minutes and attach attribution notes to the handoff."
  },
  {
    id: "lead-002",
    company: "Crestline Labs",
    contact: "Growth Manager",
    score: 68,
    band: "priority-b",
    health: "watch" as Health,
    source: "paid_social",
    rationale: "Good engagement depth but weaker firmographic fit and partial attribution confidence.",
    nextAction: "Keep in SDR queue, enrich firmographics, and validate channel quality before escalation."
  },
  {
    id: "lead-003",
    company: "Unmapped Ventures",
    contact: "Unknown",
    score: 34,
    band: "hold",
    health: "critical" as Health,
    source: "unattributed",
    rationale: "Missing contact role, low data confidence, and no meaningful buying-signal sequence.",
    nextAction: "Block automatic routing and push to enrichment or nurture instead of direct sales follow-up."
  }
];

export const modelArtifacts = [
  {
    path: "models/feature-weights.json",
    category: "Feature weights",
    summary: "Weighted scoring logic for firmographic fit, intent, attribution quality, committee depth, and data confidence."
  },
  {
    path: "models/threshold-playbook.yml",
    category: "Threshold playbook",
    summary: "Priority bands, routing actions, and score-based escalation rules for inbound operations."
  },
  {
    path: "models/training-snapshot.csv",
    category: "Training snapshot",
    summary: "Representative labeled lead history showing win outcomes, lagged conversion, and feature context."
  }
];

export const fileSamples: Record<string, string> = {
  "models/feature-weights.json": `{\n  "icp_fit_score": 0.28,\n  "high_intent_behavior": 0.24,\n  "attribution_quality": 0.16,\n  "buying_committee_depth": 0.18,\n  "data_confidence": 0.14\n}\n`,
  "models/threshold-playbook.yml": `priority_bands:\n  priority_a:\n    min_score: 85\n    route_to: enterprise_ae\n    sla_minutes: 5\n  priority_b:\n    min_score: 60\n    route_to: sdr_queue\n    sla_minutes: 30\n  hold:\n    min_score: 0\n    route_to: enrichment_or_nurture\n    sla_minutes: null\n`,
  "models/training-snapshot.csv": `company,source,intent_events,committee_contacts,won\nNorthlake Health Systems,organic_search,12,3,1\nCrestline Labs,paid_social,7,1,0\nAtlas Procurement,partner_referral,9,2,1\nUnmapped Ventures,unattributed,1,0,0\n`
};
