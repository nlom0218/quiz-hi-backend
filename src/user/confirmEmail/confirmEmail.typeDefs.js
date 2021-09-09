import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    confirmEmail(email: String!): mutationResult!
  }
`