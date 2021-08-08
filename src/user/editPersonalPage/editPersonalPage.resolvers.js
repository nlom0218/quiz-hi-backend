import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    editPersonalPage: protectedResolver(async (_, { username, pageString }, { loggedInUser }) => {
      const user = await client.user.findUnique({ where: { username } })
      if (user.id !== loggedInUser.id) {
        return {
          ok: false,
          error: "수정 권한이 없습니다."
        }
      }

      await client.user.update(({
        where: { username },
        data: {
          ...(pageString === "" ? { personalPage: null } : { personalPage: pageString })
        }
      }))
      return {
        ok: true
      }
    })
  }
}