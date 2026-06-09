import { artifacts, modelFeatures, scoringLane, summary, verification } from "./leadScoringService";

function pageShell(title: string, activeRoute: string, body: string) {
  const nav = [
    { href: "/", label: "Overview & Export" },
    { href: "/scoring-lane", label: "Scoring Lane" },
    { href: "/model-features", label: "Model Features" },
    { href: "/verification", label: "Operator Verification" },
    { href: "/docs", label: "Integration Docs" }
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    :root {
      --bg: #09101d;
      --border: rgba(148, 163, 184, 0.18);
      --text: #e7eefb;
      --muted: #9eb1cf;
      --amber: #fbbf24;
      --mono: "IBM Plex Mono", Consolas, monospace;
      --sans: "IBM Plex Sans", "Segoe UI", sans-serif;
      --serif: "IBM Plex Serif", Georgia, serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: var(--sans);
      background:
        radial-gradient(circle at top left, rgba(59, 130, 246, 0.16), transparent 24%),
        radial-gradient(circle at top right, rgba(16, 185, 129, 0.12), transparent 18%),
        var(--bg);
      color: var(--text);
    }
    .wrap { width: min(1360px, calc(100% - 48px)); margin: 24px auto 48px; }
    .hero {
      display: grid;
      grid-template-columns: 1fr 260px;
      gap: 24px;
      padding: 26px 32px;
      border: 1px solid var(--border);
      border-radius: 28px;
      background: rgba(9, 16, 29, 0.84);
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.3);
    }
    .eyebrow, .panel-label, .kicker, .tab, .status-pill, .mini {
      font-family: var(--mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .eyebrow {
      display: inline-flex;
      gap: 16px;
      align-items: center;
      margin-bottom: 18px;
      color: var(--muted);
      font-size: 13px;
    }
    .eyebrow strong {
      color: #7db5ff;
      border: 1px solid rgba(59,130,246,0.35);
      padding: 9px 14px;
      border-radius: 8px;
    }
    h1 {
      margin: 0 0 10px;
      font-family: var(--serif);
      font-size: clamp(48px, 5vw, 70px);
      line-height: 0.98;
    }
    h1 span {
      background: linear-gradient(90deg, #60a5fa, #34d399);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .lede {
      margin: 0;
      max-width: 980px;
      color: var(--muted);
      font-size: 18px;
      line-height: 1.6;
    }
    .posture {
      border: 1px solid var(--border);
      border-radius: 20px;
      background: rgba(15, 23, 42, 0.9);
      padding: 28px 24px;
      align-self: start;
    }
    .posture .panel-label { color: #91a3c6; font-size: 12px; margin-bottom: 14px; }
    .posture .status-line { font-size: 15px; font-family: var(--mono); font-weight: 600; }
    .tabs { display: flex; flex-wrap: wrap; gap: 16px; margin: 22px 0 34px; }
    .tab {
      display: inline-flex;
      align-items: center;
      padding: 17px 28px;
      border: 1px solid var(--border);
      border-radius: 999px;
      color: #93a7c7;
      background: rgba(15, 23, 42, 0.8);
      font-size: 14px;
      text-decoration: none;
    }
    .tab.active {
      color: white;
      background: linear-gradient(135deg, #2563eb, #3b82f6);
      border-color: rgba(59,130,246,0.55);
      box-shadow: 0 18px 36px rgba(37, 99, 235, 0.3);
    }
    .section-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; }
    .depth-grid {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 18px;
      margin: 24px 0;
    }
    .depth-card {
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 22px;
      padding: 22px;
      background:
        linear-gradient(180deg, rgba(20, 33, 58, 0.78), rgba(15, 23, 42, 0.72)),
        rgba(15, 23, 42, 0.82);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 18px 42px rgba(0,0,0,0.18);
    }
    .depth-card h3 {
      margin: 10px 0 10px;
      font-size: 20px;
      line-height: 1.25;
    }
    .depth-card p {
      margin: 0;
      color: var(--muted);
      font-size: 14px;
      line-height: 1.55;
    }
    .card {
      background: rgba(15, 23, 42, 0.88);
      border: 1px solid var(--border);
      border-radius: 26px;
      padding: 28px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    }
    .metric { grid-column: span 3; min-height: 170px; }
    .metric .value { font-size: 60px; font-weight: 700; line-height: 1; margin: 22px 0 8px; }
    .metric .panel-label { color: #78b4ff; font-size: 12px; }
    .metric p, .section-copy, .feature-item p, .lead-item p, .artifact p, .verify-list li, .spec-box p {
      margin: 0;
      color: var(--muted);
      font-size: 15px;
      line-height: 1.6;
    }
    .highlight { grid-column: 1 / -1; border-color: rgba(251, 191, 36, 0.2); }
    .highlight .kicker { color: var(--amber); font-size: 13px; }
    .highlight h2 { margin: 12px 0 10px; font-size: 26px; line-height: 1.35; }
    .split-left { grid-column: span 7; }
    .split-right { grid-column: span 5; }
    .section-title { margin: 10px 0 10px; font-size: 24px; }
    .feature-list, .lead-list, .artifact-list, .verify-list { display: grid; gap: 16px; }
    .feature-item, .lead-item, .artifact {
      border: 1px solid var(--border);
      border-radius: 22px;
      padding: 22px;
      background: rgba(18, 29, 51, 0.62);
    }
    .node-top { display: flex; justify-content: space-between; gap: 18px; align-items: start; }
    .feature-item h3, .lead-item h3, .artifact h3 { margin: 10px 0 10px; font-size: 25px; }
    .status-pill {
      padding: 8px 12px;
      border-radius: 999px;
      font-size: 12px;
      border: 1px solid var(--border);
    }
    .healthy { color: #34d399; border-color: rgba(16,185,129,0.32); background: rgba(16,185,129,0.12); }
    .watch { color: #fbbf24; border-color: rgba(251,191,36,0.26); background: rgba(251,191,36,0.1); }
    .critical { color: #fb7185; border-color: rgba(251,113,133,0.24); background: rgba(251,113,133,0.1); }
    .mini { font-size: 12px; color: #78a8ff; margin-bottom: 12px; }
    .artifact pre {
      margin: 16px 0 0;
      padding: 18px;
      border-radius: 16px;
      overflow: auto;
      background: #0a1327;
      color: #c4d6f5;
      border: 1px solid rgba(148, 163, 184, 0.12);
      font-family: var(--mono);
      font-size: 14px;
      line-height: 1.6;
      white-space: pre-wrap;
    }
    .docs-note { display: grid; grid-template-columns: 1.25fr 0.85fr; gap: 24px; }
    .spec-box {
      border: 1px solid var(--border);
      border-radius: 22px;
      padding: 24px;
      background: rgba(18, 29, 51, 0.6);
    }
    .spec-box strong { display: block; margin-bottom: 12px; font-size: 16px; }
    code { color: #9cc6ff; font-family: var(--mono); }
    @media (max-width: 1100px) {
      .hero, .docs-note { grid-template-columns: 1fr; }
      .depth-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .metric { grid-column: span 6; }
      .split-left, .split-right { grid-column: 1 / -1; }
    }
    @media (max-width: 720px) {
      .wrap { width: min(100% - 24px, 100%); }
      .hero, .card { padding: 22px; }
      .depth-grid { grid-template-columns: 1fr; }
      .metric { grid-column: 1 / -1; }
      .tabs { gap: 12px; }
      .tab { width: 100%; justify-content: center; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <section class="hero">
      <div>
        <div class="eyebrow"><strong>Kinetic Gain</strong><span>• Lead Prioritization Control Plane</span></div>
        <h1>Inbound Lead <span>Scorer ML</span></h1>
        <p class="lede">Revenue-priority scoring surface for inbound leads: firmographic fit, intent behavior, attribution quality, buying-committee depth, and routing-safe score explanations.</p>
      </div>
      <aside class="posture">
        <div class="panel-label">Routing Posture</div>
        <div class="status-line">● RevOps + Growth + Sales Alignment</div>
      </aside>
    </section>

    <nav class="tabs">
      ${nav.map((item) => `<a class="tab ${item.href === activeRoute ? "active" : ""}" href="${item.href}">${item.label}</a>`).join("")}
    </nav>

    ${body}
  </div>
</body>
</html>`;
}

function statusClass(status: string) {
  if (status === "healthy") return "healthy";
  if (status === "watch") return "watch";
  return "critical";
}

function renderProductDepth() {
  const cards = [
    {
      label: "Product depth",
      title: "What this product does",
      body: "Turns raw inbound demand into an explainable routing queue: which accounts deserve immediate sales motion, which need enrichment, and which should stay in nurture because the signal quality is not trustworthy yet."
    },
    {
      label: "GTM analyst lens",
      title: "Where revenue teams use it",
      body: "A SaaS go-to-market analyst can compare lead source quality, intent depth, ICP fit, buying-committee breadth, and handoff speed without arguing from disconnected CRM fields or campaign anecdotes."
    },
    {
      label: "Value architecture",
      title: "Where the money leaks",
      body: "The value case is avoided sales waste: fewer bad-fit AE handoffs, faster treatment for high-conviction accounts, cleaner attribution decisions, and clearer proof when a channel is producing pipeline versus noise."
    },
    {
      label: "Technical proof",
      title: "What is inspectable",
      body: "Feature weights, threshold bands, sample training rows, JSON endpoints, prerendered pages, and verification checks are exposed so technical reviewers can inspect how scoring decisions become routing posture."
    },
    {
      label: "Portfolio pattern",
      title: "What these repos share",
      body: "The common layer is not a demo page. It is a board-readable operating surface: scored risks, named owners, evidence artifacts, remediation actions, and public proof that the system can be reviewed."
    }
  ];

  return `<section class="depth-grid" aria-label="Product depth">
    ${cards
      .map(
        (card) => `<article class="depth-card">
          <div class="mini">${card.label}</div>
          <h3>${card.title}</h3>
          <p>${card.body}</p>
        </article>`
      )
      .join("")}
  </section>`;
}

export function renderOverview() {
  const dashboard = summary();
  const samples = artifacts().slice(0, 2);

  return pageShell(
    "Inbound Lead Scorer ML",
    "/",
    `<section>
      <div class="section-grid">
        <article class="card metric"><div class="panel-label">Model Features</div><div class="value">${dashboard.featureCount}</div><p>Signals modeled across fit, behavior, attribution, committee depth, and data confidence.</p></article>
        <article class="card metric"><div class="panel-label">Healthy & Attention</div><div class="value">${dashboard.healthy}<span style="font-size:28px;color:#fbbf24;"> / ${dashboard.attention}</span></div><p>Healthy versus attention-required model inputs before routing confidence degrades.</p></article>
        <article class="card metric"><div class="panel-label">Priority A Leads</div><div class="value">${dashboard.priorityA}</div><p>Leads currently crossing the highest-priority routing threshold.</p></article>
        <article class="card metric"><div class="panel-label">Model Files</div><div class="value">${dashboard.artifactCount}</div><p>Artifacts covering feature weights, thresholds, and representative training context.</p></article>

        <article class="card highlight">
          <div class="kicker">Critical routing recommendation</div>
          <h2>"${dashboard.recommendation}"</h2>
          <p>Best use case: inbound funnels where speed-to-lead matters, but routing bad-fit or dirty-data leads too quickly creates real sales waste.</p>
        </article>
      </div>

      ${renderProductDepth()}

      <div class="section-grid">
        <article class="card split-left">
          <div class="panel-label">Scoring Surface</div>
          <h2 class="section-title">Make lead priority explainable enough to trust.</h2>
          <p class="section-copy">This control plane keeps scoring transparent so RevOps, growth, and sales leaders can see why a lead gets escalated instead of inheriting a black-box score.</p>
          <div class="feature-list">
            ${modelFeatures()
              .slice(0, 3)
              .map(
                (item) => `<div class="feature-item">
                  <div class="node-top">
                    <div>
                      <div class="mini">${item.owner} • weight ${item.weight}</div>
                      <h3>${item.name}</h3>
                    </div>
                    <span class="status-pill ${statusClass(item.health)}">${item.health}</span>
                  </div>
                  <p>${item.rule}</p>
                </div>`
              )
              .join("")}
          </div>
        </article>

        <article class="card split-right">
          <div class="panel-label">Model Artifacts</div>
          <h2 class="section-title">Scoring logic you can inspect.</h2>
          <p class="section-copy">The repo includes simple scoring specimens that make weights, thresholds, and model context visible enough for operator review.</p>
          <div class="artifact-list">
            ${samples
              .map(
                (artifact) => `<div class="artifact">
                  <div class="mini">${artifact.category}</div>
                  <h3>${artifact.path}</h3>
                  <p>${artifact.summary}</p>
                </div>`
              )
              .join("")}
          </div>
        </article>
      </div>
    </section>`
  );
}

export function renderScoringLane() {
  return pageShell(
    "Inbound Lead Scorer ML - Scoring Lane",
    "/scoring-lane",
    `<section>
      <div class="section-grid">
        <article class="card split-left">
          <div class="panel-label">Scoring Lane</div>
          <h2 class="section-title">Every score should map cleanly to a routing decision.</h2>
          <p class="section-copy">These modeled leads show how fit, intent, and data quality translate into explainable priority bands instead of generic numeric rankings.</p>
          <div class="lead-list">
            ${scoringLane()
              .map(
                (lead) => `<div class="lead-item">
                  <div class="node-top">
                    <div>
                      <div class="mini">${lead.id} • ${lead.source} • ${lead.contact}</div>
                      <h3>${lead.company}</h3>
                    </div>
                    <span class="status-pill ${statusClass(lead.health)}">${lead.band} • ${lead.score}</span>
                  </div>
                  <p><strong style="display:block;color:#d8e6ff;margin-bottom:8px;">Rationale</strong>${lead.rationale}</p>
                  <p style="margin-top:12px;"><strong style="display:block;color:#d8e6ff;margin-bottom:8px;">Next action</strong>${lead.nextAction}</p>
                </div>`
              )
              .join("")}
          </div>
        </article>

        <article class="card split-right">
          <div class="panel-label">Routing Goals</div>
          <h2 class="section-title">What this lane protects.</h2>
          <div class="verify-list">
            <li>Prioritize high-fit, high-intent leads without overreacting to shallow engagement.</li>
            <li>Expose low-confidence data before it creates false urgency in the sales queue.</li>
            <li>Give growth, RevOps, and sales a shared explanation layer for score-based routing.</li>
            <li>Separate nurture and enrichment candidates from true handoff-ready pipeline.</li>
          </div>
        </article>
      </div>
    </section>`
  );
}

export function renderModelFeatures() {
  return pageShell(
    "Inbound Lead Scorer ML - Model Features",
    "/model-features",
    `<section>
      <div class="section-grid">
        <article class="card split-left">
          <div class="panel-label">Model Features</div>
          <h2 class="section-title">Feature logic needs operator ownership, not just model math.</h2>
          <p class="section-copy">These scoring inputs show where routing confidence comes from and where quality breaks down.</p>
          <div class="feature-list">
            ${modelFeatures()
              .map(
                (item) => `<div class="feature-item">
                  <div class="node-top">
                    <div>
                      <div class="mini">${item.id} • ${item.owner}</div>
                      <h3>${item.name}</h3>
                    </div>
                    <span class="status-pill ${statusClass(item.health)}">weight ${item.weight}</span>
                  </div>
                  <p><strong style="display:block;color:#d8e6ff;margin-bottom:8px;">Rule</strong>${item.rule}</p>
                  <p style="margin-top:12px;"><strong style="display:block;color:#d8e6ff;margin-bottom:8px;">Risk</strong>${item.risk}</p>
                </div>`
              )
              .join("")}
          </div>
        </article>

        <article class="card split-right">
          <div class="panel-label">Model Artifacts</div>
          <h2 class="section-title">Files behind the scoring posture.</h2>
          <div class="artifact-list">
            ${artifacts()
              .map(
                (artifact) => `<div class="artifact">
                  <div class="mini">${artifact.category}</div>
                  <h3>${artifact.path}</h3>
                  <p>${artifact.summary}</p>
                  <pre>${artifact.sample}</pre>
                </div>`
              )
              .join("")}
          </div>
        </article>
      </div>
    </section>`
  );
}

export function renderVerification() {
  return pageShell(
    "Inbound Lead Scorer ML - Verification",
    "/verification",
    `<section>
      <div class="section-grid">
        <article class="card split-left">
          <div class="panel-label">Verification</div>
          <h2 class="section-title">What this repo proves.</h2>
          <div class="verify-list">
            ${verification().map((item) => `<li>${item}</li>`).join("")}
          </div>
        </article>
        <article class="card split-right">
          <div class="panel-label">Operator Checkpoints</div>
          <div class="verify-list">
            <li>Feature weights, thresholds, and routing outcomes are inspectable.</li>
            <li>Lead scoring explanations stay readable enough for revenue teams to challenge or trust.</li>
            <li>Dirty attribution and low-confidence data are treated as scoring risks, not ignored noise.</li>
          </div>
        </article>
      </div>
    </section>`
  );
}

export function renderDocs() {
  return pageShell(
    "Inbound Lead Scorer ML - Docs",
    "/docs",
    `<section>
      <div class="section-grid docs-note">
        <article class="card">
          <div class="panel-label">System Artifact / Principal Technical Spec</div>
          <h2 class="section-title" style="font-size:48px; line-height:1.06;">Inbound Lead Scoring Architecture</h2>
          <p class="section-copy">How to route inbound pipeline using fit, behavior, and attribution signals without hiding the scoring logic from operators.</p>
          ${renderProductDepth()}
          <div class="spec-box">
            <strong>Primary purpose</strong>
            <p>The <code>inbound-lead-scorer-ml</code> repo models the ranking layer that sits between captured demand and sales routing. It makes feature weights, thresholds, and lead explanations visible enough for RevOps ownership.</p>
          </div>
          <div class="spec-box" style="margin-top:18px;">
            <strong>Application shape mapping</strong>
            <p><code>src/app.ts</code> hosts HTML diagnostics and JSON scoring endpoints. <code>models/</code> contains the scorecard specimens that drive routing posture.</p>
          </div>
        </article>
        <aside class="card">
          <div class="panel-label">Spec Classification</div>
          <div class="verify-list">
            <li><strong style="display:block;color:#d8e6ff;">Target platform</strong>Node.js Web Runtime (Express / Vite-friendly)</li>
            <li><strong style="display:block;color:#d8e6ff;">Architecture role</strong>Director of Web & GTM Systems</li>
            <li><strong style="display:block;color:#34d399;">Signal metric target</strong>95% Conversion Coherence</li>
            <li><strong style="display:block;color:#d8e6ff;">Active focus</strong>Lead ranking, score explainability, attribution-aware routing, RevOps signal quality</li>
          </div>
        </aside>
      </div>
    </section>`
  );
}
