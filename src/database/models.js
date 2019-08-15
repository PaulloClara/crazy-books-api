const mongoose = require('../database');

const UsersSchema = require('../schemas/users');
const BooksSchema = require('../schemas/books');

const Users = mongoose.model('users', mongoose.Schema(UsersSchema));
const Books = mongoose.model('books', mongoose.Schema(BooksSchema));

module.exports = {
  Users,
  Books,
};
