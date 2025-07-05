const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  photo_path: { type: [String], required: true },
});

module.exports = mongoose.model('Photo', PhotoSchema);
