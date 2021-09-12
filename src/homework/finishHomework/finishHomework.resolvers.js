import client from "../../client";
import { compare } from "../../shared/shared";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    finishHomework: protectedResolver(async (_, { homeworkId, totalScore }, { loggedInUser }) => {
      const teacher = await client.user.findUnique({ where: { id: loggedInUser.id } })
      const homework = await client.homework.findUnique({
        where: { id: homeworkId },
        include: { user: true }
      })
      if (teacher.id !== homework.teacherId) {
        return {
          ok: false,
          error: "숙제 삭제 권한이 없습니다."
        }
      }

      if (homework.mode === "cooperation") {
        if (totalScore >= homework.targetScore) {
          const studentArr = homework.user
          for (let i = 0; i < studentArr.length; i++) {
            const quizScoreArr = JSON.parse(studentArr[i].quizScore)
            const homeworkScore = quizScoreArr.filter((item) => item.teacherId === teacher.id).filter((item) => item.order === homework.order)[0]
            const existArr1 = quizScoreArr.filter((item) => item.teacherId === teacher.id).filter((item) => item.order !== homework.order)
            const existArr2 = quizScoreArr.filter((item) => item.teacherId !== teacher.id)
            const newHomeworkScore = { ...homeworkScore, ...{ score: homeworkScore.score + teacher.cooperationScore } }
            const newQuizScore = JSON.stringify([...existArr1, existArr2, newHomeworkScore].sort(compare("num")))
            await client.user.update({
              where: { id: studentArr[i].id },
              data: {
                quizScore: newQuizScore
              }
            })
          }
        }
      }

      await client.homework.update({
        where: { id: homeworkId },
        data: {
          finish: true
        }
      })
      return {
        ok: true
      }
    })
  }
}