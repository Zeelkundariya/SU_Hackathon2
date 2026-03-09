module.exports.predictDowntime = ({
    vibration = "Normal",
    temp = 45,
    uptimeHours = 100,
    machineType = "Loom"
}) => {
    let daysToNextService = 15; // Standard check-up
    let failureRisk = "Low";
    let impactPerHour = machineType === "Loom" ? 2500 : 5000; // ₹ lost per hour

    // AI Predictive Logic: Rajasthan Summer Context (High Temp)
    if (temp > 55) {
        daysToNextService -= 5;
        failureRisk = "Medium";
    }

    if (vibration === "High") {
        daysToNextService = 2;
        failureRisk = "CRITICAL";
    }

    if (uptimeHours > 500) {
        daysToNextService -= 3;
        if (failureRisk !== "CRITICAL") failureRisk = "Medium";
    }

    return {
        daysToNextService: Math.max(1, daysToNextService),
        failureRisk,
        maintenanceWindow: "Scheduled: 22nd Oct 10:00 PM",
        potentialLoss: `₹${(impactPerHour * 24).toLocaleString()}/day`
    };
};
