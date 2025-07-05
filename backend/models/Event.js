const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true },
  starting_date: { type: Date, required: true },
  ending_date: { type: Date, required: true },
  time:{ type:String, required:true },
  venue: { type: String, required: true, maxlength: 100 },
  brochure_path: { type: String},
  feedback: { type: [String] }
});

module.exports = mongoose.model('Event', EventSchema);