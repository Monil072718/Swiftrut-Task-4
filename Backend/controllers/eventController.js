const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const { title, description, date, location, maxAttendees } = req.body;

  try {
    // Create a new event object
    const event = new Event({
      title,
      description,
      date,
      location,
      maxAttendees,
      creator: req.user.id, // Use the logged-in user ID as the event creator
      image: req.file ? req.file.path : null, // Save the file path if the file is uploaded
    });
 // Save the event to the database
 await event.save();

      // Respond with the created event
    res.status(200).json({ message: 'Event created successfully', event });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.updateEvent = async (req, res) => {
  const { title, description, date, location, maxAttendees } = req.body;

  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.creator.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    event.title = title;
    event.description = description;
    event.date = date;
    event.location = location;
    event.maxAttendees = maxAttendees;

    await event.save();
    res.json(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
  
      if (event.creator.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      await Event.findByIdAndDelete(req.params.id); // Correct deletion method
      res.json({ message: 'Event removed' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };
  
  // controllers/eventController.js
  exports.getEventsByUser = async (req, res) => {
    try {
      // Fetch events created by the logged-in user
      const events = await Event.find({ creator: req.user.id }); // Filter by the logged-in user's ID
      res.json(events); // Send back the events as JSON
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };


