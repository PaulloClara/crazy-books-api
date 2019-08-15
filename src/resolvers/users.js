const { Users } = require('../database/models');

const jwt = require('../configs/jwt');
const bcrypt = require('../configs/bcrypt');

module.exports = {
  query: {
    async users() {
      const users = await Users.find();
      return users;
    },
    async user(_, {}, { request }) {
      const user = await Users.findOne({ _id: request.userID });
      return user;
    },
  },
  mutation: {
    async register(_, args) {
      args.password = await bcrypt.hash(args.password);
      const user = await Users.create(args);
      if (!user) throw new Error('Error');
      return user;
    },
    async login(_, args) {
      const { username, email, password } = args;
      let user = {};
      if (username) user = await Users.findOne({ username }).select('+password');
      else user = await Users.findOne({ email }).select('+password');
      if (!user) throw new Error('User not found');
      if (!await bcrypt.compare(password, user.password)) throw new Error('Password error');
      const token = await jwt.sign(user._id);
      return token;
    },
    async updateUser(_, args, { request }) {
      const { userID: _id } = request;
      const result = await Users.updateOne({ _id }, args);
      if (!result.n) throw new Error('User not found');
      const user = await Users.findOne({ _id });
      return user;
    },
    async deleteUser(_, args, { request }) {
      const { userID: _id } = request;
      const result = await Users.deleteOne({ _id });
      if (!result.n) throw new Error('User not found');
      return 'OK';
    },
  },
};
