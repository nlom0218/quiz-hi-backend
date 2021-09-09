import client from "../../client"

export default {
  Mutation: {
    confirmEmail: async (_, { email }) => {
      const user = await client.user.findUnique({
        where: {
          email
        }
      })
      if (user) {
        return {
          ok: false,
          error: "이메일이 이미 존재합니다."
        }
      } else {
        return {
          ok: true
        }
      }
    }
  }
}