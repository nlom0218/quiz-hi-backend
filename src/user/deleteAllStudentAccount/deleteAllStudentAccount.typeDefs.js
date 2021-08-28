
import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteAccount(username: String!, password: String!): mutationResult!
  }
`