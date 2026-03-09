module.exports.calculateExportScore = (params) => {
  // Support both legacy structured params and new direct marketAccess param
  if (params.marketAccess !== undefined) {
    return Math.round(params.marketAccess);
  }

  const {
    qualityScore = 80,
    deliveryScore = 80,
    complianceScore = 80,
    sustainabilityScore = 80
  } = params;

  const score = (qualityScore + deliveryScore + complianceScore + sustainabilityScore) / 4;
  return Math.round(score);
};