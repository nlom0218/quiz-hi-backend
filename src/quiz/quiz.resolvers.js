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
    }
  }
}