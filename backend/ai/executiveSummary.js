module.exports.getExecutiveSummary = ({
  pei,
  avgHealth,
  delayRisk,
  inventoryAlerts
}) => {
  const recommendation = pei < 80
    ? "Bhilwara SME Alert: Productivity is below cluster average (78%). Review loom downtime."
    : "SME Excellence: Factory is performing at Tier-1 efficiency levels for Bhilwara region.";

  return {
    pei,
    productionEfficiency: `${pei}%`,
    machineHealth: `${avgHealth}/100`,
    delayStatus: delayRisk,
    inventoryRisk: inventoryAlerts > 0 ? "⚠️ Critical Gap" : "🟢 Optimized",
    summary: `Command Center Report: Plant Efficiency is ${pei}%. ${recommendation}`,
    recommendation,
    strategicFocus: pei < 80 ? "Operational Efficiency" : "Market Expansion"
  };
};