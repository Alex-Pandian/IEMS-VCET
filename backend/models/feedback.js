const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  feedbacks: [{
    question: { type: String, required: true },
    answer: { type: String, maxlength: 100 }
  }]
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
