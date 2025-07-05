const Winner = require('../models/winner');

exports.addWinner = async (req, res) => {
    const { event_id, winners } = req.body;
    try {
      await Winner.deleteMany({ event_id });
      let winner = new Winner({ event_id, winners });
      await winner.save();
      res.status(201).json(winner);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  };
  
  
  exports.getWinners = async (req, res) => {
      const { event_id } = req.params;
      try {
        const winners = await Winner.find({ event_id });
        if (!winners || winners.length === 0) return res.status(404).send('No winners found for this event.');
        res.json(winners);
      } catch (error) {
        res.status(500).send('Server error');
      }
  };
