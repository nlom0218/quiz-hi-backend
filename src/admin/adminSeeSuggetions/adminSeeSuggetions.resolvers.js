import client from "../../client"

export default {
  Query: {
    adminSeeSuggetions: async (_, { page }) => {
      const suggestions = await client.suggestions.findMany({
        take: 20,
        skip: page * 20 - 20,
        orderBy: { createdAt: "desc" }
      })
      const totalNum = await client.suggestions.count()
      return {
        suggestions,
        totalNum
      }
    }
  }
}