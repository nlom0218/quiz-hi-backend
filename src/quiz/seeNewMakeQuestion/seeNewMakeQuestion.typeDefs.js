import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeNewMakeQuestion(id: Int!, questionId: String!): [Question]
  }
`