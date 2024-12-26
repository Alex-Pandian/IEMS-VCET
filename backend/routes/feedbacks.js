const express = require('express');
const { addFeedback, getFeedbacks } = require('../controllers/feedbackController');
const router = express.Router();

router.get('/get/:event_id', getFeedbacks);
router.post('/add', addFeedback);

module.exports = router;