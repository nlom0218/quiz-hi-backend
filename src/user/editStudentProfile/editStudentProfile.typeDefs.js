import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editStudentProfile(teacherId: Int!, studentId: Int!, nickname: String, password: String): mutationResult!
  }
`