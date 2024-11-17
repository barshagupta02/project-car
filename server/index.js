require('dotenv').config();
const express = require('express');
const app = express();
const port = 3001;
const connectDB = require('./config/db');


// Import routes
const routes = require('./routes/routes');

// Middleware to parse JSON bodies
app.use(express.json());
connectDB();

// Use routes
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});