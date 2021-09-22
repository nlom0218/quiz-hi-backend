import { gql } from "apollo-server-core";

export default gql`
  type Query {
    findUsername(email: String!): User!
  }
`