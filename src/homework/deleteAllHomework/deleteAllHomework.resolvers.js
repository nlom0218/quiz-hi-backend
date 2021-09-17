import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    deleteAllHomework: protectedResolver(async (_, { teacherId }) => {
      const homework = await client.homework.findMany({
        where: {
          teacherId
        }
      })
      for (let i = 0; i < homework.length; i++) {
        await client.homeworkResult.deleteMany({
          where: {
            homeworkId: homework[i].id
          }
        })
      }
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