module.exports.calculateSkillIndex = ({
  trainingHours = 20
}) => {
  // Bhilwara-specific labor skill logic
  // Higher training hours = higher skill index
  const baseSkill = 65;
  const trainingBonus = Math.min(35, trainingHours * 0.8);

  return {
    overallScore: Math.round(baseSkill + trainingBonus)
  };
};