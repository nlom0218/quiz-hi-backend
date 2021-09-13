import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    deleteNotice: protectedResolver(async (_, { noticeId }, { loggedInUser }) => {
      const notice = await client.notice.findUnique({
        where: { id: noticeId }
      })
      if (loggedInUser.id !== notice.userId) {
        return {
          ok: false,
          error: "권한이 없습니다."
        }
      }
      await client.notice.delete({
        where: { id: noticeId }
      })
      return {
        ok: true
      }
    })
  }
}