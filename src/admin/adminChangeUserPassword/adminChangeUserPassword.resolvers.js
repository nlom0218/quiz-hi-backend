import client from "../../client"
import bcrypt from "bcrypt"

export default {
  Mutation: {
    adminChangeUserPassword: async (_, { username, password }) => {
      const num = password.search(/[0-9]/g)
      const spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)
      if (password.length < 7 || password.length > 17) {
        return {
          ok: false,
          error: "비밀번호는 8자리 이상 16자리 이하만 가능합니다."
        }
      }
      if (password.match(/[^a-zA-Z0-9`~!@@#$%^&*|₩₩₩'₩";:₩/?]/) !== null) {
        return {
          ok: false,
          error: "비밀번호는 숫자와 영문 또는 특수문자만 입력할 수 있습니다."
        }
      }
      if (num < 0) {
        return {
          ok: false,
          error: "비밀번호는 숫자 1자 이상을 포함해야 합니다."
        }
      }
      if (spe < 1) {
        return {
          ok: false,
          error: "비밀번호는 특수문자 2자 이상을 포함해야 합니다."
        }
      }
      const uglyPassword = await bcrypt.hash(password, 10)
      await client.user.update({
        where: { username },
        data: {
          password: uglyPassword
        }
      })
      return {
        ok: true
      }
    }
  }
}