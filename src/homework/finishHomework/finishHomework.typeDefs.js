import { gql } from "apollo-server-core"

export default gql`
  type Mutation {
    finishHomework(homeworkId: Int!): mutationResult
  }
`