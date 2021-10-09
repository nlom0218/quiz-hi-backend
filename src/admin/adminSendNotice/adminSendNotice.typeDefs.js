import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    adminSendNotice(info: String!, type: String!, username: String, sugId: Int!): mutationResult!
  }
`