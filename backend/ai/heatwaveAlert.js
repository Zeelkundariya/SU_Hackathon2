module.exports.checkHeatwave = (temperature) => {
  const isHeatwave = temperature > 42;

  if (isHeatwave)
    return {
      isHeatwave: true,
      alert: "⚠️ Extreme Heat Alert - Productivity may drop 5-8%",
      recommendation: "Increase shift rotation and cooling for plant floor staff."
    };

  return {
    isHeatwave: false,
    alert: "🟢 Temperature Normal",
    recommendation: "Stable operations. No climate-related adjustments needed."
  };
};