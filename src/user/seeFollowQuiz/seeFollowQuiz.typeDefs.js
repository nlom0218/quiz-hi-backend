import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeFollowQuiz(id: Int!, page: Int!): [Quiz]
  }
`