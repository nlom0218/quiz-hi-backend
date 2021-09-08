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

      const existHomework = await client.homework.findFirst({
        where: {
          teacherId: teacher.id,
          quizId: quiz.id
        }
      })
      if (existHomework) {
        return {
          ok: false,
          error: "이미 해당 퀴즈를 숙제로 내보냈습니다. 해당 퀴즈를 내보내기 위해서는 프로필 > 학생 관리의 숙제 목록에서 숙제 종료 후 숙제를 삭제해 주시길 바랍니다."
        }
      }

      const studentIdArr = studentId.split(",").map((item) => { return { id: parseInt(item) } })
      await client.homework.create({
        data: {
          score,
          user: {
            connect: studentIdArr
          },
          order: teacherQuizScoreArr.length + 1,
          mode,
          ...(targetScore && { targetScore }),
          teacherId: teacher.id,
          title: quiz.title,
          quizId
        }
      })
      return {
        ok: true
      }
    })
  }
}