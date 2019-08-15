const users = require('./users');
const books = require('./books');

module.exports = {
  Query: {
    ...users.query,
    ...books.query,
  },
  Mutation: {
    ...users.mutation,
    ...books.mutation,
  },
};
