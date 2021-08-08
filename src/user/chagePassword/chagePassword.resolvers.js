import client from "../../client";
import { protectedResolver } from "../users.utils";
import bcrypt from "bcrypt"

export default {
  Mutation: {
    chagePassword: protectedResolver(
      async (_, { username, oldPassword, newPassword, newPasswordConfirm }, { loggedInUser }) => {
        const user = await client.user.findUnique({ where: { username } })
        if (user.id !== loggedInUser.id) {
          return {
            ok: false,
            error: "수정 권한이 없습니다."
          }
        }
        const passwordOk = await bcrypt.compare(oldPassword, user.password)
        if (!passwordOk) {
          return {
            ok: false,
            error: "비밀번호가 틀립니다."
          }
        }

        const num = newPassword.search(/[0-9]/g)
        const spe = newPassword.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)
        if (newPassword.length < 7 || newPassword.length > 17) {
          return {
            ok: false,
            error: "비밀번호는 8자리 이상 16자리 이하만 가능합니다."
          }
        }
        if (newPassword.match(/[^a-zA-Z0-9`~!@@#$%^&*|₩₩₩'₩";:₩/?]/) !== null) {
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

        if (newPassword !== newPasswordConfirm) {
          return {
            ok: false,
            error: "비밀번호가 서로 일치하지 않습니다."
          }
        }

        const uglyPassword = await bcrypt.hash(newPassword, 10)

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
    )
  }
}