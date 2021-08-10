import client from "../../client";
import { deleteToS3 } from "../../shared/shared";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    deleteQuestion: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const question = await client.question.findUnique({
        where: { id }
      })
      if (question.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "삭제 권한이 없습니다."
        }
      } else {
        if (question.image) {
          await deleteToS3(question.image, "question")
        }
        await client.questionLike.deleteMany({
          where: {
            question: {
              id
            }
          }
        })
        await client.question.delete({
          where: { id }
        })
        return {
          ok: true
        }
      }
    })
  }
}