const Feedback = require('../models/Feedback');
const XLSX = require('xlsx');

exports.addFeedback = async (req, res) => {
    const { event_id, feedbacks } = req.body;
    try {
    let feedback = new Feedback({ event_id, feedbacks });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getFeedbacks = async (req, res) => {
  const { event_id } = req.params;
  try {
    const feedbackEntries = await Feedback.find({ event_id }).populate('event_id');

    if (!feedbackEntries.length) {
      return res.status(404).send('No feedback found for this event');
    }

    const eventName = feedbackEntries[0].event_id.title;
    const questions = feedbackEntries[0].feedbacks.map(fb => fb.question);

    const data = feedbackEntries.map(fbEntry => {
      const row = {};
      fbEntry.feedbacks.forEach((fb, index) => {
        row[questions[index]] = fb.answer;
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Feedback');

    const safeEventName = eventName.replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `feedback_${safeEventName}.xlsx`;

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const buffer = XLSX.write(workbook, { type: 'buffer' });
    res.send(buffer);
  } catch (error) {
    res.status(500).send('Server error');
  }
};