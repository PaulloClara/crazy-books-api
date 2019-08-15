const jwt = require('../configs/jwt');

async function authUser(resolve, parent, args, ctx, info) {
  const auth = ctx.request.get('Authorization');
  if (!auth) throw new Error('Authorization not found!');
  const token = auth.split(' ')[1];
  if (!token) throw new Error('Token not found!');
  const decoded = await jwt.verify(token);
  if (!decoded) throw new Error('Invalid token!');
  ctx.request.userID = decoded.id;
  return resolve();
}

module.exports = {
  Query: {
    user: authUser,
  },
  Mutation: {
    updateUser: authUser,
    deleteUser: authUser,
  },
};
