const mongoose = require('../database');

const UsersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    selected: false,
  },
});

const Users = mongoose.model('users', UsersSchema);

module.exports = Users;
