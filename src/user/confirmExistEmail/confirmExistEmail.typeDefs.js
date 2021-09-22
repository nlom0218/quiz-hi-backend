import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    confirmExistEmail(email: String!): mutationResult!
  }
`