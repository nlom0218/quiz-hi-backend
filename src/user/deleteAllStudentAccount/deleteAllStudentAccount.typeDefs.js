import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteAllStudentAccount(username: String!, password: String!): mutationResult!
  }
`