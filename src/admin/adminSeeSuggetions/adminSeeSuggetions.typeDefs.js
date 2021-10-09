import { gql } from "apollo-server-core";

export default gql`
 type Query {
  adminSeeSuggetions(page: Int!): seeSuggestionResult
 }
`