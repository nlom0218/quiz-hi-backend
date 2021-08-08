import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    username: String!
    nickname: String
    email: String
    avatarURL: String
    type: String!
    personalPage: String
    createdAt: String!
    updatedAt: String!
    caption: String
    tags: [Tag]
    quiz: [Quiz]
    question: [Question]

    score: Int!
    isMe: Boolean!
    isFollow: Boolean!
    totalFollow: Int!
    totalFollowing: Int!
    totalPublicQuiz: Int!
    totalPublicQuestion: Int!
    totalPrivateQuiz: Int!
    totalPrivateQuestion: Int!
    totalFollowTags: Int!
  }
`