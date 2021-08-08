import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    followQuiz(quizIds: String!): mutationResult!
  }
`