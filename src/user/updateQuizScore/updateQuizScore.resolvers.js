import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    updateQuizScore: protectedResolver(async (_, { result, teacherId }, { loggedInUser }) => {
      const teacher = await client.user.findUnique({ where: { id: teacherId } })
      const teacherQuizScoreArr = JSON.parse(teacher.quizScore)
      console.log(teacherQuizScoreArr);
      if (teacher.id !== loggedInUser.id) {
        return {
          ok: false,
          error: "권한이 없습니다."
        }
      }

      const resultArr = JSON.parse(result)
      for (let i = 0; i < resultArr.length; i++) {
        const student = await client.user.findUnique({ where: { id: resultArr[i].id } })
        if (!student) {
          return {
            ok: false,
            error: "학생을 찾을 수 없습니다."
          }
        }
        const stduentQuizScoreArr = JSON.parse(student.quizScore)
        const newQuizScoreArr = [...stduentQuizScoreArr, { quizId: resultArr[i].quizId, score: resultArr[i].score, order: teacherQuizScoreArr.length + 1 }]
        await client.user.update({
          where: { id: resultArr[i].id },
          data: {
            quizScore: JSON.stringify(newQuizScoreArr)
          }
        })
      }

      const newTeacherQuizScoreArr = [...teacherQuizScoreArr, { quizId: resultArr[0].quizId, order: teacherQuizScoreArr.length + 1 }]
      await client.user.update({
        where: { id: teacherId },
        data: {
          quizScore: JSON.stringify(newTeacherQuizScoreArr)
        }
      })

      return {
        ok: true
      }
    })
  }
}