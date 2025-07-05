const Photo = require('../models/photo');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.addPhoto = async (req, res) => {
    const { event_id } = req.body;
    if (!req.files) {
        return res.status(400).send('No files uploaded.');
    }

    try {
        const photoPromises = req.files.map(file => {
            const photo = new Photo({ event_id, photo_path: file.path });
            return photo.save();
        });

        const photos = await Promise.all(photoPromises);
        res.status(201).json(photos);
    } catch (err) {
        console.error('Error saving photos:', err);
        res.status(500).send('Server Error');
    }
};

exports.deletePhoto = async (req, res) => {
    const id = req.params.id;
    try {
        await Photo.findByIdAndDelete(id);
        res.status(204).end();
    } catch (err) {
        console.error('Error deleting photo:', err);
        res.status(500).send('Server Error');
    }
};

exports.getPhotos = async (req, res) => {
    const { event_id } = req.params;

    try {
        const photos = await Photo.find({ event_id });

        if (!photos || photos.length === 0) {
            return res.status(404).send('No photos found for this event.');
        }

        const doc = new PDFDocument();
        const pdfPath = path.join(__dirname, 'temp.pdf');

        const pdfStream = fs.createWriteStream(pdfPath);

        doc.pipe(pdfStream);

        photos.forEach(photo => {
            const paths = Array.isArray(photo.photo_path) ? photo.photo_path : [photo.photo_path];
            paths.forEach(photoPath => {
                const fullPath = path.resolve(__dirname, '..', 'uploads', path.basename(photoPath));
                
                if (fs.existsSync(fullPath)) {
                    doc.image(fullPath, { fit: [500, 400], align: 'center', valign: 'center' });
                    doc.addPage();
                } else {
                    console.warn(`File does not exist: ${fullPath}`);
                }
            });
        });
        doc.end();

        pdfStream.on('finish', () => {
            res.download(pdfPath, 'photos.pdf', (err) => {
                if (err) {
                    console.error('Error sending file:', err);
                    res.status(500).send('Server Error');
                }

                fs.unlink(pdfPath, (err) => {
                    if (err) console.error('Error deleting temporary file:', err);
                });
            });
        });

        pdfStream.on('error', (err) => {
            console.error('Error generating PDF:', err);
            res.status(500).send('Server Error');
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Server error');
    }
};
