import { gql } from "apollo-server-core";

export default gql`
 type Mutation {
  adminSetDeleteDay(contentId: Int!, type: String!, deleteDay: String!): mutationResult
 }
`