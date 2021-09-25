import client from "../../client"

export default {
  Mutation: {
    adminSearchUser: async (_, { username }) => {
      return await client.user.findUnique({
        where: { username }
      })
    }
  }
}