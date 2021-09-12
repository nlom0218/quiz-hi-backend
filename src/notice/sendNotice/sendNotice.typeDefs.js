import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    sendNotice(info: String!, type: String!, receiverEmail: String): mutationResult!
  }
`