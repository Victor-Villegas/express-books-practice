const bookValidator = (body) => {
  const { title, author, year, tag } = body;
  const error = {
    status: 400,
    message: 'Invalid data entered.'
  };

  if (!title || !author || !year || !tag) return error;
  if (typeof title !== 'string') return error;
  if (typeof author !== 'string') return error;
  if (typeof year !== 'number' && year <= 1454) return error;
  if (typeof tag !== 'object') return error;
};

module.exports = bookValidator;
