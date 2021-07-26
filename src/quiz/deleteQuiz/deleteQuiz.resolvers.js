import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    deleteQuiz: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const quiz = await client.quiz.findUnique({
        where: { id }
      })
      if (quiz.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "퀴즈삭제 권한이 없습니다."
        }
      }
      await client.quiz.delete({
        where: { id }
      })
      return {
        ok: true
      }
    })
  }
}