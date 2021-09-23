import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeFollowing(userId: Int!, page: Int!): [User]!
  }
`