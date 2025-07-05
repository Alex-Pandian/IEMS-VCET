import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

const Update = () => {
    const { faculty_id } = useParams();
    const [file, setFile] = useState(null);
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        starting_date: '',
        ending_date: '',
        time: '',
        venue: '',
        brochure_path: null
    });
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/getbyfaculty/${faculty_id}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setEvents(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, [faculty_id]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setEventData({ ...eventData, [id]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (file) {
            formData.append('image', file);
        } else {
            formData.append('existingBrochurePath', eventData.brochure_path);
        }
        for (const key in eventData) {
            formData.append(key, eventData[key]);
        }
        console.log(eventData);
        console.log(formData);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/edit/${selectedEvent}`, {
                method: 'PUT',
                body: formData
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            console.log('Event updated:', result);
        } 
        catch (error) {
            console.error('Error updating event:', error);
        }
        
    };

    const handleImageClick = async (eventId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/getbyid/${eventId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setEventData({
                title: data.title,
                description: data.description,
                starting_date: new Date(data.starting_date).toISOString().split('T')[0],
                ending_date: new Date(data.ending_date).toISOString().split('T')[0],
                time: data.time,
                venue: data.venue,
                brochure_path: data.brochure_path,
            });
            setSelectedEvent(eventId);
            setShowForm(true);
        } catch (error) {
            console.error('Error fetching event details:', error);
        }
    };

    return (
        <div className="container pt-3 pb-3 py-3">
            {showForm ? (
                <div className="d-flex justify-content-center align-items-center vh-90 mt-0" style={{ maxWidth: '800px', width: '100%' }}>
                    <form className="text-center shadow p-3 d-flex flex-column gap-3 m" style={{ width: '100%' }} onSubmit={handleSubmit}>
                        <h2>Update Event Form</h2>
                        <div className="form-group d-inline-flex">
                            <label htmlFor="title" className="col-2">Title</label>
                            <input type="text" className="form-control" id="title" value={eventData.title} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group d-inline-flex">
                            <label htmlFor="description" className="col-2">Description</label>
                            <textarea rows="5" className="form-control" id="description" value={eventData.description} onChange={handleInputChange} required></textarea>
                        </div>
                        <div className="form-group d-inline-flex">
                            <label htmlFor="starting_date" className="col-2">Start Date</label>
                            <input type="date" className="form-control" id="starting_date" value={eventData.starting_date} onChange={handleInputChange} required />
                            <label htmlFor="ending_date" className="col-2">End Date</label>
                            <input type="date" className="form-control" id="ending_date" value={eventData.ending_date} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group d-inline-flex">
                            <label htmlFor="time" className="col-2">Time</label>
                            <input type="text" className="form-control" id="time" value={eventData.time} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group d-inline-flex">
                            <label htmlFor="venue" className="col-2">Venue</label>
                            <input type="text" className="form-control" id="venue" value={eventData.venue} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group d-inline-flex">
                            <label htmlFor="brochure_path" className="col-2">Upload Brochure</label>
                            <input type="file" className="form-control-file" id="brochure_path" onChange={handleFileChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
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

export default Update;