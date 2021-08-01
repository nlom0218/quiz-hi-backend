import { gql } from "apollo-server-core";

export default gql`
  type QuizLike {
    id: Int!
    quiz: Quiz!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
  type QuestionLike {
    id: Int!
    quiz: Quiz!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
`