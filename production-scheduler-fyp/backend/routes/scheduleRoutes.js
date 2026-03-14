const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

router.get('/optimize', scheduleController.generateSchedule);
router.get('/latest', scheduleController.getLatestSchedule);

module.exports = router;
