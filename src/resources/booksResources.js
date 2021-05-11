const express = require('express');
const booksResources = express.Router();

// Controller
const { booksController } = require('../controllers');

// Routes - /books
booksResources.get('/', booksController.getBook);
booksResources.post('/', booksController.createBook);
booksResources.delete('/', booksController.deleteBook);

module.exports = booksResources;
