import { gql } from "apollo-server-core";

export default gql`
  type Query {
    adminSeeQuizComplain(page: Int!): seeFeedResult
  }
`