const mongoose = require('mongoose');

const MachineSchema = new mongoose.Schema({
  machineId: { type: String, required: true, unique: true },
  machineName: { type: String, required: true },
  status: { type: String, enum: ['idle', 'running', 'maintenance'], default: 'idle' },
  color: { type: String, default: '#6366f1' }
});

module.exports = mongoose.model('Machine', MachineSchema);
