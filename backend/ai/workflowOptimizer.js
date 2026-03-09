module.exports.optimizeWorkflow = ({
    greyMeters = 5000,
    dyedMeters = 3000,
    finishedMeters = 2000
}) => {
    let bottleneck = "None";
    let suggestion = "Workflow is balanced.";
    let efficiencyBoost = "0%";

    // Analyze the Bhilwara Textile Pipe
    if (greyMeters > dyedMeters * 1.5) {
        bottleneck = "Dyeing Unit";
        suggestion = "High Grey stock detected. Temporarily reassign 2 weavers to the Dyeing prep team.";
        efficiencyBoost = "12%";
    } else if (dyedMeters > finishedMeters * 1.5) {
        bottleneck = "Finishing Section";
        suggestion = "Fabric piling in Dyeing. Scale up Stenter machine hours to clear finishing backlog.";
        efficiencyBoost = "8%";
    }

    return {
        bottleneck,
        recommendedAction: suggestion,
        projectedEfficiencyGain: efficiencyBoost,
        optimizedSequence: ["Grey Inspection", "Dyeing Batch 4A", "Finishing High-Speed"]
    };
};
