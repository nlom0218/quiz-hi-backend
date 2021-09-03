import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    createHomework: protectedResolver(async (_, { quizId, studentId, score, mode, targetScore }, { loggedInUser }) => {
      const teacher = await client.user.findUnique({ where: { id: loggedInUser.id } })
      const quiz = await client.quiz.findUnique({ where: { id: quizId } })
      const teacherQuizScoreArr = JSON.parse(teacher.quizScore)
      const newTeacherQuizScoreArr = [...teacherQuizScoreArr, { quizId, quizTitle: quiz.title, order: teacherQuizScoreArr.length + 1 }]
      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          quizScore: JSON.stringify(newTeacherQuizScoreArr)
        }
      })

      const studentIdArr = studentId.split(",").map((item) => { return { id: parseInt(item) } })
      await client.homework.create({
        data: {
          quiz: {
            connect: { id: quizId }
          },
          score: JSON.stringify(score.split(",")),
          user: {
            connect: studentIdArr
          },
          order: teacherQuizScoreArr.length + 1,
          mode,
          ...(targetScore && { targetScore }),
          teacherId: teacher.id,
          title: quiz.title
        }
      })
      return {
        ok: true
      }
    })
  }
}