
import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seePopularQuestion(userId: Int!): [Question]!
  }
`