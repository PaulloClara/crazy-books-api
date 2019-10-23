const { Users, Books } = require("../database/models");
const { newError } = require("../utils/error");

const jwt = require("../utils/jwt");
const bcrypt = require("../utils/bcrypt");

module.exports = {
  query: {
    async users() {
      const users = await Users.find();

      return users;
    },
    async user(_, args, { req, res }) {
      const { userID: _id } = req;

      const user = await Users.findOne({ _id });
      if (!user) return newError("User not found", res, 404);

      user.books = await Books.find({ _id: user.booksID });

      return user;
    }
  },
  mutation: {
    async register(_, args, { res }) {
      if (await Users.findOne({ username: args.username }))
        return newError("User already exists", res, 400);

      args.password = await bcrypt.hash(args.password);

      const user = await Users.create(args);
      if (!user) return newError("Error", res);

      res.status(201);

      return user;
    },
    async login(_, { username, email, password }, { res }) {
      const user = username
        ? await Users.findOne({ username }).select("+password")
        : await Users.findOne({ email }).select("+password");

      if (!user) return newError("User not found", res, 404);

      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) return newError("Password error", res, 401);

      const token = await jwt.sign(user._id);

      return token;
    },
    async updateUser(_, args, { req, res }) {
      const { userID: _id } = req;

      const result = await Users.updateOne({ _id }, args);
      if (!result.n) newError("User not found", res, 404);

      const user = await Users.findOne({ _id });

      return user;
    },
    async deleteUser(_, { password }, { req, res }) {
      const { userID: _id } = req;

      if (!password) return newError("Password not Found", res, 400);

      const user = await Users.findOne({ _id }).select("+password");
      if (!user) return newError("User not found", res, 404);

      if (!(await bcrypt.compare(password, user.password)))
        return newError("Password error", res, 401);

      await Users.deleteOne({ _id });

      return "OK";
    },
    async addBook(_, { bookID }, { req, res }) {
      const { userID: _id } = req;

      const user = await Users.findOne({ _id });

      if (user.booksID.includes(bookID))
        return newError("Book already added", res, 400);

      if (!(await Books.findOne({ _id: bookID })))
        return newError("Book not found", res, 404);

      user.booksID.push(bookID);
      user.save();

      user.books = await Books.find({ _id: user.booksID });

      return user;
    },
    async removeBook(_, { bookID }, { req, res }) {
      const { userID: _id } = req;

      const user = await Users.findOne({ _id });

      if (!user.booksID.includes(bookID))
        return newError("Book not found", res, 404);

      const index = user.booksID.indexOf(bookID);
      user.booksID.splice(index, 1);
      user.save();

      user.books = await Books.find({ _id: user.booksID });

      return user;
    }
  }
};
