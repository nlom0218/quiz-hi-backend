import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    login(username: String!, password: String!, type: String!): mutationResult!
  }
`