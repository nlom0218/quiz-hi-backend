import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    toggleLike(type: String!, id: Int!): mutationResult!
    # type: quiz or question
  }
`