import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editPersonalPage(username: String!, pageString: String!): mutationResult!
  }
`