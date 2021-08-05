import client from "../../client"

export default {
  Query: {
    seeUserPublicQuiz: async (_, { userId, page }) => {
      return await client.quiz.findMany({
        where: {
          userId,
          state: "public"
        },
        include: {
          user: true,
          tags: true
        },
        take: 10,
        skip: page * 10 - 10,
        orderBy: { createdAt: "desc" }
      })
    },
    seeUserPrivateQuiz: async (_, { userId, page }, { loggedInUser }) => {
      if (userId !== loggedInUser.id) {
        return
      }
      return await client.quiz.findMany({
        where: {
          userId,
          state: "private"
        },
        include: {
          user: true,
          tags: true
        },
        take: 10,
        skip: page * 10 - 10,
        orderBy: { createdAt: "desc" }
      })
    },
  }
}