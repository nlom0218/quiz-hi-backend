import client from "../client"

export default {
  User: {
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false
      }
      return id === loggedInUser.id
    },
    score: () => 0,
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
    totalFollowing: ({ id }) => client.user.count({ where: { followers: { some: { id } } } })
  }
}

