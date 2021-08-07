import client from "../../client"

export default {
  Query: {
    detailQuiz: async (_, { id }) => {
      return await client.quiz.findUnique({
        where: { id },
        include: {
          user: true,
          tags: true
        },
      })
    }
  }
}