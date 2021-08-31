import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    unfollowQuestion(questionIds: String!): mutationResult!
  }
`