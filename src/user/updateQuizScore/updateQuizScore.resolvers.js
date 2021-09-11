import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    updateQuizScore: protectedResolver(async (_, { result, teacherId, quizTitle, quizId }, { loggedInUser }) => {
      const teacher = await client.user.findUnique({ where: { id: teacherId } })
      const teacherQuizScoreArr = JSON.parse(teacher.quizScore)
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
        const newQuizScoreArr = [...stduentQuizScoreArr,
        { score: resultArr[i].score, quizTitle, order: teacherQuizScoreArr.length + 1, num: stduentQuizScoreArr.length + 1, teacherId }
        ]

        await client.user.update({
          where: { id: resultArr[i].id },
          data: {
            quizScore: JSON.stringify(newQuizScoreArr)
          }
        })
      }

      const newTeacherQuizScoreArr = [...teacherQuizScoreArr, { quizId, quizTitle, order: teacherQuizScoreArr.length + 1 }]
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