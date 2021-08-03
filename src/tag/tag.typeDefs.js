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

    totalFollowUsers: Int!
    totalQuestions: Int!
    totalQuizzes: Int!
    isFollow: Boolean!
  }
`