import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    me: protectedResolver((_, __, { loggedInUser }) => {
      return client.user.findUnique({
        where: { id: loggedInUser.id },
        include: {
          tags: true,
          notice: true
        }
      })
    })
  }
}