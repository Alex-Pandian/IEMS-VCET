const mongoose = require('mongoose');

const WinnerSchema = new mongoose.Schema({
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  winners: [{
    name: { type: String, required: true, maxlength: 100 },
    position: { type: String, required: true, maxlength: 50 }
  }]
});

module.exports = mongoose.model('Winner', WinnerSchema);
