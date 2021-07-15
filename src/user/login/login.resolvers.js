import client from "../../client";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export default {
  Mutation: {
    login: async (_, { username, password, type }) => {
      try {
        const user = await client.user.findFirst({
          where: {
            AND: [
              { username },
              { type }
            ]
          }
        })
        if (!user) {
          return {
            ok: false,
            error: "사용자를 찾을 수 없습니다."
          }
        }

        const passwordOk = await bcrypt.compare(password, user.password)
        if (!passwordOk) {
          return {
            ok: false,
            error: "비밀번호가 틀립니다."
          }
        }

        const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY)
        return {
          ok: true,
          token
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}