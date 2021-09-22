import client from "../../client"

export default {
  Query: {
    findUsername: async (_, { email }) => {
      return await client.user.findUnique({
        where: {
          email
        }
      })
    }
  }
}