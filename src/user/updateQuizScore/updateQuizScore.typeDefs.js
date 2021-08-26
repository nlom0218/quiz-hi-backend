import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    updateQuizScore(result: String! teacherId: Int! quizTitle: String! quizId: Int!): mutationResult!
  }
`