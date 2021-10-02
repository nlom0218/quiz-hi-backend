import client from "../../client"

export default {
  Query: {
    adminSeeQuizComplain: async (_, { page }) => {
      const quiz = await client.quiz.findMany({
        take: 20,
        skip: page * 20 - 20,
        include: {
          QuizComplain: true,
          user: true
        },
        where: { complain: true }
      })
      const totalNum = await client.quiz.count({
        where: { complain: true }
      })
      return {
        quiz,
        totalNum
      }
    }
  }
}