const jwt = require("../utils/jwt");
const { newError } = require("../utils/error");

async function authUser(resolve, parent, args, { req, res }) {
  const auth = req.get("Authorization");
  if (!auth) return newError("Authorization not found!", res, 401);

  const token = auth.split(" ")[1];
  if (!token) return newError("Token not found!", res, 400);

  const decoded = await jwt.verify(token);
  if (!decoded) return newError("Invalid token!", res, 401);

  req.userID = decoded.id;

  return resolve();
}

module.exports = {
  Query: {
    user: authUser
  },
  Mutation: {
    updateUser: authUser,
    deleteUser: authUser,
    addBook: authUser,
    removeBook: authUser
  }
};
