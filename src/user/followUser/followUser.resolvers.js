import client from "../../client"

export default {
  Mutation: {
    followUser: async (_, { username }, { loggedInUser }) => {
      try {
        const ok = await client.user.findUnique({ where: { username } })
        if (!ok) {
          return {
            ok: false,
            error: "사용자를 찾을 수 없습니다."
          }
        } else if (ok.username === loggedInUser?.username) {
          return {
            ok: false,
            error: "자신을 팔로우 할 수 없습니다."
          }
        }
        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            following: {
              connect: { username }
            }
          }
        })
        return {
          ok: true
        }
      } catch (error) {
        return error
      }
    }
  }
}