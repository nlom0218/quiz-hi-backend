import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    confirmNotice: protectedResolver(async (_, { noticeId, userId }, { loggedInUser }) => {
      const user = await client.user.findUnique({ where: { id: userId } })
      if (user.id !== loggedInUser.id) {
        return {
          ok: false,
          error: "권한이 없습니다."
        }
      }
      const notice = await client.notice.findUnique({
        where: { id: noticeId }
      })
      if (user.id !== notice.userId) {
        return {
          ok: false,
          error: "권한이 없습니다."
        }
      }
      await client.notice.update({
        where: { id: noticeId },
        data: {
          confirm: true
        }
      })
      return {
        ok: true
      }
    })
  }
}