import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    followQuestion: protectedResolver(async (_, { questionIds }, { loggedInUser }) => {
      const questionArr = questionIds.split(",").map((item) => { return { id: parseInt(item) } })
      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          followQuestion: {
            connect: questionArr
          }
        }
      })
      return {
        ok: true
      }
    })
  }
}