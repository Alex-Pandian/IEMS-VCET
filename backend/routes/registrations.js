const express = require('express');
const { addRegistration, getRegistrations } = require('../controllers/registrationController');
const router = express.Router();

router.get('/get/:event_id', getRegistrations);
router.post('/add', addRegistration);

module.exports = router;