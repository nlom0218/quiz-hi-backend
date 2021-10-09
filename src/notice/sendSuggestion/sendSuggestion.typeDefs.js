import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    sendSuggestion(suggestion: String!, sender: String!): mutationResult!
  }
`