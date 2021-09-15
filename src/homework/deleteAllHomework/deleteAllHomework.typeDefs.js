import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteAllHomework(teacherId: Int!): mutationResult!
  }
`