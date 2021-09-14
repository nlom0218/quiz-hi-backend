import { compare } from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    editTeacherQuizScore: protectedResolver(async (_, { id, order }, { loggedInUser }) => {
      const teacher = await client.user.findUnique({ where: { id } })
      if (teacher.id !== loggedInUser.id) {
        return {
          ok: false,
          error: "권한이 없습니다."
        }
      }
      const quizScore = JSON.parse(teacher.quizScore)
      const newQuizScore = quizScore.filter((item) => parseInt(item.order) !== order)
      await client.user.update({
        where: { id },
        data: {
          quizScore: JSON.stringify(newQuizScore)
        }
      })

      return {
        ok: true
      }
    })
  }
}