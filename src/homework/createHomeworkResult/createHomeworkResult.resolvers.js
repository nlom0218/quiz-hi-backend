import client from "../../client";
import { compare } from "../../shared/shared";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    createHomeworkResult: protectedResolver(async (_, { quizId, result, order, score, quizTitle, teacherId }, { loggedInUser }) => {
      const student = await client.user.findUnique({ where: { id: loggedInUser.id } })
      const quiz = await client.quiz.findUnique({ where: { id: quizId } })
      const studentQuizScoreArr = JSON.parse(student.quizScore)
      const newStudentQuizScoreArr = [...studentQuizScoreArr,
      { score, order, quizTitle: quiz.title, num: studentQuizScoreArr.length + 1, teacherId }].sort(compare("num"))
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
          result,
          score,
          title: quizTitle,
          quizId
        }
      })
      return {
        ok: true
      }
    })
  }
}