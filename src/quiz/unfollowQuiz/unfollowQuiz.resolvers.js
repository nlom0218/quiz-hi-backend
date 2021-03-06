import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    unfollowQuiz: protectedResolver(async (_, { quizIds }, { loggedInUser }) => {
      const quizArr = quizIds.split(",").map((item) => { return { id: parseInt(item) } })
      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          followQuiz: {
            disconnect: quizArr
          }
        }
      })
      return {
        ok: true
      }
    })
  }
}