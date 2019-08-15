require('dotenv').config();

const { GraphQLServer } = require('graphql-yoga');
const path = require('path');
const resolvers = require('./resolvers');
const authUser = require('./middlewares/authUser');

const opts = {
  port: 5000,
};

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, 'schemas', 'schema.graphql'),
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
