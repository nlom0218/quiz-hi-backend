import client from "../../client";
import { uploadToS3 } from "../../shared/shared";
import { protectedResolver } from "../../user/users.utils";
import { GraphQLUpload } from "graphql-upload"
import { processTags } from "../quiz.utils";

export default {
  Upload: GraphQLUpload,
  Mutation: {
    createQuestion: protectedResolver(
      async (_, { question, answer, type, image, tags, distractor, hint, state, updata, quizId }, { loggedInUser }) => {
        let imageURL = ""
        if (image) {
          imageURL = await uploadToS3(image, loggedInUser, "question")
        }
        let tagsArr = []
        if (tags) {
          tagsArr = processTags(tags)
        }
        const newQuestion = await client.question.create({
          data: {
            question,
            answer,
            type,
            state,
            ...(distractor && { distractor }),
            ...(image && { image: imageURL }),
            ...(hint && { hint }),
            ...(tags && {
              tags: {
                connectOrCreate: tagsArr
              }
            }),
            user: {
              connect: { id: loggedInUser.id }
            }
          }
        })
        if (updata) {
          await client.quiz.update({
            where: { id: quizId },
            data: {
              questions: {
                connect: { id: newQuestion.id }
              }
            }
          })
          return {
            ok: true,
            questionId: newQuestion.id
          }
        }
        return {
          ok: true,
          questionId: newQuestion.id
        }
      }
    )
  }
}