import client from "../../client"

export default {
  Query: {
    seePopularQuiz: async (_, { userId }) => {
      return await client.quiz.findMany({
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