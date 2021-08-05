import client from "../../client";
import { protectedResolver } from "../../user/users.utils";
import { processTags } from "../quiz.utils";

export default {
  Mutation: {
    editQuiz: protectedResolver(async (_, { id, title, caption, tags, updateInfo }, { loggedInUser }) => {
      const quiz = await client.quiz.findUnique({ where: { id }, include: { tags: true } })
      if (!quiz) {
        return {
          ok: false,
          error: "퀴즈를 찾을 수 없습니다."
        }
      }
      if (quiz.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "퀴즈 수정 권환이 없습니다."
        }
      }

      const newTagsArr = tags.split(",")
      const existTagsArr = quiz.tags.map((item) => item.name)
      const addTagsArr = newTagsArr.filter((item) => !existTagsArr.includes(item))
      const delTagsArr = existTagsArr.filter((item) => !newTagsArr.includes(item))

      await client.quiz.update({
        where: { id },
        data: {
          ...(title && { title }),
          ...(caption && { caption }),
          ...(updateInfo && { updateInfo }),
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
        ok: true
      }
    })
  }
}