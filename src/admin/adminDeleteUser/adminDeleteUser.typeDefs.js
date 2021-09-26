import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    adminDeleteUser(username: String!): mutationResult!
  }
`