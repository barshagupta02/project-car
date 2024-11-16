const express = require('express');
const app = express();
const port = 3000;

// Import routes
const routes = require('./routes/routes');

// Middleware to parse JSON bodies
app.use(express.json());

// Use routes
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});