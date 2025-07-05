import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

const WinnerList = () => {
    const { faculty_id } = useParams();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [eventById, setEventById] = useState(null);
    const [winners, setWinners] = useState([{ name: '', position: '' }]);
    const [message, setMessage] = useState(null);

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

    useEffect(() => {
        const fetchEvent = async () => {
            if (!selectedEvent) return; 
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

    const handleImageClick = (eventId) => {
        setSelectedEvent(eventId);
        setShowDetails(true);
    };

    const handleWinnerChange = (index, field, value) => {
        const newWinners = [...winners];
        newWinners[index][field] = value;
        setWinners(newWinners);
    };

    const addWinnerField = () => {
        setWinners([...winners, { name: '', position: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/winners/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ event_id: selectedEvent, winners })
            });

            if (response.ok) {
                setMessage('Winners added successfully!');
                setShowDetails(false);
            } else {
                throw new Error('Failed to add winners');
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="container pt-3 pb-3 py-3">
            {showDetails && eventById ? (
                <div>
                    <h2 className="text-center">Add Winners for {eventById.title}</h2>
                    {message && <Alert variant="info">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <div>
                            <Form.Label className='col-md-2'>Position</Form.Label>
                            <Form.Label className='col-md-4'>Name</Form.Label>
                        </div>
                        
                        {winners.map((winner, index) => (
                            <Row key={index} className="mb-3">
                                <Col md={2}>
                                    <Form.Group controlId={`winnerPosition${index}`}>
                                        <Form.Control
                                            type="text"
                                            placeholder="eg:1"
                                            value={winner.position}
                                            onChange={(e) => handleWinnerChange(index, 'position', e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group controlId={`winnerName${index}`}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter winner's name"
                                            value={winner.name}
                                            onChange={(e) => handleWinnerChange(index, 'name', e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        ))}
                        <Button variant="secondary" onClick={addWinnerField}>Add More Winner</Button>
                        <Button variant="primary" type="submit" className="ml-3">Submit Winners</Button>
                    </Form>
                </div>
            ) : (
                <div className="row mt-0">
                    <h1 className="text-center">Events</h1>
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

export default WinnerList;