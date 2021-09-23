import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    seeFollower: protectedResolver(async (_, { userId, page }) => {
      return await client.user.findMany({
        where: {
          following: {
            some: {
              id: userId,
            }
          }
        },
        take: 10,
        skip: page * 10 - 10,
        orderBy: { nickname: "asc" }
      })
    })
  }
}