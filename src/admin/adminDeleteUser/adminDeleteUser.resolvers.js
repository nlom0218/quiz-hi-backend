import client from "../../client";
import { deleteToS3 } from "../../shared/shared";

export default {
  Mutation: {
    adminDeleteUser: async (_, { username }) => {
      const user = await client.user.findUnique({
        where: { username },
        include: {
          quizLike: true,
          questionLike: true
        }
      })

      if (user.avatarURL) {
        await deleteToS3(user.avatarURL, "userProfile")
      }
      await client.homeworkResult.deleteMany({
        where: {
          user: {
            id: user.id
          }
        }
      })
      await client.quizLike.deleteMany({
        where: {
          userId: user.id
        }
      })
      await client.quizLike.deleteMany({
        where: {
          quiz: {
            userId: user.id
          }
        }
      })
      await client.questionLike.deleteMany({
        where: {
          userId: user.id
        }
      })
      await client.questionLike.deleteMany({
        where: {
          userId: user.id
        }
      })
      await client.quiz.deleteMany({
        where: {
          userId: user.id
        }
      })
      await client.question.deleteMany({
        where: {
          userId: user.id
        }
      })
      await client.user.deleteMany({
        where: {
          teacher: {
            some: {
              id: user.id
            }
          }
        }
      })
      await client.user.delete({
        where: { username }
      })
      return {
        ok: true
      }
    }
  }
}