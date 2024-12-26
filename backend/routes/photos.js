const express = require('express');
const { addPhoto, deletePhoto, getPhotos, getEventPhotos } = require('../controllers/photoController');
const upload = require('../controllers/uploadController');
const router = express.Router();

router.get('/get/:event_id', getPhotos);
router.get('/getphoto/:event_id', getEventPhotos);
router.post('/add', upload.array('image'), addPhoto);
router.delete('/delete/:id', deletePhoto);

module.exports = router;