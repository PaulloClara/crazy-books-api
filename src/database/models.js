const mongoose = require('../database');
const UsersSchema = require('../schemas/users');

const Users = mongoose.model('users', mongoose.Schema(UsersSchema));

module.exports = {
  Users,
};
