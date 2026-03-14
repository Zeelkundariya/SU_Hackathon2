const Job = require('../models/Job');
const Machine = require('../models/Machine');
const Schedule = require('../models/Schedule');
const { optimizeScheduling } = require('../algorithms/geneticAlgorithm');

exports.generateSchedule = async (req, res) => {
  try {
    const jobs = await Job.find();
    const machines = await Machine.find();

    const result = optimizeScheduling({ jobs, machines });

    if (result.error) return res.status(400).json(result);

    // Clear old schedule and save new
    await Schedule.deleteMany({});
    await Schedule.insertMany(result.schedule);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLatestSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.find();
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
