import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createHomeworkResult(quizId: Int!, result: String!, order: Int!, score: Int!, quizTitle: String!, teacherId: Int!, homeworkId: Int!): mutationResult!
  }
`