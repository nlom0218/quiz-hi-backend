import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editTeacherQuizScore(id: Int!, order: Int!): mutationResult!
  }
`