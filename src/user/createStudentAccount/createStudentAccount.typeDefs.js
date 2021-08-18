import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createStudentAccount(id: Int!, nickname: String!, password: String!): mutationResult!
  }
`