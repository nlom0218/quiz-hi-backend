import { gql } from "apollo-server-core";

export default gql`
  type Query {
    adminSeeContentDetail(contentId: Int!, type: String!): Question
  }
`