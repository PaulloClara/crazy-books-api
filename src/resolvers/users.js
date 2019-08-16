const { Users, Books } = require('../database/models');

const jwt = require('../configs/jwt');
const bcrypt = require('../configs/bcrypt');

module.exports = {
  query: {
    async users() {
      const users = await Users.find();
      return users;
    },
    async user(_, args, { request }) {
      const { userID: _id } = request;
      const user = await Users.findOne({ _id });
      user.books = await Books.find({ _id: user.booksID });
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
    async addBooks(_, { booksID }, { request }) {
      const { userID: _id } = request;
      const user = await Users.findOne({ _id });
      booksID.forEach((value) => {
        if (user.booksID.includes(value)) return;
        user.booksID.push(value);
      });
      user.save();
      user.books = await Books.find({ _id: user.booksID });
      return user;
    },
    async removeBooks(_, { booksID }, { request }) {
      const { userID: _id } = request;
      const user = await Users.findOne({ _id });
      booksID.forEach((value) => {
        if (!user.booksID.includes(value)) return;
        const index = user.booksID.indexOf(value);
        user.booksID.splice(index, 1);
      });
      user.save();
      user.books = await Books.find({ _id: user.booksID });
      return user;
    },
  },
};
