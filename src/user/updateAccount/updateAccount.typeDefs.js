import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    updateAccount(email: String!, userId: Int!): mutationResult
  }
`