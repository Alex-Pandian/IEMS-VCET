const Event = require('../models/event');
const Registration = require('../models/registration');
const sendEmail = require('../utils/emailService');

exports.addEvent = async (req, res) => {
  const { faculty_id, title, description, starting_date, ending_date, time, venue} = req.body;
  const brochure_path = req.file.path;
  try {
    let event = new Event({ faculty_id, title, description, starting_date, ending_date, time, venue, brochure_path});
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.editEvent = async (req, res) => {
    const { faculty_id, title, description, starting_date, ending_date, time, venue} = req.body;
    const brochure_path = req.file ? req.file.path: req.body.existingBrochurePath;
    const id = req.params.id;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { faculty_id, title, description, starting_date, ending_date, time, venue, brochure_path},
            { new: true }
        )
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found"})
        }
        res.json(updatedEvent)
    } catch (err) {
      res.status(500).send('Server Error');
    }
};

exports.deleteEvent = async (req, res) => {
    const id = req.params.id;
    try {
        await Event.findByIdAndDelete(id);
        res.status(204).end();
    } catch (err) {
      res.status(500).send('Server Error');
    }
};

exports.getEventsByFacultyId = async (req, res) => {
  const { faculty_id } = req.params;
  try {
    const events = await Event.find({ faculty_id }).select('_id title brochure_path starting_date');
    if (!events || events.length === 0) return res.status(404).send('No events found for this faculty.');
    res.json(events);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.getEventsById = async (req, res) => {
  const id = req.params.id;
  try {
      const events = await Event.findById(id);
      res.json(events);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getEvents = async (req, res) => {
    try {
      const { type } = req.params;
      const now = new Date();
      let events;
      if (type === 'past') {
        events = await Event.find({ ending_date: { $lt: now } }).select('_id title brochure_path ending_date');
      } else if (type === 'present') {
        events = await Event.find({ starting_date: { $lte: now }, ending_date: { $gte: now } }).select('_id title brochure_path starting_date');
      } else if (type === 'future') {
        events = await Event.find({ starting_date: { $gt: now } }).select('_id title brochure_path starting_date');
      } else {
        return res.status(400).send('Invalid event type specified.');
      }
      if (!events || events.length === 0) return res.status(404).send('No events found.');
      res.json(events);
    } catch (error) {
      res.status(500).send('Server error');
    }
};

exports.getPastEventsByFacultyId = async(req, res) => {
  const { faculty_id } = req.params;
  try {
    const now = new Date();
    const events = await Event.find({
      faculty_id,
      ending_date: { $lt: now }
    }).select('_id title brochure_path starting_date');
    res.json(events);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.addFeedbackQuestions = async(req, res) => {
  const { feedback } = req.body;
  const id = req.params.id;
  try {
      const updatedEvent = await Event.findByIdAndUpdate(
          id, { feedback }, { new: true }
      )
      if (!updatedEvent) {
          return res.status(404).json({ message: "Event not found" })
      }
      const registrations = await Registration.find({event_id : id});
      const recipients = registrations.map(item => item.email);
      if (!recipients) {
          return res.status(404).json({ message: "Recipients not found" })
      }
      const result = await sendEmail(recipients, `${process.env.ORIGIN}/feedback/${id}`);
      res.status(200).json(updatedEvent)
  } catch (err) {
      res.status(500).send('Server Error');
  }
};

exports.getFeedbackQuestions = async(req, res) => {
  const id = req.params.id;
  try {
      const FeedbackQuestions = await Event.findById(id).select('feedback');
      if (!FeedbackQuestions) {
          return res.status(404).json({ message: "Feedback Questions not found" })
      }
      res.json(FeedbackQuestions)
  } catch (err) {
      res.status(500).send('Server Error');
  }
};
