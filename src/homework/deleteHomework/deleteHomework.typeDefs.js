import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteHomework(homeworkId: Int!): mutationResult!
  }
`