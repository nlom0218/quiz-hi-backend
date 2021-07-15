import { gql } from "apollo-server";

export default gql`
  type mutationResult {
    ok: Boolean!
    token: String
    error: String
    info: Int
  }
`