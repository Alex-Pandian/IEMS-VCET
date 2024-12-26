const express = require('express');
const { addEvent, editEvent, deleteEvent, getEvents, getEventsByFacultyId, getEventsById, getPresentEventsByFacultyId, getPastEventsByFacultyId,getFutureEventsByFacultyId, addFeedbackQuestions, getFeedbackQuestions } = require('../controllers/eventController');
const upload = require('../controllers/uploadController');
const router = express.Router();

router.get('/get/:type', getEvents)
router.get('/getbyfaculty/:faculty_id', getEventsByFacultyId);
router.get('/getbyfaculty-past/:faculty_id', getPastEventsByFacultyId);
router.get('/getbyfaculty-present/:faculty_id', getPresentEventsByFacultyId);
router.get('/getbyfaculty-future/:faculty_id', getFutureEventsByFacultyId);
router.get('/getbyid/:id', getEventsById);
router.post('/add',upload.single('image'), addEvent);
router.put('/edit/:id', upload.single('image'), editEvent);
router.put('/addfeedback/:id', addFeedbackQuestions);
router.get('/getfeedback/:id', getFeedbackQuestions);
router.delete('/delete/:id', deleteEvent);

module.exports = router;