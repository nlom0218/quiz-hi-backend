import { gql } from "apollo-server-core";

export default gql`
  type Query {
    detailQuiz(id: Int!): Quiz
  }
`