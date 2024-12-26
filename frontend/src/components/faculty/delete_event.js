import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

const Delete = () => {
    const { faculty_id } = useParams();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/getbyfaculty/${faculty_id}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, [faculty_id]);

    const handleDelete = async (eventId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/delete/${eventId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Network response was not ok');
            console.log('Event deleted successfully');
            setEvents(events.filter(event => event._id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div className="container pt-3 pb-3 py-3">
            <div className="row mt-0">
                {events.map(event => (
                    <div className="col-md-4 mb-4 d-flex flex-wrap" key={event._id}>
                        <Card
                            className="shadow text-center"
                            style={{ width: '18rem', height: '360px', overflow: 'hidden', cursor: 'pointer' }}
                        >
                            <Card.Img
                                variant="top"
                                src={`${process.env.REACT_APP_API_URL}/${event.brochure_path}`}
                                alt=""
                                style={{ objectFit: 'cover', height: '200px' }}
                            />
                            <Card.Body>
                                <Card.Title>{event.title}</Card.Title>
                                <Card.Text>Date: {new Date(event.starting_date).toLocaleDateString()}</Card.Text>
                                <Button variant="danger" onClick={() => handleDelete(event._id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Delete;