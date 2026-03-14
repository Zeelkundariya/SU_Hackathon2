const Machine = require('../models/Machine');

exports.getMachines = async (req, res) => {
  try {
    const machines = await Machine.find();
    res.json(machines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMachine = async (req, res) => {
  try {
    const newMachine = new Machine(req.body);
    await newMachine.save();
    res.status(201).json(newMachine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateMachineStatus = async (req, res) => {
  try {
    const machine = await Machine.findOneAndUpdate(
      { machineId: req.params.id },
      { status: req.body.status },
      { new: true }
    );
    res.json(machine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
