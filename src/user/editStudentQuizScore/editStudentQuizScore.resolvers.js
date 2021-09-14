import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    editStudentQuizScore: protectedResolver(async (_, { studentId, num, score }) => {
      const student = await client.user.findUnique({ where: { id: studentId } })
      if (!student) {
        return {
          ok: false,
          error: "학생을 찾을 수 없습니다."
        }
      }
      const studentQuizScore = JSON.parse(student.quizScore)
      const newStudentQuizScore = studentQuizScore.map((item) => {
        if (parseInt(item.num) === num) {
          return { ...item, score }
        } else {
          return item
        }
      })
      await client.user.update({
        where: { id: studentId },
        data: {
          quizScore: JSON.stringify(newStudentQuizScore)
        }
      })
      return {
        ok: true,
        msg: JSON.stringify(newStudentQuizScore)
      }
    })
  }
}