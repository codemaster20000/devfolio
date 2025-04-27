const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware - Make sure these run before your routes
app.use(cors());
app.use(bodyParser.json());
// Alternative if bodyParser is causing issues:
// app.use(express.json());

// Import contact routes
const contactRoutes = require('./contact');

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Test endpoint directly in server.js to debug
app.post('/test', (req, res) => {
  console.log('Test endpoint hit');
  console.log('Request body:', req.body);
  res.status(200).json({ message: 'Test endpoint successful' });
});

// Root route
app.get('/', (req, res) => {
  res.send('Backend Server is Running ✅');
});

// Use contact routes
app.use('/contact', contactRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});