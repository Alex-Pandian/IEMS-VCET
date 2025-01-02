const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, maxlength: 100 },
  department: { type: String, required: true, maxlength: 100 },
  year: { type: Number, required: true },
});

module.exports = mongoose.model('Registration', RegistrationSchema);