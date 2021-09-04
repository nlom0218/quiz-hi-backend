import { gql } from "apollo-server-core";

export default gql`
  type Quiz {
    id: Int!
    user: User!
    title: String!
    state: String!
    caption: String
    order: String
    updateInfo: String
    questions: [Question]
    tags: [Tag]
    createdAt: String!
    updatedAt: String!
    hits: Int!
    quizLike: [QuizLike]
    likes: Int!
    followUser: [User]
    homework: [Homework]
    homeworkResut: [HomeworkResut]

    questionNum: Int!
    isLiked: Boolean!
  }

  type Question {
    id: Int!
    user: User!
    question: String!
    distractor: String
    answer: String!
    hint: String
    type: String!
    image: String
    state: String!
    updateInfo: String
    quiz: [Quiz]
    tags: [Tag]
    createdAt: String!
    updatedAt: String!
    hits: Int!
    questionLike: [QuestionLike]
    likes: Int!
    followUser: [User]

    isLiked: Boolean!
  }
`