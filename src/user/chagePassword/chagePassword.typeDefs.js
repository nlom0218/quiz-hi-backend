import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    chagePassword(
      username: String!,
      oldPassword: String!, 
      newPassword: String!, 
      newPasswordConfirm: String!
      ): mutationResult!
  }
`