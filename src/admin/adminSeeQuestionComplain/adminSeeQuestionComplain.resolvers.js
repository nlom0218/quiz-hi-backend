import client from "../../client"

export default {
  Query: {
    adminSeeQuestionComplain: async (_, { page }) => {
      const questionComplain = await client.questionComplain.findMany({
        take: 20,
        skip: page * 20 - 20,
        orderBy: { questionId: "asc" },
        include: { question: true }
      })
      const totalNum = await client.questionComplain.count()
      return {
        questionComplain,
        totalNum
      }
    }
  }
}