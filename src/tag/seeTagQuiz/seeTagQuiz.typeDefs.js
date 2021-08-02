import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeTagQuiz(type: String!, id: Int!, page: Int!): [Quiz]!
  }
`