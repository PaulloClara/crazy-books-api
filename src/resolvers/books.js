const { Books } = require('../database/models');

module.exports = {
  query: {
    async books() {
      const books = await Books.find();
      return books;
    },
    async book(_, _id) {
      const book = await Books.findOne({ _id });
      if (!book) throw new Error('Book not found');
      return book;
    },
  },
  mutation: {
    async createBook(_, args) {
      const book = await Books.create(args);
      if (!book) throw new Error('Error');
      return book;
    },
    async deleteBook(_, _id) {
      const result = await Books.deleteOne({ _id });
      if (!result.n) throw new Error('Book not found');
      return 'OK';
    },
    async updateBook(_, args) {
      const { _id } = args;
      const result = await Books.updateOne({ _id }, args);
      if (!result.n) throw new Error('Book not found');
      const book = await Books.findOne({ _id });
      return book;
    },
  },
};
