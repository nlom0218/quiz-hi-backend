import { gql } from "apollo-server-core";

export default gql`
  type Tag {
    id: Int!
    name: String!
    questions: [Question]
    quiz: [Quiz]
    createdAt: String!
    updatedAt: String!
    user: [User]

    totalFollowUser: Int!
    totalQuestions: Int!
    totalQuiz: Int!
    isFollow: Boolean!
  }
`