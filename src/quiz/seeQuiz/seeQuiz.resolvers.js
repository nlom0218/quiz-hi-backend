import client from "../../client"

export default {
  Query: {
    seeQuiz: async (_, { seeType, page, search, sort, tags }, { loggedInUser }) => {
      if (seeType === "all") {
        const quiz = await client.quiz.findMany({
          where: {
            state: "public",
            ...(search && { title: { contains: search } })
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
        const totalNum = await client.quiz.count({
          where: {
            state: "public",
            ...(search && { title: { contains: search } })
          }
        })
        return {
          quiz,
          totalNum
        }
      } else if (seeType === "tags") {
        const tagsArr = tags.split(",").map((item) => {
          return {
            tags: { some: { "name": item } }
          }
        })
        const quiz = await client.quiz.findMany({
          where: {
            state: "public",
            ...(search && { title: { contains: search } }),
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
        const totalNum = await client.quiz.count({
          where: {
            state: "public",
            ...(search && { title: { contains: search } }),
            AND: tagsArr
          }
        })
        return {
          quiz,
          totalNum
        }
      }
    }
  }
}