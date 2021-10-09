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
    question: Question!
    message: String!
    sender: String!
    receiver: String!
  }

  type Suggestions {
    id Int!
    createdAt: String!
    updatedAt: String!
    suggestion: String!
    sender: String!
    # sender는 유저의 아이디, 즉 username으로 한다.
  }
`