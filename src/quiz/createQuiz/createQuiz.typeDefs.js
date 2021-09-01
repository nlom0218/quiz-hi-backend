import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createQuiz(
      questions: String!,
      title: String!, 
      tags: String, 
      state: String!,
      caption: String,
      order: String
    ): mutationResult!
  }
`