import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeUserPublicQuestion(userId: Int!, page: Int!): [Question]
    seeUserPrivateQuestion(userId: Int!, page: Int!): [Question]
  }
`