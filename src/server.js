// Modules
const express = require('express');

// Initialize
const app = express();

// Settings
const PORT = 5000;

// Middlewares
app.use(express.json());

app.use(require('./routes/router.js'));
app.use((req, res) => {
  res.sendStatus(404).send({
    message: 'Resource not found.'
  });
});

// Starting the Server
app.listen(PORT, () => {
  console.log('Server on port', PORT);
});
