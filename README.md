# About

This is an appi that works with a fictional database (books.json) so app is using fs to work.

The general requirements are the following:

> We are going to create a website to store our books information. If we want to add a new entry for a book, we need the title, author, publication year and tags. Please return to us a unique identifier (GUID) if a new book is added. For searching, we need to be able to fetch the books information in 2 different ways: by book GUID, and by parameters (title, author, publication year or a tag). We should be able to update and delete current books. If the book info is already in our database (title, author and publication year, no matter the tags), don't allow the creation for the new entry. Finally, please be careful, we don't want to see invalid values on book information: title and author should be characters, publication year should be a valid year, larger than 1454; and tags should be an array of characters like ['adventure', 'comedy']

Available routes are:

| Route       | Method |                                                                                                         Description |
| :---------- | :----: | ------------------------------------------------------------------------------------------------------------------: |
| /books      |  GET   | Shows all the books in the database, you can use query parameters to search base in the title, author, year or tags |
| /books/GUID |  GET   |                                                                             Get a book from database using its GUID |
| /books/GUID |  PUT   |                                                                                          Updates a book information |
| /books      |  POST  |                                                                   Creates a book using title, author, year and tags |
| /books/GUID | DELETE |                                                                                         Delete a book from database |
