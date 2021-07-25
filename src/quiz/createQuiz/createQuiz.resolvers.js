import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    createQuiz: protectedResolver(async (_, { questions, title }, { loggedInUser }) => {
      const questionsIdArr = questions.split(",").map((item) => parseInt(item))
      console.log(questionsIdArr);
      await client.quiz.create({
        data: {
          title,
          user: {
            connect: { id: loggedInUser.id }
          },
          questions: {
            connect: questionsIdArr.map((item) => {
              return { id: item }
            })
          }
        }
      })
      return {
        ok: true
      }
    })
  }
}