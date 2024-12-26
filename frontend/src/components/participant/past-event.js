import React, { useState, useEffect } from 'react';
import { Card, Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

const PastEvents = () => {
    const { part_id } = useParams();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [eventById, setEventById] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [winners, setWinners] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/get/past`);
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

    useEffect(() => {
        const fetchPhotos = async () => {
            if (!selectedEvent) return;
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/photos/getphoto/${selectedEvent}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setPhotos(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };
        fetchPhotos();
    }, [selectedEvent]);

    useEffect(() => {
        const fetchWinners = async () => {
            if (!selectedEvent) return; 
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/winners/get/${selectedEvent}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setWinners(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching winners:', error);
            }
        };
        fetchWinners();
    }, [selectedEvent]);

    const handleImageClick = (eventId) => {
        setSelectedEvent(eventId);
        console.log(selectedEvent)
        setShowDetails(true);
    };

    return (
        <div className="container pt-3 pb-3 py-3">
            {showDetails && eventById ? (
                <div className="d-flex flex-column justify-content-center align-items-center vh-90 mt-0" style={{ maxWidth: '800px', width: '100%' }}>
                    <div className="card mb-3">
                        <img className="card-img-top" src={`${process.env.REACT_APP_API_URL}/${eventById.brochure_path}`} alt="Event Brochure" />
                        <div className="card-body">
                            <h5 className="card-title">{eventById.title}</h5>
                            <p className="card-text">Description:<br /> {eventById.description}</p>
                            <p className="card-text">Date: {new Date(eventById.starting_date).toLocaleDateString()}</p>
                            <p className="card-text">Time: {new Date(eventById.starting_date).toLocaleTimeString()}</p>
                            <p className="card-text">Venue: {eventById.venue}</p>
                        </div>
                    </div>
                    {photos.length > 0 && (
                        <Carousel data-bs-theme="dark">
                            {photos.map((photo, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={`${process.env.REACT_APP_API_URL}/${photo.photo_path}`}
                                        alt={`Slide ${index}`}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    )}
                    {winners.length > 0 && (
                        <div className="mt-4">
                            <h3>Winners</h3>
                            <ul className="list-group">
                                {winners[0].winners.map((winner, index) => (
                                    <li key={index} className="list-group-item">
                                        {winner.position} : {winner.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <div className="row mt-0">
                    <h1 className="text-center">Past Events</h1>
                    {events.map(event => (
                        <div className="col-md-4 mb-4 d-flex flex-wrap" key={event._id}>
                            <Card
                                className="shadow text-center"
                                style={{ width: '18rem', height: '300px', overflow: 'hidden', cursor: 'pointer' }}
                                onClick={() => handleImageClick(event._id)}
                            >
                                <Card.Img
                                    variant="top"
                                    src={`${process.env.REACT_APP_API_URL}/${event.brochure_path}`}
                                    alt=""
                                    style={{ objectFit: 'cover', height: '200px' }}
                                />
                                <Card.Body>
                                    <Card.Title>{event.title}</Card.Title>
                                    <Card.Text>Date: {new Date(event.ending_date).toLocaleDateString()}</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PastEvents;