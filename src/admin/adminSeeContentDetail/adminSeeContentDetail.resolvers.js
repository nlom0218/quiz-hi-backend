import client from "../../client";

export default {
  Query: {
    adminSeeContentDetail: async (_, { contentId, type }) => {
      if (type === "question") {
        return await client.question.findUnique({
          where: { id: contentId },
          include: {
            QuestionComplain: true
          }
        })
      } else if (type === "quiz") {
        return await client.quiz.findUnique({
          where: { id: contentId },
          include: {
            QuizComplain: true
          }
        })
      }
    }
  }
}