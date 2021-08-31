import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeFollowQuestion(id: Int!, page: Int!): seeFeedResult!
  }
`