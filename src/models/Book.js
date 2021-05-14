const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// Path to books.json
const db = path.join(path.dirname(require.main.filename), 'data', 'books.json');

module.exports = class Book {
  constructor (data) {
    this.title = data.title;
    this.author = data.author;
    this.year = data.year;
    this.tag = data.tag;
    this.guid = uuid.v4();
  }

  save () {
    fs.readFile(db, (err, data) => {
      let books = [];

      if (err) {
        console.log(err);
        throw err;
      }

      books = JSON.parse(data);
      books.push(this);
      fs.writeFile(db, JSON.stringify(books), (err) => console.log(err));
    });
  }

  getGUID () {
    return this.guid;
  }

  // Get all books or filter by Title, Author, Year or Tags using query parameters
  static getBooks (query, callback) {
    const { title, author, year } = query;
    let { tags } = query;

    fs.readFile(db, (err, data) => {
      let books = [];

      if (err) {
        console.log(err);
        throw err;
      }

      // Books filtering
      books = JSON.parse(data);
      if (title) books = books.filter(book => book.title === title);
      if (author) books = books.filter(book => book.author === author);
      if (year) books = books.filter(book => book.year === parseInt(year));
      if (tags) {
        tags.includes(',') ? tags = [...tags.split(',')] : tags = [tags];
        books = books.filter(book => book.tag.some(bookTag => tags.includes(bookTag)));
      }

      books.unshift({
        count: books.length,
        filters: { title, author, year, tags }
      });
      if (books.length > 0) return callback(books);
      return callback();
    });
  }

  // Get book by GUID
  static getByGUID (guid, callback) {
    fs.readFile(db, (err, data) => {
      let book = [];

      if (err) {
        console.log(err);
        throw err;
      }

      book = JSON.parse(data);
      book = book.filter(book => book.guid === guid);

      if (book.length > 0) return callback(book);
      return callback();
    });
  }

  static updateBook (guid, body, callback) {
    fs.readFile(db, (err, data) => {
      let books = [];

      if (err) {
        console.log(err);
        throw err;
      }

      books = JSON.parse(data);

      books.forEach(book => {
        if (book.guid === guid) {
          Object.keys(body).forEach(key => {
            book[key] = body[key];
          });
        }
      });

      const book = books.filter(book => book.guid === guid);
      if (book.length > 0) {
        fs.writeFile(db, JSON.stringify(books), (err) => console.log(err));
        return callback(book);
      }

      return callback();
    });
  }

  static removeByGUID (guid, callback) {
    fs.readFile(db, (err, data) => {
      let books = [];

      if (err) {
        console.log(err);
        throw err;
      }

      books = JSON.parse(data);
      const [bookToRemove] = books.filter(book => book.guid === guid);

      if (bookToRemove) {
        books = books.filter(book => book.guid !== guid);
        fs.writeFile(db, JSON.stringify(books), (err) => console.log(err));

        return callback(bookToRemove);
      }

      return callback();
    });
  }

  static bookExists (body, callback) {
    const { title, author, year } = body;

    fs.readFile(db, (err, data) => {
      let books = [];

      if (err) {
        console.log(err);
        throw err;
      }

      books = JSON.parse(data);
      const book = books.filter(book => book.title === title && book.author === author && book.year === year);

      if (book.length > 0) return callback(book);
      return callback();
    });
  }
};
