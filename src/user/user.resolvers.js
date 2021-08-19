import client from "../client"

export default {
  User: {
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      return id === loggedInUser.id
    },
    score: () => 20000,
    isFollow: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      const ok = await client.user.findFirst({
        where: {
          id: loggedInUser.id,
          following: { some: { id } }
        }
      })
      if (ok) {
        return true
      } else {
        return false
      }
    },
    totalFollow: ({ id }) => client.user.count({ where: { following: { some: { id } } } }),
    totalFollowing: ({ id }) => client.user.count({ where: { followers: { some: { id } } } }),
    totalPublicQuiz: ({ id }) => client.quiz.count({
      where: {
        AND: [
          { userId: id },
          { state: "public" }
        ]
      }
    }),
    totalPublicQuestion: ({ id }) => client.question.count({
      where: {
        AND: [
          { userId: id },
          { state: "public" }
        ]
      }
    }),
    totalFollowTags: async ({ id }) => await client.tag.count({
      where: {
        users: {
          some: { id }
        }
      }
    }),
    totalPrivateQuiz: ({ id }) => client.quiz.count({
      where: {
        AND: [
          { userId: id },
          { state: "private" }
        ]
      }
    }),
    totalPrivateQuestion: ({ id }) => client.question.count({
      where: {
        AND: [
          { userId: id },
          { state: "private" }
        ]
      }
    }),
    students: ({ id }) => client.user.findMany({
      where: {
        teacher: { some: { id } }
      },
      orderBy: { createdAt: "asc" }
    })
  }
}

