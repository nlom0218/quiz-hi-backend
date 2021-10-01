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
          return `${sendUser.nickname}선생님께서 메시지를 보냈습니다.`
        } else if (type === "chargeNotice") {
          return "부적절한 게시물로 신고가 접수 되었습니다."
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
      if (type === "chargeNotice") {
        const id = JSON.parse(info)[0].id
        const message = JSON.parse(info)[1].chargeInfo
        const type = JSON.parse(info)[2].type
        const receiver = JSON.stringify({ id: receiveUser.id, username: receiveUser.username })
        const sender = JSON.stringify({ id: sendUser.id, username: sendUser.username })
        if (type === "quiz") {
          await client.quizComplain.create({
            data: {
              quiz: {
                connect: { id }
              },
              message,
              sender,
              receiver
            }
          })
          const complainNum = await client.quizComplain.count({ where: { quizId: id } })
          if (complainNum > 9) {
            await client.quiz.update({
              where: { id },
              data: {
                complain: true
              }
            })
          }
        } else if (type === "question") {
          await client.questionComplain.create({
            data: {
              question: {
                connect: { id }
              },
              message,
              sender,
              receiver
            }
          })
          const complainNum = await client.questionComplain.count({ where: { questionId: id } })
          if (complainNum > 9) {
            await client.question.update({
              where: { id },
              data: {
                complain: true
              }
            })
          }
        }
      }
      return {
        ok: true
      }
    })
  }
}