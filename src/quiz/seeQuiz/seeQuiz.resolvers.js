import client from "../../client"


export default {
  Query: {
    seeQuiz: async (_, { seeType, page }, { loggedInUser }) => {
      if (seeType === "all") {
        return client.quiz.findMany({
          where: { state: "public" },
          include: {
            user: true
          },
          take: 10,
          skip: page * 10 - 10,
          orderBy: {
            createdAt: "desc"
          }
        })
      }
    }
  }
}