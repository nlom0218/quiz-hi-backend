import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    updateAccount: protectedResolver(async (_, { email, userId }) => {
      await client.user.update({
        where: { id: userId },
        data: {
          type: "teacher",
          email
        }
      })
      return {
        ok: true
      }
    })
  }
}