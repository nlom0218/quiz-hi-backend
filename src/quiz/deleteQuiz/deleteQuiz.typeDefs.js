import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteQuiz(id: Int!): mutationResult!
  }
`
