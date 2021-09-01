import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    unfollowAllQuizQuestion: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const user = await client.user.findUnique({
        where: { id },
        include: {
          followQuestion: true,
          followQuiz: true
        }
      })
      const userFollowQuizIdArr = user.followQuiz.map((item) => { return { id: parseInt(item.id) } })
      const userFollowQuestionIdArr = user.followQuestion.map((item) => { return { id: parseInt(item.id) } })
      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          followQuiz: {
            disconnect: userFollowQuizIdArr
          },
          followQuestion: {
            disconnect: userFollowQuestionIdArr
          }
        }
      })
      return {
        ok: true
      }
    })
  }
}