import client from "../client"

export default {
  Quiz: {
    questionNum: async ({ id }) => client.question.count({
      where: { quiz: { some: { id } } }
    }),
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      const like = await client.quizLike.findUnique({
        where: {
          quizId_userId: {
            quizId: id,
            userId: loggedInUser.id
          }
        }
      })
      if (like) {
        return true
      } else {
        return false
      }
    },
    questions: async ({ id }) => {
      return await client.question.findMany({
        where: {
          quiz: { some: { id } }
        },
        include: { user: true, tags: true },
        orderBy: { createdAt: "asc" }
      })
    }
  },
  Question: {
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      const like = await client.questionLike.findUnique({
        where: {
          questionId_userId: {
            questionId: id,
            userId: loggedInUser.id
          }
        }
      })
      if (like) {
        return true
      } else {
        return false
      }
    },
    user: async ({ userId }) => {
      return await client.user.findUnique({ where: { id: userId } })
    },
    tags: async ({ id }) => {
      return await client.tag.findMany({
        where: {
          questions: {
            some: { id }
          }
        }
      })
    }
  }
}