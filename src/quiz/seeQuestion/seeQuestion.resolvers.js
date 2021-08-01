import client from "../../client"

export default {
  Query: {
    seeQuestion: async (_, { seeType, page, search, sort }, { loggedInUser }) => {
      if (seeType === "all") {
        return client.question.findMany({
          where: {
            state: "public",
            ...(search && { question: { contains: search } })
          },
          include: {
            user: true,
            tags: true
          },
          take: 10,
          skip: page * 10 - 10,
          orderBy: {
            ...(sort === "recent" && { createdAt: "desc" }),
            ...(sort === "hits" && { hits: "desc" }),
            ...(sort === "likes" && { likes: "desc" })
          }
        })
      } else if (seeType === "tags") {
        return client.question.findMany({
          where: {
            state: "public",
            ...(search && { question: { contains: search } })
          },
          include: {
            user: true,
            tags: true
          },
          take: 10,
          skip: page * 10 - 10,
          orderBy: {
            ...(sort === "recent" && { createdAt: "desc" }),
            ...(sort === "hits" && { hits: "desc" }),
            ...(sort === "likes" && { likes: "desc" })
          }
        })
      }
    }
  }
}