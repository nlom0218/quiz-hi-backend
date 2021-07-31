import { gql } from "apollo-server-core";

export default gql`
  type QuizLike {
    id: Int!
    quiz: Quiz!
    User: User!
    createdAt: String!
    updatedAt: String!
  }
`