import client from "../../client";
import { deleteToS3, uploadToS3 } from "../../shared/shared";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    editQuestion: protectedResolver(async (_, { id, question, answer, hint, distractor, image, tags, updateInfo, delImg }, { loggedInUser }) => {
      const existQuestion = await client.question.findUnique({ where: { id }, include: { tags: true } })
      if (!existQuestion) {
        return {
          ok: false,
          error: "문제를 찾을 수 없습니다."
        }
      }
      if (existQuestion.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "문제 수정 권환이 없습니다."
        }
      }

      let newHint = hint
      if (hint === "") {
        newHint = null
      }

      const newTagsArr = tags.split(",")
      const existTagsArr = existQuestion.tags.map((item) => item.name)
      const addTagsArr = newTagsArr.filter((item) => !existTagsArr.includes(item))
      const delTagsArr = existTagsArr.filter((item) => !newTagsArr.includes(item))

      let imageURL = ""
      if (image) {
        if (existQuestion.image) {
          await deleteToS3(existQuestion.image, "question")
        }
        imageURL = await uploadToS3(image, loggedInUser, "question")
      }

      if (delImg) {
        await deleteToS3(existQuestion.image, "question")
      }

      await client.question.update({
        where: { id },
        data: {
          question,
          answer,
          hint: newHint,
          ...(distractor && { distractor }),
          ...(updateInfo && { updateInfo }),
          ...(image && { image: imageURL }),
          ...(delImg && { image: null }),
          ...(tags === "" ? {
            tags: {
              disconnect: existTagsArr.map((item) => {
                return { name: item }
              })
            }
          }
            :
            {
              tags: {
                connectOrCreate: addTagsArr.map((item) => {
                  return {
                    create: { name: item },
                    where: { name: item }
                  }
                }),
                disconnect: delTagsArr.map((item) => {
                  return { name: item }
                })
              }
            })
        }
      })
      return {
        ok: true,
        ...(image && { error: imageURL }),
      }
    })
  }
}