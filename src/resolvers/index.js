const { Users } = require('../database/models');

const jwt = require('../configs/jwt');
const bcrypt = require('../configs/bcrypt');

module.exports = {
  Query: {
    users() {
      return Users.find();
    },
    async user(_, _id) {
      try {
        const user = await Users.findOne({ _id });
        return user;
      } catch(e) {
        throw new Error('User not found');
      }
    },
  },
  Mutation: {
    async register(_, args) {
      // args == { name, lastName, username, email, password }
      args.password = await bcrypt.hash(args.password);
      const user = await Users.create(args);
      if (!user) throw new Error('Error');
      return user;
    },
    async login(_, args) {
      const { username, email, password } = args;
      let user = {}
      if (username) user = await Users.findOne({ username }).select('+password');
      else user = await Users.findOne({ email }).select('+password');
      if (!user) throw new Error('User not found');
      if (!await bcrypt.compare(password, user.password)) throw new Error('Password error');
      const token = await jwt.sign(user._id);
      return token;
    }
  },
};
