import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

const ComingEvents = () => {
    const { part_id } = useParams();
    const [regData, setregData] = useState({
        name: '',
        department: '',
        year: '',
        email: ''
    });
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [eventById, setEventById] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/get/future`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setEvents(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, [part_id]);

    useEffect(() => {
        const fetchEvent = async () => {
            if (!selectedEvent) return; // Return early if selectedEvent is null
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/getbyid/${selectedEvent}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setEventById(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching event by ID:', error);
            }
        };
        fetchEvent();
    }, [selectedEvent]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setregData({ ...regData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/registrations/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    event_id: selectedEvent,
                    participant_id: part_id,
                    ...regData
                }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            console.log('Registration successful:', result);
            // Reset form and hide it
            setregData({ name: '', department: '', year: '', email: '' });
            setShowDetails(false);
        } catch (error) {
            console.error('Error registering for event:', error);
        }
    };

    const handleImageClick = (eventId) => {
        setSelectedEvent(eventId);
        setShowDetails(true);
    };

    return (
        <div className="container pt-3 pb-3 py-3">
            {showDetails && eventById ? (
                <div className="d-flex flex-column justify-content-center align-items-center vh-90 mt-0" style={{ maxWidth: '800px', width: '100%' }}>
                    <div className="card mb-3">
                        <img className="card-img-top" src={`${eventById.brochure_path}`} alt="Event Brochure" />
                        <div className="card-body">
                            <h5 className="card-title">{eventById.title}</h5>
                            <p className="card-text">Description:<br></br> {eventById.description}</p>
                            <p className="card-text">Date: {new Date(eventById.starting_date).toLocaleDateString()}</p>
                            <p className="card-text">Time: {new Date(eventById.starting_date).toLocaleTimeString()}</p>
                            <p className="card-text">Venue: {eventById.venue}</p>
                        </div>
                    </div>
                    <form className="text-center shadow p-3 d-flex flex-column gap-3 m" style={{ width: '100%' }} onSubmit={handleSubmit}>
                        <h2>Event Registration</h2>
                        <div className="form-group d-inline-flex">
                            <label htmlFor="name" className="col-2">Name:</label>
                            <input type="text" className="form-control" id="name" value={regData.name} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group d-inline-flex">
                            <label htmlFor="department" className="col-2">Department:</label>
                            <input type="text" className="form-control" id="department" value={regData.department} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group d-inline-flex">
                            <label htmlFor="year" className="col-2">Year:</label>
                            <input type="text" className="form-control" id="year" value={regData.year} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group d-inline-flex">
                            <label htmlFor="email" className="col-2">Email:</label>
                            <input type="email" className="form-control" id="email" value={regData.email} onChange={handleInputChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            ) : (
                <div className="row mt-0">
                    <h1 className="text-center">Upcoming Events</h1>
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

export default ComingEvents;