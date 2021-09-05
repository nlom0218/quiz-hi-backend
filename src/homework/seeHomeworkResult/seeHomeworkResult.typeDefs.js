import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeHomeworkResult(userId: Int!, quizId: Int!): HomeworkResult
  }
`