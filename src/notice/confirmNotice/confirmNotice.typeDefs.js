import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    confirmNotice(noticeId: Int!, userId: Int!): mutationResult!
  }
`