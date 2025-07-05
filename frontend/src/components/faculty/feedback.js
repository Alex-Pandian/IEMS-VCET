import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

const Feedback = () => {
    const { faculty_id } = useParams();
    const [questions, setQuestions] = useState(['', '', '', '', '']);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/getbyfaculty-past/${faculty_id}`);
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

    const handleInputChange = (e, index) => {
        const newQuestions = [...questions];
        newQuestions[index] = e.target.value;
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(questions);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/addfeedback/${selectedEvent}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ feedback: questions })
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            console.log('Event updated:', result);
            setQuestions(['', '', '', '', '']);
            alert('feedback mailed successfully');
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
            setQuestions([
                data.questions && data.questions[0] ? data.questions[0] : '',
                data.questions && data.questions[1] ? data.questions[1] : '',
                data.questions && data.questions[2] ? data.questions[2] : '',
                data.questions && data.questions[3] ? data.questions[3] : '',
                data.questions && data.questions[4] ? data.questions[4] : ''
            ]);
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
                        <h2>Add Feedback</h2>
                        {questions.map((question, index) => (
                            <div key={index} className="form-group d-inline-flex">
                                <label htmlFor={`question${index + 1}`} className="col-2">Question {index + 1}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`question${index + 1}`}
                                    value={question}
                                    onChange={(e) => handleInputChange(e, index)}
                                    required
                                />
                            </div>
                        ))}
                        <button type="submit" className="btn btn-primary">Submit</button>
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

export default Feedback;