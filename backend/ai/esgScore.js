module.exports.calculateESG = (downtimeHours, wasteKg) => {
  let score = 100;
  score -= downtimeHours * 5;
  score -= wasteKg * 2;
  const finalScore = score < 0 ? 0 : score;

  return {
    score: finalScore,
    zldStatus: "ACTIVE",
    rating: finalScore > 80 ? "Platinum" : finalScore > 50 ? "Gold" : "Silver",
    carbonFootprint: "Low"
  };
};