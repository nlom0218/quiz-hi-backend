import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    adminSearchUser(username: String!): User
  }
`