import client from "../../client"

export default {
  Query: {
    adminSeeQuizComplain: async (_, { page }) => {
      const quizComplain = await client.quizComplain.findMany({
        take: 20,
        skip: page * 20 - 20,
        orderBy: { quizId: "asc" },
        include: { quiz: true }
      })
      const totalNum = await client.quizComplain.count()
      return {
        quizComplain,
        totalNum
      }
    }
  }
}