require('dotenv').config();

const { GraphQLServer } = require('graphql-yoga');

const typeDefs = require('./schemas/graphql');
const resolvers = require('./resolvers');
const authUser = require('./middlewares/authUser');

const opts = {
  endpoint: '/graphql',
  port: process.env.PORT || 5000,
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: (req) => ({ ...req }),
  middlewares: [authUser],
});

server.start(opts, ({ port, endpoint }) => {
  console.log(`
    \t\t\tRodando na porta ${port}
    \tAcesse "http://localhost:${port}" para acessar o playground
    Acesse "http://localhost:${port}${endpoint}" para fazer requisições HTTP
  `);
});
