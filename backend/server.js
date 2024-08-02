const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./config/db');
const corsMiddleware = require('./middleware/corsMiddleware');
const certificateRoutes = require('./routes/certificateRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware for cross-origin access
app.use(corsMiddleware);

// Middleware for parsing JSON
app.use(bodyParser.json());

// Serve static files from the 'frontend/public' directory
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Connect to MongoDB
db.connect();

// Routes
app.use('/api/certificate', certificateRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
