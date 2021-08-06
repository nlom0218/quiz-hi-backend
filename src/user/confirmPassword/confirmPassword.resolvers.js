import client from "../../client";
import { protectedResolver } from "../users.utils";
import bcrypt from "bcrypt"

export default {
  Mutation: {
    confirmPassword: protectedResolver(async (_, { password }, { loggedInUser }) => {
      const user = await client.user.findUnique({ where: { id: loggedInUser.id } })
      if (!user) {
        return {
          ok: false,
          error: "로그인이 필요합니다."
        }
      }
      const passwordOk = await bcrypt.compare(password, user.password)
      if (!passwordOk) {
        return {
          ok: false,
          error: "비밀번호가 틀립니다."
        }
      } else {
        return {
          ok: true
        }
      }
    })
  }
}