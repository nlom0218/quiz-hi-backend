import client from "../../client"

export default {
  Mutation: {
    adminSetDeleteDay: async (_, { contentId, type, deleteDay }) => {
      if (type === "quiz") {
        const quiz = await client.quiz.findUnique({ where: { id: contentId } })
        if (quiz.complain) {
          return {
            ok: false,
            error: "이미 삭제 날짜가 설정되었습니다."
          }
        }
        await client.quiz.update({
          where: { id: contentId },
          data: {
            complain: true,
            deleteDay
          }
        })
      } else if (type === "question") {
        const question = await client.question.findUnique({ where: { id: contentId } })
        if (question.complain) {
          return {
            ok: false,
            error: "이미 삭제 날짜가 설정되었습니다."
          }
        }
        await client.question.update({
          where: { id: contentId },
          data: {
            complain: true,
            deleteDay
          }
        })
      }
      return {
        ok: true
      }
    }
  }
}