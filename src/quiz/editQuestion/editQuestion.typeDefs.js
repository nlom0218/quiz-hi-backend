import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editQuestion(
      id: Int!,
      question: String, 
      answer: String,
      hint: String,
      distractor: String,
      image: Upload, 
      tags: String!, 
      updateInfo: String
    ): mutationResult!
  }
`