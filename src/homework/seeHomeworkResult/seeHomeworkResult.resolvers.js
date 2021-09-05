import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Query: {
    seeHomeworkResult: protectedResolver(async (_, { userId, quizId }, { loggedInUser }) => {
      return await client.homeworkResult.findFirst({
        where: {
          userId,
          quizId
        },
        include: {
          user: true,
          quiz: true
        }
      })
    })
  }
}