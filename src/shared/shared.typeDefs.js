import { gql } from "apollo-server";

export default gql`
  type mutationResult {
    ok: Boolean!
    token: String
    questionId: Int
    error: String
    info: Int
  }
  type seeFeedResult {
    quiz: [Quiz]
    question: [Question]
    totalNum: Int!
  }
`