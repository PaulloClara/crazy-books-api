require('dotenv').config();

const { GraphQLServer } = require('graphql-yoga');
const cors = require('cors');

const typeDefs = require('./schemas/graphql');
const resolvers = require('./resolvers');
const authUser = require('./middlewares/authUser');

const opts = {
  port: process.env.PORT || 5000,
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: (req) => ({ ...req }),
  middlewares: [authUser],
});

server.use(cors());

server.start(opts, () => {
  console.log(`
    \tRodando na porta ${opts.port}
    Acesse "http://localhost:${opts.port}"
  `);
});
