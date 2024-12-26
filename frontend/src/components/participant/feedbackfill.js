import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const FeedbackQuestions = () => {
    const { id } = useParams(); 
    const [feedbackQuestions, setFeedbackQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [responses, setResponses] = useState({}); 

    useEffect(() => {
        const fetchFeedbackQuestions = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/getfeedback/${id}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setFeedbackQuestions(data.feedback);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching feedback questions:', error);
                setError('Error fetching feedback questions');
                setLoading(false);
            }
        };
        fetchFeedbackQuestions();
    }, [id]);

    const handleOptionChange = (questionIndex, value) => {
        setResponses({
            ...responses,
            [questionIndex]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const feedbacks = feedbackQuestions.map((question, index) => ({
                question,
                answer: responses[index] || '',
            }));

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/feedbacks/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ event_id: id, feedbacks }),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            console.log('Feedback submitted:', result);
            alert('Feedback submitted successfully!');
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Error submitting feedback.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Feedback Questions</h2>
            <form onSubmit={handleSubmit}>
                <ul className="list-group">
                    {feedbackQuestions.map((question, index) => (
                        <li key={index} className="list-group-item">
                            <div className="d-flex align-items-center">
                                <p className="mb-0 flex-grow-1">
                                    {index + 1}. {question}
                                </p>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name={`question${index}`}
                                        id={`excellent${index}`}
                                        value="Excellent"
                                        onChange={() => handleOptionChange(index, 'Excellent')}
                                    />
                                    <label className="form-check-label" htmlFor={`excellent${index}`}>
                                        Excellent
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name={`question${index}`}
                                        id={`good${index}`}
                                        value="Good"
                                        onChange={() => handleOptionChange(index, 'Good')}
                                    />
                                    <label className="form-check-label" htmlFor={`good${index}`}>
                                        Good
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name={`question${index}`}
                                        id={`yetToImprove${index}`}
                                        value="Yet to Improve"
                                        onChange={() => handleOptionChange(index, 'Yet to Improve')}
                                    />
                                    <label className="form-check-label" htmlFor={`yetToImprove${index}`}>
                                        Yet to Improve
                                    </label>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    );
};

export default FeedbackQuestions;