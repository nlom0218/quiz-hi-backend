import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    unfollowAllQuizQuestion(id: Int!): mutationResult!
  }
`