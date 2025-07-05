const express = require('express');
const { addPhoto, deletePhoto, getPhotos } = require('../controllers/photoController');
const upload = require('../controllers/uploadController');
const router = express.Router();

router.get('/get/:event_id', getPhotos);
router.post('/add', upload.array('image'), addPhoto);
router.delete('/delete/:id', deletePhoto);

module.exports = router;