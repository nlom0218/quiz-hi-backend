import client from "../../client"

export default {
  Mutation: {
    updateHit: async (_, { id, type }) => {
      if (type === "quiz") {
        const quiz = await client.quiz.findUnique({ where: { id } })
        if (!quiz) {
          return {
            ok: false,
            error: "퀴즈를 찾을 수 없습니다."
          }
        }
        await client.quiz.update({
          where: { id },
          data: { hits: quiz.hits + 1 }
        })
        return {
          ok: true
        }
      } else if (type === "question") {
        const question = await client.question.findUnique({ where: { id } })
        if (!question) {
          return {
            ok: false,
            error: "문제를 찾을 수 없습니다."
          }
        }
        await client.question.update({
          where: { id },
          data: { hits: question.hits + 1 }
        })
        return {
          ok: true
        }
      }
    }
  }
}