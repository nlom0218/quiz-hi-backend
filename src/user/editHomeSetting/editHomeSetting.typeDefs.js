import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editHomeSetting(homeSetting: String! username: String! type: String!): mutationResult!
  }
`