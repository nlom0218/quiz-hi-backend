import client from "../../client";

export default {
  Query: {
    seeProfile: (_, { username }) => client.user.findUnique({
      where: { username },
      include: {
        tags: true,
        quiz: true,
        question: true,
        teacher: true,
        homework: true,
        notice: true
      }
    })
  }
}