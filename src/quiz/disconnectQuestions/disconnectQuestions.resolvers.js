import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    disconnectQuestions: protectedResolver((async (_, { quizId, questionsId }, { loggedInUser }) => {
      const quiz = await client.quiz.findUnique({ where: { id: quizId } })
      if (!quiz) {
        return {
          ok: false,
          error: "퀴즈를 찾을 수 없습니다."
        }
      }
      if (quiz.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: '수정 권한이 없습니다.'
        }
      }
      const questionsIdArr = questionsId.split(",").map((item) => parseInt(item))
      const disconnectArr = questionsIdArr.map((item) => {
        return { id: item }
      })
      await client.quiz.update({
        where: { id: quizId },
        data: {
          questions: {
            disconnect: disconnectArr
          }
        }
      })
      return {
        ok: true
      }
    }))
  }
}