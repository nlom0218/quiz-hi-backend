import { gql } from "apollo-server-core";

export default gql`
  type Query {
    adminSeeUser(type: String!, page: Int!): seeUserResult
  }
`