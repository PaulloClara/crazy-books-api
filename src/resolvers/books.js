const { Books } = require("../database/models");
const { newError } = require("../utils/error");

module.exports = {
  query: {
    async books() {
      const books = await Books.find();

      return books;
    },
    async book(_, { _id }, { res }) {
      const book = await Books.findOne({ _id });
      if (!book) return newError("Book not found", res, 404);

      return book;
    }
  },
  mutation: {
    async createBook(_, args, { res }) {
      const book = await Books.create(args);
      if (!book) return newError("Error", res);

      res.status(201);

      return book;
    },
    async deleteBook(_, _id, { res }) {
      const result = await Books.deleteOne({ _id });
      if (!result.n) return newError("Book not found", res, 404);

      return "OK";
    },
    async updateBook(_, args, { res }) {
      const { _id } = args;

      const result = await Books.updateOne({ _id }, args);
      if (!result.n) return newError("Book not found", res, 404);

      const book = await Books.findOne({ _id });

      return book;
    }
  }
};
