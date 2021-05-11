const express = require('express');
const router = express.Router();

// Resources
const { booksResources } = require('../resources');

// Routes
router.use('/books', booksResources);

module.exports = router;
