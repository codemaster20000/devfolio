const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// POST route for contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Check if all fields are provided
    if (!name || !email || !subject || !message) {
      console.error('All fields are required'); 
      
      return res.status(400).json({ message: 'All fields are required' });
      
    }

    // Directly insert into MongoDB without using a Schema
    const db = mongoose.connection.db; // Get the database
    const collection = db.collection('contacts'); // "contacts" is the collection name

    await collection.insertOne({ name, email, subject, message });
    console.log('Contact details:', { name, email, subject, message });
    console.log('Contact saved without schema!');
    res.status(201).json({ message: 'Contact saved successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'Error saving contact', error: error.message });
  }
});

module.exports = router;