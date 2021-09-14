import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editStudentQuizScore(num: Int!, studentId: Int!, score: Int!): mutationResult!
  }
`