import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    sendSuggestion: protectedResolver(async (_, { suggestion, sender }) => {
      await client.suggestions.create({
        data: {
          suggestion,
          sender
        }
      })
      return {
        ok: true
      }
    })
  }
}