import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    editHomeSetting: protectedResolver(async (_, { homeSetting, username, type }, { loggedInUser }) => {
      const user = await client.user.findUnique({ where: { username } })
      if (user.id !== loggedInUser.id) {
        return {
          ok: false,
          error: "수정 권한이 없습니다."
        }
      }
      await client.user.update({
        where: { username },
        data: {
          ...(type === "firstPage" && { firstPage: homeSetting }),
          ...(type === "fontFamily" && { fontFamily: homeSetting })
        }
      })
      return {
        ok: true
      }
    })
  }
}