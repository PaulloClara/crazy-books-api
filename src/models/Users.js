const mongoose = require('../database');

const UsersSchema = mongoose.Schema({
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

const Users = mongoose.model('users', UsersSchema);

module.exports = Users;
