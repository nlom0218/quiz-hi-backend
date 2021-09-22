import client from "../../client"

export default {
  Mutation: {
    confirmExistEmail: async (_, { email }) => {
      const user = await client.user.findUnique({
        where: {
          email
        }
      })
      if (!user) {
        return {
          ok: false,
          error: "이메일이 존재하지 않습니다."
        }
      } else {
        return {
          ok: true
        }
      }
    }
  }
}