import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    toggleLike: protectedResolver(
      async (_, { type, id }, { loggedInUser }) => {
        if (type === "quiz") {
          const quiz = await client.quiz.findUnique({ where: { id } })
          if (!quiz) {
            return {
              ok: false,
              error: "퀴즈를 찾을 수 없습니다."
            }
          }
          const quizLike = await client.quizLike.findUnique({
            where: {
              quizId_userId: {
                quizId: id,
                userId: loggedInUser.id
              }
            }
          })
          if (quizLike) {
            await client.quizLike.delete({ where: { id: quizLike.id } })
            await client.quiz.update({
              where: { id },
              data: { likes: quiz.likes - 1 }
            })
          } else {
            await client.quizLike.create({
              data: {
                user: { connect: { id: loggedInUser.id } },
                quiz: { connect: { id } },
                quizOnwerId: quiz.userId
              }
            })
            await client.quiz.update({
              where: { id },
              data: { likes: quiz.likes + 1 }
            })
          }
          return {
            ok: true
          }
        } else if (type === "question") {
          const question = await client.question.findUnique({ where: { id } })
          if (!question) {
            return {
              ok: false,
              error: "문제를 찾을 수 없습니다."
            }
          }
          const questionLike = await client.questionLike.findUnique({
            where: {
              questionId_userId: {
                questionId: id,
                userId: loggedInUser.id
              }
            }
          })
          if (questionLike) {
            await client.questionLike.delete({ where: { id: questionLike.id } })
            await client.question.update({
              where: { id },
              data: { likes: question.likes - 1 }
            })
          } else {
            await client.questionLike.create({
              data: {
                user: { connect: { id: loggedInUser.id } },
                question: { connect: { id } },
                questionOnwerId: question.userId
              }
            })
            await client.question.update({
              where: { id },
              data: { likes: question.likes + 1 }
            })
          }
          return {
            ok: true
          }
        }
      }
    )
  }
}