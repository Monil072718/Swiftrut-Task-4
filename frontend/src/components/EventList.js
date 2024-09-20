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
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white p-6 shadow-md rounded-md">
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-gray-700 mb-2">{event.description}</p>
              <p className="text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-600">Location: {event.location}</p>
              <Link
                to={`/events/${event._id}`}
                className="inline-block mt-4 text-blue-600 hover:text-blue-700"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No events found</p>
      )}
    </div>
  );
};

export default EventList;
