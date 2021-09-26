import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    adminChangeUserPassword(username: String!, password: String!): mutationResult!
  }
`