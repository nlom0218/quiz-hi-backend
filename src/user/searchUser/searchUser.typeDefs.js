import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    searchUser(nickname: String!, page: Int!, type: String!, userId: Int!): seeUserResult!
  }
`