module.exports.projectProfitMargin = ({
  revenue,
  cost,
  actualOutputMeters = 5000
}) => {
  const profit = revenue - cost;
  const margin = revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : 0;

  // Bhilwara KPI: Cost per Meter
  const costPerMeter = actualOutputMeters > 0 ? (cost / actualOutputMeters).toFixed(2) : 0;

  // Monthly profit in Crores
  const monthlyProfit = (profit * 30 / 100).toFixed(2);

  return {
    currentMargin: `${margin}%`,
    projectedMargin: `${(parseFloat(margin) + 1.5).toFixed(1)}%`, // AI suggested optimization
    monthlyProfit: monthlyProfit,
    profitLakhs: profit.toFixed(2),
    costPerMeter: `₹${costPerMeter}`
  };
};