import client from "../../client";
import { compare } from "../../shared/shared";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    createHomeworkResult: protectedResolver(async (_, { quizId, result, order, score }, { loggedInUser }) => {
      const student = await client.user.findUnique({ where: { id: loggedInUser.id } })
      const quiz = await client.quiz.findUnique({ where: { id: quizId } })
      const studentQuizScoreArr = JSON.parse(student.quizScore)
      const newStudentQuizScoreArr = [...studentQuizScoreArr, { score, order }].sort(compare("order"))
      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          quizScore: JSON.stringify(newStudentQuizScoreArr)
        }
      })
      await client.homeworkResult.create({
        data: {
          user: {
            connect: { id: student.id }
          },
          quiz: {
            connect: { id: quiz.id }
          },
          result,
          score
        }
      })
      return {
        ok: true
      }
    })
  }
}