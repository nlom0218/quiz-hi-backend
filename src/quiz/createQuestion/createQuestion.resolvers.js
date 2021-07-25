import client from "../../client";
import { uploadToS3 } from "../../shared/shared";
import { protectedResolver } from "../../user/users.utils";
import { GraphQLUpload } from "graphql-upload"
import { processTags } from "../quiz.utils";

export default {
  Upload: GraphQLUpload,
  Mutation: {
    createQuestion: protectedResolver(
      async (_, { question, answer, type, image, tags }, { loggedInUser }) => {
        let imageURL = ""
        if (image) {
          imageURL = await uploadToS3(image, loggedInUser, "question")
        }
        let tagsArr = []
        if (tags) {
          tagsArr = processTags(tags)
        }
        await client.question.create({
          data: {
            question,
            answer,
            type,
            creator: loggedInUser.username,
            ...(image && { image: imageURL }),
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
        return {
          ok: true
        }
      }
    )
  }
}