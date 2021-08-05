import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editQuiz(id: Int!, title: String, caption: String, tags: String!, updateInfo: String): mutationResult!
  }
`