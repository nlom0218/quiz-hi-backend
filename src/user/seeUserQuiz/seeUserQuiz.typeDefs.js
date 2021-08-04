import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeUserPublicQuiz(userId: Int!, page: Int!): [Quiz]
    seeUserPrivateQuiz(userId: Int!, page: Int!): [Quiz]
  }
`