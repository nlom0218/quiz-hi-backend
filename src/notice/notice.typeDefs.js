import { gql } from "apollo-server-core";

export default gql`
  type Notice {
    id: Int!   
    createdAt: String!
    updatedAt: String!
    user: User
    userId: Int!
    type: String!
    message: String!
    info: String!
    sender: String!
    confirm: Boolean!
  }

  type QuizComplain {
    id: Int!   
    createdAt: String!
    updatedAt: String!
    quiz: Quiz!
    message: String!
    sender: String!
    receiver: String!
  }
  
  type QuestionComplain {
    id: Int!   
    createdAt: String!
    updatedAt: String!
    questions: Question!
    message: String!
    sender: String!
    receiver: String!
  }
`