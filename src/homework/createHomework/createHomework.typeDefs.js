import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createHomework(quizId: Int!, studentId: String!, score: String!): mutationResult!
  }
`