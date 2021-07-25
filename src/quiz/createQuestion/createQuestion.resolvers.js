import client from "../../client";
import { uploadToS3 } from "../../shared/shared";
import { protectedResolver } from "../../user/users.utils";
import { GraphQLUpload } from "graphql-upload"

export default {
  Upload: GraphQLUpload,
  Mutation: {
    createQuestion: protectedResolver(
      async (_, { question, answer, type, image }, { loggedInUser }) => {
        let imageURL = ""
        if (image) {
          imageURL = await uploadToS3(image, loggedInUser, "question")
        }
        console.log("imageURL:", imageURL);
        await client.question.create({
          data: {
            question,
            answer,
            type,
            ...(image && { image: imageURL }),
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