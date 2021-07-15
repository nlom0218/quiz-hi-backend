import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createAccount(type: String!, email: String, username: String!, password: String!): mutationResult!
  }
`