import client from "../../client"

export default {
  Query: {
    seeUserPublicQuestion: async (_, { userId, page }) => {
      return await client.question.findMany({
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
    seeUserPrivateQuestion: async (_, { userId, page }) => {
      return await client.question.findMany({
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