const express = require('express');
const morgan = require('morgan');

// Initialize
const app = express();

// Settings
app.set('port', process.env.PORT || 5000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use(require('./routes/router.js'));

app.use((req, res) => {
  return res.status(404).send({
    statusCode: 404,
    message: 'Not found',
    errorDetails: []
  });
});

// Server
app.listen(app.get('port'), () => {
  console.log('Server running on port', app.get('port'));
});
