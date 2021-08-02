import client from "../../client";

export default {
  Query: {
    seeTag: async (_, { id }) => await client.tag.findUnique({ where: { id } })
  }
}