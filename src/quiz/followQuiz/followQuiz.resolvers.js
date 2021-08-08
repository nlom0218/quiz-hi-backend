import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    followQuiz: protectedResolver(async (_, { quizIds }, { loggedInUser }) => {
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