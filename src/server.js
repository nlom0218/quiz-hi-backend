require("dotenv").config()
import { ApolloServer } from "apollo-server-express"
import { typeDefs, resolvers } from "./schema"
import { getUser } from "./user/users.utils"
import { graphqlUploadExpress } from 'graphql-upload';
import express from "express"
import logger from "morgan"

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   playground: true,
//   introspection: true,
//   context: async ({ req }) => {
//     return {
//       loggedInUser: await getUser(req.headers.token)
//     }
//   }
// })

const PORT = process.env.PORT

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // playground: true,
    // introspection: true,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token)
      }
    }
  });
  await server.start();

  const app = express();
  app.use(logger("tiny"))
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise(r => app.listen({ port: PORT }, r));

  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

startServer();

