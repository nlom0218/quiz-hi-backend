import client from "../../client"

export default {
  Mutation: {
    adminChangeUserType: async (_, { username, email }) => {
      await client.user.update({
        where: { username },
        data: {
          email,
          type: "teacher"
        }
      })
      return {
        ok: true
      }
    }
  }
}