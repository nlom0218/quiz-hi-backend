import { gql } from "apollo-server-core";

export default gql`
  scalar Upload
  type Mutation {
    createQuestion(
      question: String!,
      answer: String!,
      type: String!, 
      image: Upload,
      tags: String
    ): mutationResult!
  }
`