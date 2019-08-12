const Users = require('../models/Users');

module.exports = {
  Query: {
    users() {
      return Users.find();
    },
  },
  Mutation: {
    async createUser(_, { name, lastName }) {
      const user = await Users.create({ name, lastName });
      if (!user) return 'Error';
      return user;
    },
  },
};
