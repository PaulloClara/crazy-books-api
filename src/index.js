const { GraphQLServer } = require('graphql-yoga');
const path = require('path');
const resolvers = require('./resolvers');

const opts = {
  port: 5000,
};

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, 'models', 'schema.graphql'),
  resolvers,
  graphiql: true,
});

server.start(opts, () => {
  console.log(`
    \tRodando na porta ${opts.port}
    Acesse "http://localhost:${opts.port}"
  `);
})
