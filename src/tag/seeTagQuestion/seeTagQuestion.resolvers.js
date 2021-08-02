import client from "../../client"

export default {
  Query: {
    seeTagQuestion: async (_, { type, id, page }) => {
      return await client.question.findMany({
        where: {
          tags: { some: { id } }
        },
        include: {
          user: true,
          tags: true
        },
        take: 10,
        skip: page * 10 - 10,
        ...(type === "recent" && { orderBy: { createdAt: "desc" } }),
        ...(type === "likes" && { orderBy: { likes: "desc" } })
      })
    }
  }
}