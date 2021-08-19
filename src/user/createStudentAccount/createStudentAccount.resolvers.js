import client from "../../client";
import { protectedResolver } from "../users.utils";
import bcrypt from "bcrypt"

export default {
  Mutation: {
    createStudentAccount: protectedResolver(async (_, { id, password, nickname }, { loggedInUser }) => {
      const teacher = await client.user.findUnique({ where: { id } })
      if (!teacher) {
        return {
          ok: false,
          error: "사용자를 찾을 수 없습니다."
        }
      }
      if (teacher.id !== loggedInUser.id) {
        return {
          ok: false,
          error: "학생 계정 생성 권한이 없습니다."
        }
      }
      const nicknameArr = nickname.split(",")
      for (let i = 0; i < nicknameArr.length; i++) {
        await client.user.create({
          data: {
            username: `${teacher.username}_s${i + 1}`,
            nickname: nicknameArr[i],
            type: "student",
            password: await bcrypt.hash(`${password}^^${i + 1}`, 10),
            teacher: {
              connect: { id: teacher.id }
            }
          }
        })
      }

      return {
        ok: true
      }
    })
  }
}