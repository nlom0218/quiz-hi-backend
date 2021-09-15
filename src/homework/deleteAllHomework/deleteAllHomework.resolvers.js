import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    deleteAllHomework: protectedResolver(async (_, { teacherId }) => {
      await client.homework.deleteMany({
        where: {
          teacherId
        }
      })
      return {
        ok: true
      }
    })
  }
}