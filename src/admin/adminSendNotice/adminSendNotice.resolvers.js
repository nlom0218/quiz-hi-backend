import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    adminSendNotice: protectedResolver(async (_, { info, type, username, sugId }, { loggedInUser }) => {
      const receiveUser = await client.user.findUnique({ where: { username } })
      if (!receiveUser) {
        return {
          ok: false,
          error: "사용자가 존재하지 않습니다."
        }
      }
      await client.notice.create({
        data: {
          user: {
            connect: {
              username
            }
          },
          type,
          info,
          sender: "관리자",
          message: "관리자가 메시지를 보냈습니다."
        }
      })
      await client.suggestions.delete({
        where: { id: sugId }
      })
      return {
        ok: true
      }
    })
  }
}