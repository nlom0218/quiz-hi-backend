import client from "../../client";

export default {
  Mutation: {
    createAccount: async (_, { type, email, username, password }) => {
      try {
        const existingUser = await client.user.findUnique({
          where: { username }
        })
        if (existingUser) {
          return {
            ok: false,
            error: "아이디가 이미 존재합니다."
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}