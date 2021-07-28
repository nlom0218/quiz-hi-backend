import client from "../../client";
import { protectedResolver } from "../../user/users.utils";
import { processTags } from "../quiz.utils";

export default {
  Mutation: {
    createQuiz: protectedResolver(async (_, { questions, title, tags, state }, { loggedInUser }) => {
      const questionsIdArr = questions.split(",").map((item) => parseInt(item))
      let tagsArr = []
      if (tags) {
        tagsArr = processTags(tags)
      }
      await client.quiz.create({
        data: {
          title,
          state,
          user: {
            connect: { id: loggedInUser.id }
          },
          questions: {
            connect: questionsIdArr.map((item) => {
              return { id: item }
            })
          },
          ...(tags && {
            tags: {
              connectOrCreate: tagsArr
            }
          })
        }
      })
      return {
        ok: true
      }
    })
  }
}