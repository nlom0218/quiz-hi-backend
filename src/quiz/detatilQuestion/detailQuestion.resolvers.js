import client from "../../client"

export default {
  Query: {
    detailQuestion: async (_, { id }) => {
      return await client.question.findUnique({
        where: { id },
        include: { user: true, tags: true }
      })
    }
  }
}