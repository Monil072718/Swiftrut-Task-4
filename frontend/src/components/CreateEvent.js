import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    maxAttendees: 0,
  });
  const navigate = useNavigate();

  // Handle form data change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data: ", formData); // Debugging: Check if form data is correct

    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      // Check if token exists
      if (!token) {
        console.error('No token found in localStorage. You must be logged in.');
        return;
      }

      // Send the request with the Authorization header
      const response = await API.post('/events', formData, {
        headers: { Authorization: `Bearer ${token}` } // Pass the token
      });

      console.log("Event Created: ", response.data); // Debugging: Check if event creation is successful

      if (response.status === 200) {
        navigate('/'); // Redirect to home page after success
      } else {
        console.error("Failed to create event:", response.status);
      }
    } catch (error) {
      console.error("Error creating event:", error.response ? error.response.data : error.message); // Debugging: Capture the error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Event</h2>
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Event Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="maxAttendees"
        placeholder="Max Attendees"
        value={formData.maxAttendees}
        onChange={handleChange}
        required
      />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEvent;
