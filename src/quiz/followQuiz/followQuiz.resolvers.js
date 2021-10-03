import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    followQuiz: protectedResolver(async (_, { quizIds }, { loggedInUser }) => {
      if (loggedInUser.type !== "teacher") {
        return {
          ok: false,
          error: "장바구니 기능은 선생님 계정에서만 이용가능합니다."
        }
      }
      const quizArr = quizIds.split(",").map((item) => { return { id: parseInt(item) } })
      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          followQuiz: {
            connect: quizArr
          }
        }
      })
      return {
        ok: true
      }
    })
  }
}