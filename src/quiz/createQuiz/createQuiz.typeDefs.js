import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createQuiz(questions: String!, title: String!): mutationResult!
  }
`