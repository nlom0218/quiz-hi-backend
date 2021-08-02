import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    toggleFollowTag(id: Int!): mutationResult!
  }
`