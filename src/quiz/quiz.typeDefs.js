import { gql } from "apollo-server-core";

export default gql`
  type Quiz {
    id: Int!
    user: User!
    title: String!
    questions: [Question]
    createdAt: String!
    updatedAt: String!
  }
  type Question {
    id: Int!
    user: User!
    question: String!
    answer: String!
    type: String!
    image: String
    quiz: [Quiz]
    tags: [Tag]
    createdAt: String!
    updatedAt: String!
  }
  type Tag {
    id: Int!
    name: String!
    questions: [Question]
    createdAt: String!
    updatedAt: String!
  }
`