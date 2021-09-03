import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeHomework(userId: Int!, type: String!): [Homework]
  }
`