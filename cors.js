const cors = require('cors');

const express = require('express');
const cors = require('cors'); // Import CORS middleware

const app = express();

// Use CORS middleware
app.use(cors());

// Other middleware and routes...

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

