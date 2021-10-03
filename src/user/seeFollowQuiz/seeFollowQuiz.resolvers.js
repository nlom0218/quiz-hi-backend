import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    seeFollowQuiz: protectedResolver(async (_, { id, page }) => {
      const user = await client.user.findUnique({ where: { id } })
      if (user.type === "nomal") {
        const quiz = await client.quiz.findMany({
          where: { user: { id } },
          orderBy: { createdAt: "desc" },
          take: 10,
          skip: page * 10 - 10,
        })
        const totalNum = await client.quiz.count({ where: { user: { id } } })
        return {
          quiz,
          totalNum
        }
      } else {
        const quiz = await client.quiz.findMany({
          where: {
            followUser: { some: { id } }
          },
          take: 10,
          skip: page * 10 - 10,
          // orderBy: { createdAt: "desc" },
          include: { user: true, tags: true }
        })
        const totalNum = await client.quiz.count({
          where: {
            followUser: { some: { id } }
          }
        })
        return {
          quiz,
          totalNum
        }
      }
    })
  }
}