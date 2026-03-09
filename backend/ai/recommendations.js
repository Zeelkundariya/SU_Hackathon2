module.exports.getRecommendations = ({
  healthScore,
  inventoryLow,
  delayRisk,
  pei
}) => {
  const actions = [];

  if (healthScore < 65)
    actions.push("Bhilwara Cluster Insight: Schedule preventative maintenance for Loom motors to avoid peak-hour outages.");

  if (inventoryLow)
    actions.push("Supply Chain Alert: Local yarn prices in Bhilwara are rising. Reorder raw material to lock current rates.");

  if (delayRisk && delayRisk.includes("High"))
    actions.push("Strategic Move: Optimize current loom utilization or outsource overflow to nearby cluster units.");

  if (pei < 75)
    actions.push("Efficiency Tip: Adjust shift timing to manage peak Rajasthan summer temperatures and labor fatigue.");

  return actions;
};