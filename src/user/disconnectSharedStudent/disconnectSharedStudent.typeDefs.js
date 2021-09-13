import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    disconnectSharedStudent(userId: Int!, studentId: String!): mutationResult!
  }
`