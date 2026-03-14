const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  jobId: String,
  jobName: String,
  machineId: String,
  task: String,
  start: Number,
  duration: Number,
  end: Number,
  color: String,
  optimizedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
