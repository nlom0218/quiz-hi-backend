import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeQuestion(seeType: String!, page: Int!, search: String, sort: String!): [Question]
  }
`