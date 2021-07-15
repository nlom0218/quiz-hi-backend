import { ApolloServer } from "apollo-server"
import { typeDefs, resolvers } from "./schema"
import { getUser } from "./user/users.utils"

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token)
    }
  }
})

server.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`))

