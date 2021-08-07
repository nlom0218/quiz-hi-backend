import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editProfile(username: String!, nickname: String!, caption: String!, avatarURL: Upload, delImg: Boolean!): mutationResult!
  }
`