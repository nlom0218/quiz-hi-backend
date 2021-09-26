import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    adminChangeUserType(username: String!, email: String!): mutationResult!
  }
`