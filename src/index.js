require('dotenv').config();

const { GraphQLServer } = require('graphql-yoga');

const typeDefs = require('./schemas/graphql');
const resolvers = require('./resolvers');
const authUser = require('./middlewares/authUser');

const opts = {
  port: 5000,
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({ ...req }),
  middlewares: [authUser],
});

server.start(opts, () => {
  console.log(`
    \tRodando na porta ${opts.port}
    Acesse "http://localhost:${opts.port}"
  `);
})
