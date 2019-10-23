require("dotenv").config();

const { ApolloServer, makeExecutableSchema } = require("apollo-server");
const { applyMiddleware } = require("graphql-middleware");

const resolvers = require("./resolvers");
const typeDefs = require("./schemas/graphql");
const authUser = require("./middlewares/authUser");

const cors = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
};

const schema = applyMiddleware(
  makeExecutableSchema({ typeDefs, resolvers }),
  authUser
);

const server = new ApolloServer({
  cors,
  schema,
  context: context => context
});

const opts = {
  endpoint: "/graphql",
  port: process.env.PORT || 5000
};

const runServer = async () => {
  const infos = await server.listen(opts);

  console.log(`
    \n\n\t\t🚀 Server ready at "${infos.url}"
    \tAccess "${infos.url}graphql/" to make requests
  `);
};

runServer();
