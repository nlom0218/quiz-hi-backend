import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Query: {
    seeNewMakeQuestion: protectedResolver(async (_, { id, questionId }, { loggedInUser }) => {
      const userFollowQuestion = await client.question.findMany({
        where: {
          followUser: {
            some: { id }
          }
        },
        orderBy: { createdAt: "desc" }
      })
      const questionIdArr = JSON.parse(questionId)
      return userFollowQuestion.map((item) => {
        if (questionIdArr.map((item) => parseInt(item)).includes(item.id)) {
          return item
        } else {
          return
        }
      }).filter((item) => item !== undefined)
    })
  }
}