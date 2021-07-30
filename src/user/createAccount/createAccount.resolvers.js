import client from "../../client";
import bcrypt from "bcrypt"

export default {
  Mutation: {
    createAccount: async (_, { type, email, username, password, passwordConfirm }) => {
      try {
        const existingUser = await client.user.findUnique({
          where: { username }
        })
        if (existingUser) {
          return {
            ok: false,
            error: "아이디가 이미 존재합니다."
          }
        }

        // 비밀번호 유효성 검사 => 프론트엔드에서???
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

        if (password !== passwordConfirm) {
          return {
            ok: false,
            error: "비밀번호가 서로 일치하지 않습니다."
          }
        }
        const uglyPassword = await bcrypt.hash(password, 10)
        const nickname = "user" + Math.floor(Date.now() / 1000)
        await client.user.create({
          data: {
            username,
            type,
            nickname,
            password: uglyPassword,
            ...(email && { email })
          }
        })
        return {
          ok: true
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}