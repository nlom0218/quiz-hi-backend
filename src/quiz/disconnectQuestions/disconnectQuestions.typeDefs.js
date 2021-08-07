import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    disconnectQuestions(questionsId: String!, quizId: Int!): mutationResult!
  }
`