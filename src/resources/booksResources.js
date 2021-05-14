const { check } = require('express-validator');
const express = require('express');
const booksResources = express.Router();

// Controller
const { booksController } = require('../controllers');

// Routes - /books
booksResources.get('/', booksController.getBooks);
booksResources.get('/:guid', booksController.getBook);

booksResources.put('/:guid', [
  check('title')
    .optional()
    .isString().withMessage('Title must be a String'),
  check('author')
    .optional()
    .isString().withMessage('Author must be a String'),
  check('year')
    .optional()
    .isInt({ min: 1454 }).withMessage('Year must be a Number greater than 1454'),
  check('tag')
    .optional()
    .isArray().withMessage('Tags must be inside an Array'),
  check('tag.*')
    .optional()
    .isString().withMessage('Tag must be a String')
], booksController.updateBook);

booksResources.post('/', [
  check('title')
    .exists().withMessage('Title property not found')
    .isString().withMessage('Title must be a String'),
  check('author')
    .exists().withMessage('Author property not found')
    .isString().withMessage('Author must be a String'),
  check('year')
    .exists().withMessage('Year property not found')
    .isInt({ min: 1454 }).withMessage('Year must be a Number greater than 1454'),
  check('tag')
    .exists().withMessage('Tag property not found')
    .isArray().withMessage('Tags must be inside an Array'),
  check('tag.*')
    .optional()
    .isString().withMessage('Tag must be a String')
], booksController.createBook);

booksResources.delete('/:guid', booksController.deleteBook);

module.exports = booksResources;
