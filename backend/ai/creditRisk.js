module.exports.analyzeCreditRisk = ({
  totalInvoices,
  totalDelayDays,
  score = 80
}) => {
  const avgDelay = totalInvoices === 0 ? 28 : (totalDelayDays / totalInvoices).toFixed(1);

  let risk = "Low";
  let status = "Excellent";

  if (score < 40) {
    risk = "High";
    status = "Critical";
  } else if (score < 70) {
    risk = "Moderate";
    status = "Review Required";
  }

  return {
    avgCollectionDays: avgDelay,
    riskScore: risk,
    status: status,
    score: score
  };
};