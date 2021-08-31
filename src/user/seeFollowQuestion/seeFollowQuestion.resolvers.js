import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    seeFollowQuestion: protectedResolver(async (_, { id, page }) => {
      const question = await client.question.findMany({
        where: {
          followUser: { some: { id } }
        },
        take: 10,
        skip: page * 10 - 10,
        orderBy: { createdAt: "desc" },
        include: { user: true, tags: true }
      })
      const totalNum = await client.question.count({
        where: {
          followUser: { some: { id } }
        }
      })
      return {
        question,
        totalNum
      }
    })
  }
}