const express = require('express');
const { addWinner,getWinners } = require('../controllers/winnerController');
const router = express.Router();

router.get('/get/:event_id', getWinners);
router.post('/add', addWinner);
module.exports = router;