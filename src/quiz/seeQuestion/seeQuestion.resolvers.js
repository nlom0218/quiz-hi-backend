import client from "../../client"

export default {
  Query: {
    seeQuestion: async (_, { seeType, page, search, sort, tags }, { loggedInUser }) => {
      if (seeType === "all") {
        const question = await client.question.findMany({
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
          ...(sort === "recent" && { orderBy: { createdAt: "desc" } }),
          ...(sort === "hits" && { orderBy: [{ hits: "desc" }, { createdAt: "desc" }] }),
          ...(sort === "likes" && { orderBy: [{ likes: "desc" }, { createdAt: "desc" }] })
        })
        const totalNum = await client.question.count({
          where: {
            state: "public",
            ...(search && { question: { contains: search } })
          }
        })
        return {
          question,
          totalNum
        }
      } else if (seeType === "tags") {
        const tagsArr = tags.split(",").map((item) => {
          return {
            tags: { some: { name: item } }
          }
        })
        const question = await client.question.findMany({
          where: {
            state: "public",
            ...(search && { question: { contains: search } }),
            AND: tagsArr
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
        const totalNum = await client.question.count({
          where: {
            state: "public",
            ...(search && { question: { contains: search } }),
            AND: tagsArr
          },
        })
        return {
          question,
          totalNum
        }
      }
    }
  }
}