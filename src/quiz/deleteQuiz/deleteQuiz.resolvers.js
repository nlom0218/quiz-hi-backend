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
          error: "삭제 권한이 없습니다."
        }
      } else {
        await client.quizLike.deleteMany({
          where: {
            quiz: {
              id
            }
          }
        })
        await client.quizComplain.deleteMany({
          where: {
            quiz: {
              id
            }
          }
        })
        await client.quiz.delete({
          where: { id }
        })
        return {
          ok: true
        }
      }
    })
  }
}