import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    unfollowQuiz(quizIds: String!): mutationResult!
  }
`