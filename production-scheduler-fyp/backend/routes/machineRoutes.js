const express = require('express');
const router = express.Router();
const machineController = require('../controllers/machineController');

router.get('/', machineController.getMachines);
router.post('/', machineController.createMachine);
router.put('/:id', machineController.updateMachineStatus);

module.exports = router;
