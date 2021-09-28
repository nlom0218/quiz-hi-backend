import { gql } from "apollo-server-core";

export default gql`
  type Query {
    adminSeeQuestionComplain(page: Int!): seeComplainResult
  }
`