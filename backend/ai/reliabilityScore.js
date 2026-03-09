module.exports.calculateReliability = (params) => {
  // Support both Machine Reliability and Supply Chain Reliability
  if (params.totalTime !== undefined) {
    const { uptime, totalTime } = params;
    return totalTime === 0 ? 0 : Math.round((uptime / totalTime) * 100);
  }

  const { onTimeOrders, totalOrders } = params;
  return totalOrders === 0 ? 0 : Math.round((onTimeOrders / totalOrders) * 100);
};