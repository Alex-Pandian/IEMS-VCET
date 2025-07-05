import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

const AddPhoto = () => {
    const { faculty_id } = useParams();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/getbyfaculty-past/${faculty_id}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, [faculty_id]);

    const handleImageClick = async (eventId) => {
        setSelectedEvent(eventId);
        setShowForm(true);

        // Fetch existing photos for the selected event
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/photos/get/${eventId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setPhotos(data);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Array.from(selectedFiles).forEach(file => {
            formData.append('image', file);
        });
        formData.append('event_id', selectedEvent);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/photos/add`, {
                method: 'POST',
                body: formData
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setPhotos(prevPhotos => [...prevPhotos, ...data]);
            setSelectedFiles([]);
        } catch (error) {
            console.error('Error uploading photos:', error);
        }
    };

    const handleDeletePhoto = async (photoId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/photos/delete/${photoId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Network response was not ok');
            setPhotos(prevPhotos => prevPhotos.filter(photo => photo._id !== photoId));
        } catch (error) {
            console.error('Error deleting photo:', error);
        }
    };

    return (
        <div className="container pt-3 pb-3 py-3">
            {showForm ? (
                <div>
                    <div className="d-flex justify-content-center align-items-center vh-90 mt-0" style={{ maxWidth: '800px', width: '100%' }}>
                        <form className="text-center shadow p-3 d-flex flex-column gap-3 m" style={{ width: '100%' }} onSubmit={handleFileUpload}>
                            <h2>Add Photos</h2>
                            <Form.Group>
                                <Form.Label>Upload Photos</Form.Label>
                                <Form.Control type="file" name='image' multiple onChange={handleFileChange} required />
                            </Form.Group>
                            <Button type="submit" className="btn btn-primary">Upload</Button>
                        </form>
                    </div>
                    <div className="row mt-4">
                        {photos.map(photo => (
                            <div className="col-md-4 mb-4 d-flex flex-wrap" key={photo._id}>
                                <Card className="shadow text-center" style={{ width: '18rem', height: '300px', overflow: 'hidden' }}>
                                    <Card.Img variant="top" src={`${photo.photo_path}`} alt="" style={{ objectFit: 'cover', height: '200px' }} />
                                    <Card.Body>
                                        <Button variant="danger" onClick={() => handleDeletePhoto(photo._id)}>Remove Photo</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="row mt-0">
                    {events.map(event => (
                        <div className="col-md-4 mb-4 d-flex flex-wrap" key={event._id}>
                            <Card
                                className="shadow text-center"
                                style={{ width: '18rem', height: '300px', overflow: 'hidden', cursor: 'pointer' }}
                                onClick={() => handleImageClick(event._id)}
                            >
                                <Card.Img
                                    variant="top"
                                    src={`${event.brochure_path}`}
                                    alt=""
                                    style={{ objectFit: 'cover', height: '200px' }}
                                />
                                <Card.Body>
                                    <Card.Title>{event.title}</Card.Title>
                                    <Card.Text>Date: {new Date(event.starting_date).toLocaleDateString()}</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddPhoto;