import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Query: {
    seeHomework: protectedResolver(async (_, { userId, type }, { loggedInUser }) => {
      let homework = []
      if (type === "teacher") {
        homework = await client.homework.findMany({
          where: { teacherId: userId },
          include: { user: true }
        })
      } else if (type === "student") {
        homework = await client.homework.findMany({
          where: {
            user: {
              some: {
                id: userId
              }
            }
          }
        })
      }
      console.log(homework);
      return homework
    })
  }
}