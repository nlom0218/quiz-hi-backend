import client from "../client"

export default {
  Tag: {
    totalFollowUsers: async ({ id }) => await client.user.count({
      where: {
        tags: {
          some: { id }
        }
      }
    }),
    totalQuestions: async ({ id }) => await client.question.count({
      where: {
        tags: {
          some: { id }
        },
        state: "public"
      }
    }),
    totalQuizzes: async ({ id }) => await client.quiz.count({
      where: {
        tags: {
          some: { id },
        },
        state: "public"
      }
    }),
    isFollow: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      const exist = await client.user.findFirst({
        where: {
          id: loggedInUser.id,
          tags: {
            some: { id }
          }
        }
      })
      if (exist) {
        return true
      } else {
        return false
      }
    }
  }
}