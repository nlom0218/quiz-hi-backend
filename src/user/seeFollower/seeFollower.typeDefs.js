import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeFollower(userId: Int!, page: Int!): [User]!
  }
`