import client from "../../client"

export default {
  Query: {
    adminSeeUser: async (_, { type, page }) => {
      const user = await client.user.findMany({
        take: 10,
        skip: page * 10 - 10,
        ...(type !== "all" && { where: { type } }),
        orderBy: { createdAt: "desc" }
      })
      const totalNum = await client.user.count({
        ...(type !== "all" && { where: { type } }),
      })
      return {
        user,
        totalNum
      }
    }
  }
}