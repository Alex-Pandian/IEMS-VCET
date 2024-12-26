import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventType, setEventType] = useState('present');
  const { faculty_id } = useParams();

  const fetchEvents = (type) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/events/getbyfaculty-${type}/${faculty_id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents(eventType);
  }, [eventType, faculty_id]);

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  }

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="d-flex align-items-center gap-2">
          <span>Sort By</span>
          <select
            className="form-select"
            style={{ width: '200px' }}
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="past">Past Events</option>
            <option value="present">Present Events</option>
            <option value="future">Future Events</option>
          </select>
        </div>
      </div>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4 mb-4 d-flex flex-wrap" key={event._id}>
            <div className="card shadow text-center" style={{ width: '18rem', height: '400px', overflow: 'hidden' }}>
              <img
                src={`${process.env.REACT_APP_API_URL}/${event.brochure_path}`}
                className="card-img-top"
                alt={event.title}
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                {eventType === 'past' && (
                  <>
                    <a href={`${process.env.REACT_APP_API_URL}/api/registrations/get/${event._id}`} className="btn btn-primary mb-2" download>Download Participants (CSV)</a>
                    <a href={`${process.env.REACT_APP_API_URL}/api/photos/get/${event._id}`} className="btn btn-primary mb-2" download>Download Photos (PDF)</a>
                    <a href={`${process.env.REACT_APP_API_URL}/api/feedbacks/get/${event._id}`} className="btn btn-primary" download>Download Feedback (CSV)</a>
                  </>
                )}
                {(eventType === 'present' || eventType === 'future') && (
                  <a href={`${process.env.REACT_APP_API_URL}/api/registrations/get/${event._id}`} className="btn btn-primary" download>Download Participants (CSV)</a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;