import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    connectSharedStudent: protectedResolver(async (_, { userId, studentId }, { loggedInUser }) => {
      const studentIdArr = JSON.parse(studentId).map((item) => {
        return { id: item }
      })
      await client.user.update({
        where: { id: userId },
        data: {
          students: {
            connect: studentIdArr
          }
        }
      })
      return {
        ok: true
      }
    })
  }
}