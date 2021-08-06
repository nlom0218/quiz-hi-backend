import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    confirmPassword(password: String!): mutationResult!
  }
`