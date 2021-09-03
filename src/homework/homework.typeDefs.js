import { gql } from "apollo-server-core";

export default gql`
  type Homework {
    id: Int!     
    createdAt: String! 
    updatedAt: String! 
    user: [User]
    quiz: Quiz    
    quizId: Int
    score: String!
    order: Int!
  }
`