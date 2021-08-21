import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteStudentAccount(teacherId: Int!, studentId: Int!): mutationResult!
  }
`