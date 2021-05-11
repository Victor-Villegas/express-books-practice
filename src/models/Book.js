const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// Path to books.json
const p = path.join(path.dirname(require.main.filename), 'data', 'books.json');

module.exports = class Book {
  constructor (data) {
    this.title = data.title;
    this.author = data.author;
    this.year = data.year;
    this.tag = data.tag;
    this.guid = uuid.v4();
  }

  save () {
    fs.readFile(p, (err, data) => {
      let books = [];

      if (err) {
        console.log(err);
        throw err;
      }

      books = JSON.parse(data);
      books.push(this);
      fs.writeFile(p, JSON.stringify(books), (err) => console.log(err));
    });
  }

  getGUID () {
    return this.guid;
  }

  static removeByGUID (guid, response) {
    fs.readFile(p, (err, data) => {
      let books = [];

      if (err) {
        console.log(err);
        throw err;
      }

      books = JSON.parse(data);
      const [bookToRemove] = books.filter(book => book.guid === guid);

      if (bookToRemove) {
        books = books.filter(book => book.guid !== guid);
        fs.writeFile(p, JSON.stringify(books), (err) => console.log(err));

        return response(bookToRemove.title);
      }

      return response();
    });
  }

  // Get book by GUID
  static getByGUID (guid, response) {
    fs.readFile(p, (err, data) => {
      let books = [];

      if (err) {
        console.log(err);
        throw err;
      }

      books = JSON.parse(data);
      books = books.filter(book => book.guid === guid);

      if (books.length > 0) return response(books);
      return response();
    });
  }

  // Get books by Tags
  static getByTags (query, response) {
    const { title, author, year } = query;
    let { tags } = query;

    fs.readFile(p, (err, data) => {
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
        books = books.filter(book => book.tag.some(genre => tags.includes(genre)));
      }

      if (books.length > 0) return response(books);
      return response();
    });
  }

  // Check if book exists in database
  static checkBook (body, response) {
    const { title, author, year } = body;

    fs.readFile(p, (err, data) => {
      let books = [];

      if (err) {
        console.log(err);
        throw err;
      }

      books = JSON.parse(data);
      books = books.filter(book => book.title === title && book.author === author && book.year === year);

      if (books.length > 0) return response(true);
      return response();
    });
  }
};
