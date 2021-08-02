import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeTagQuestion(type: String!, id: Int!, page: Int!): [Question]!
  }
`