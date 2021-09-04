import { gql } from "apollo-server-core";

export default gql`
  type Homework {
    id: Int!     
    createdAt: String! 
    updatedAt: String! 
    user: [User]
    quiz: Quiz    
    quizId: Int
    targetScore: Int
    score: String!
    order: Int!
    mode: String!
    teacherId: Int!
    title: String!
  }

  type HomeworkResut {
    id: Int!     
    createdAt: String! 
    updatedAt: String! 
    user: User
    quiz: Quiz
    title: String!
    result: String!
  }
`