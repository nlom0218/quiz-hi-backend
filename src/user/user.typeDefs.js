import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    username: String!
    nickname: String
    email: String
    avatarURL: String
    type: String!
    createdAt: String!
    updatedAt: String!

    score: Int!
    isMe: Boolean!
  }
`