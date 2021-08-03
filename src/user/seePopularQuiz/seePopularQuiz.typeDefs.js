import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seePopularQuiz(userId: Int!): [Quiz]!
  }
`