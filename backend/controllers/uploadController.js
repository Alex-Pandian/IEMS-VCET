const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
});
const max = 2 * 1000 * 1000;
const upload = multer({
    storage: storage,
    limit: {
        fileSize: max
    }
});

module.exports = upload;