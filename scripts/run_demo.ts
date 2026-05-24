import { scoringLane, summary } from "../src/services/leadScoringService";

console.log("inbound-lead-scorer-ml demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(scoringLane(), null, 2));
