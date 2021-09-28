import { gql } from "apollo-server";

export default gql`
  type mutationResult {
    ok: Boolean!
    token: String
    questionId: Int
    error: String
    info: Int
    msg: String
  }
  type seeFeedResult {
    quiz: [Quiz]
    question: [Question]
    totalNum: Int!
  }
  type seeUserResult {
    user: [User]
    totalNum: Int!
  }
  type seeComplainResult {
    quizComplain: [QuizComplain]
    questionComplain: [QuestionComplain]
    totalNum: Int!
  }
`