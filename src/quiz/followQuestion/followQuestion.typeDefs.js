import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    followQuestion(questionIds: String!): mutationResult!
  }
`