import { gql } from "apollo-server-core";

export default gql`
  type Quiz {
    id: Int!
    user: User!
    title: String!
    state: String!
    caption: String
    questions: [Question]
    tags: [Tag]
    createdAt: String!
    updatedAt: String!
    hits: Int!
    quizLike: [QuizLike]
    likes: Int!

    questionNum: Int!
    isLiked: Boolean!
  }

  type Question {
    id: Int!
    user: User!
    question: String!
    answer: String!
    type: String!
    image: String
    state: String!
    quiz: [Quiz]
    tags: [Tag]
    createdAt: String!
    updatedAt: String!
    hits: Int!
    questionLike: [QuestionLike]
    likes: Int!

    isLiked: Boolean!
  }
  type Tag {
    id: Int!
    name: String!
    questions: [Question]
    quiz: [Quiz]
    createdAt: String!
    updatedAt: String!
  }
`