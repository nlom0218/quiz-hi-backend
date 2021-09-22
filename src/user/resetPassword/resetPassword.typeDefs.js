import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    resetPassword(
      email: String!,
      newPassword: String!, 
      newPasswordConfirm: String!
      ): mutationResult!
  }
`