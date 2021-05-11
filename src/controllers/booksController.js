const bookValidator = require('../lib/bookValidator');

// Models
const { Book } = require('../models');

const getBook = (req, res) => {
  const { query } = req;

  // Get book by GUID
  if (query.guid) {
    const guid = query.guid;

    Book.getByGUID(guid, (book) => {
      if (book) {
        return res.status(200).send(book);
      }

      return res.status(404).send({
        message: 'Book not found.'
      });
    });

  // Get books by Tags
  } else {
    Book.getByTags(query, (books) => {
      if (books) {
        return res.status(200).send(books);
      }

      return res.status(404).send({
        message: 'No books found.'
      });
    });
  }
};

const createBook = (req, res) => {
  const { body } = req;

  // Data validation
  const validation = bookValidator(body);
  if (validation) {
    return res.status(validation.status).send({
      message: validation.message
    });
  }

  // Check if book is already listed
  Book.checkBook(body, (books) => {
    if (books) {
      return res.status(400).send({
        message: 'Book already in database.'
      });
    }

    const newBook = new Book(body);
    newBook.save();

    return res.status(201).send({
      message: 'Book successfully created.',
      guid: newBook.getGUID()
    });
  });
};

const deleteBook = (req, res) => {
  const { query } = req;

  Book.removeByGUID(query.guid, (books) => {
    if (books) {
      return res.status(200).send({
        message: 'Book successfully removed.',
        title: books
      });
    }

    return res.status(400).send({
      message: 'Book not found.'
    });
  });
};

module.exports = {
  getBook,
  createBook,
  deleteBook
};
