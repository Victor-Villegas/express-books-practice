const { validationResult } = require('express-validator');

// Models
const { Book } = require('../models');

module.exports = {
  getBooks: (req, res) => {
    const { query } = req;

    Book.getBooks(query, (books) => {
      if (!books) {
        return res.status(204).send({
          statusCode: 204,
          message: 'No Content',
          errorDetails: [
            'There is no content in the Books database'
          ]
        });
      }

      return res.status(200).send(books);
    });
  },

  getBook: (req, res) => {
    const { guid } = req.params;

    Book.getByGUID(guid, (book) => {
      if (!book) {
        return res.status(404).send({
          statusCode: 404,
          message: 'Not found',
          errorDetails: []
        });
      }

      return res.status(200).send(book);
    });
  },

  updateBook: (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).send({
        statusCode: 422,
        message: 'Syntax error',
        errorDetails: errors.array()
      });
    }

    const { body } = req;
    const { guid } = req.params;

    Book.updateBook(guid, body, (book) => {
      if (!book) {
        return res.status(404).send({
          statusCode: 404,
          message: 'Not found',
          errorDetails: []
        });
      }

      return res.status(200).send({
        statusCode: 200,
        message: 'Element updated'
      });
    });
  },

  createBook: (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).send({
        statusCode: 422,
        message: 'Syntax error',
        errorDetails: errors.array()
      });
    }

    const { body } = req;

    Book.bookExists(body, (books) => {
      if (books) {
        return res.status(409).send({
          statusCode: 409,
          message: 'Conflict',
          errorDetails: [
            'Book exists in database'
          ]
        });
      }

      const newBook = new Book(body);
      newBook.save();

      return res.status(201).send({
        guid: newBook.getGUID(),
        statusCode: 201,
        message: 'Element created'
      });
    });
  },

  deleteBook: (req, res) => {
    const { guid } = req.params;

    Book.removeByGUID(guid, (book) => {
      if (!book) {
        return res.status(404).send({
          statusCode: 404,
          message: 'Not found',
          errorDetails: []
        });
      }

      return res.status(200).send({
        statusCode: 200,
        message: 'Element deleted'
      });
    });
  }
};
