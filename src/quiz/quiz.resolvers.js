import client from "../client"

export default {
  Quiz: {
    questionNum: async ({ id }) => client.question.count({
      where: { quiz: { some: { id } } }
    })
  }
}