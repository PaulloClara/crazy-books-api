const jwt = require('jsonwebtoken');

const privateKey = process.env.PRIVATE_KEY;

module.exports = {
  sign(id) {
    return jwt.sign({ id }, privateKey, { expiresIn: 86400 });
  },
  verify(token) {
    return jwt.verify(token, privateKey, (err, decoded) => (err ? false : decoded));
  },
};
