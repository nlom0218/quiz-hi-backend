import client from "../../client"

export default {
  Query: {
    adminSeeQuestionComplain: async (_, { page }) => {
      const question = await client.question.findMany({
        take: 20,
        skip: page * 20 - 20,
        include: {
          QuestionComplain: true,
          user: true
        },
        where: {
          complain: true
        }
      })
      const totalNum = await client.question.count({
        where: {
          complain: true
        }
      })
      return {
        question,
        totalNum
      }
    }
  }
}