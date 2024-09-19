import React, { useState, useEffect } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get('/events');
        if (res.status === 200) {
          setEvents(res.data);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Upcoming Events</h2>
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <Link to={`/events/${event._id}`}>View Details</Link>
          </div>
        ))
      ) : (
        <p>No events found</p>
      )}
    </div>
  );
};

export default EventList;
