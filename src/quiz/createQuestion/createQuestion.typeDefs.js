import { gql } from "apollo-server-core";

export default gql`
  scalar Upload
  type Mutation {
    createQuestion(
      question: String!,
      answer: String!,
      type: String!,
      state: String!
      hint: String,
      image: Upload,
      tags: String,
      distractor: String,

      # for updata quiz
      updata: Boolean
      quizId: Int
    ): mutationResult!
  }
`