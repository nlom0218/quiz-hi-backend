import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    toggleFollowTag: protectedResolver(
      async (_, { id }, { loggedInUser }) => {
        const tag = await client.tag.findUnique({ where: { id } })
        if (!tag) {
          return {
            ok: false,
            error: "태그를 찾을 수 없습니다."
          }
        }
        const user = await client.user.findFirst({
          where: {
            id: loggedInUser.id,
            tags: { some: { id } }
          }
        })
        if (user) {
          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              tags: {
                disconnect: { id }
              }
            }
          })
        } else {
          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              tags: {
                connect: { id }
              }
            }
          })
        }
        return {
          ok: true
        }
      }
    )
  }
}