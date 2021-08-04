import client from "../../client"

export default {
  Query: {
    seePopularQuestion: async (_, { userId }) => {
      return await client.question.findMany({
        where: {
          userId
        },
        include: { tags: true },
        take: 3,
        orderBy: { likes: "desc" }
      })
    }
  }
}