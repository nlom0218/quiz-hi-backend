import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    sendNotice: protectedResolver(async (_, { info, type, receiverEmail }, { loggedInUser }) => {
      const sendUser = await client.user.findUnique({ where: { id: loggedInUser.id } })
      const receiveUser = await client.user.findUnique({ where: { email: receiverEmail } })
      if (!receiveUser) {
        return {
          ok: false,
          error: "이메일이 존재하지 않습니다."
        }
      }

      const processMessage = () => {
        if (type === "sharedStudent") {
          return `${sendUser.nickname}선생님께서 학생 목록을 보냈습니다. 수락하시겠습니까?`
        } else if (type === "editNotice") {
          return `${sendUser.nickname}선생님께서 메세지를 보냈습니다.`
        } else if (type === "chargeNotice") {
          return "신고가 접수 되었습니다."
        }
      }
      await client.notice.create({
        data: {
          user: {
            connect: {
              email: receiverEmail
            }
          },
          type,
          info,
          sender: sendUser.nickname,
          message: processMessage()
        }
      })
      return {
        ok: true
      }
    })
  }
}