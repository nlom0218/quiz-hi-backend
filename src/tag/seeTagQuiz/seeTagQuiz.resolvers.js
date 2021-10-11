import client from "../../client"

export default {
  Query: {
    seeTagQuiz: async (_, { type, id, page }) => {
      return await client.quiz.findMany({
        where: {
          tags: { some: { id } },
          state: "public"
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