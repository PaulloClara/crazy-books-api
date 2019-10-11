module.exports = {
  title: {
    type: String,
    required: true
  },
  titleBr: {
    type: String,
    required: false
  },
  pages: {
    type: Number,
    required: true
  },
  languages: {
    type: [String],
    required: true
  },
  categories: {
    type: [String],
    required: true
  },
  synopsis: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
};
