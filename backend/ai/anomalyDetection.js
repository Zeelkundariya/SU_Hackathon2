module.exports.detectAnomaly = (last7Days, todayValue) => {
  const avg = last7Days.length > 0
    ? last7Days.reduce((a, b) => a + b, 0) / last7Days.length
    : 100;

  const hasAnomaly = todayValue < avg * 0.7;

  return {
    hasAnomaly,
    type: hasAnomaly ? "⚠️ Production Drop" : "🟢 Normal",
    details: hasAnomaly
      ? `Output is ${Math.round((1 - todayValue / avg) * 100)}% below weekly average.`
      : "Process stability within ±15% threshold."
  };
};