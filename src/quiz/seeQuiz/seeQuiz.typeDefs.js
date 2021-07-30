import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeQuiz(seeType: String!, page: Int!): [Quiz]
  }
`