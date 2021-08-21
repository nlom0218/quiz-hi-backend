import client from "../../client";
import { protectedResolver } from "../users.utils";
import bcrypt from "bcrypt"

export default {
  Mutation: {
    createStudentAccount: protectedResolver(async (_, { id, password, nickname, username }, { loggedInUser }) => {
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

      const existTeacherUsername = await client.user.findUnique({
        where: { username }
      })
      if (existTeacherUsername) {
        return {
          ok: false,
          error: `사용할 수 없는 아이디입니다.`
        }
      }
      const existUsername = await client.user.findUnique({
        where: { username: `${username}_s1` }
      })
      if (existUsername) {
        return {
          ok: false,
          error: `${username}_s(학생번호)의 아이디가 존재합니다.`
        }
      }

      const nicknameArr = nickname.split(",")
      for (let i = 0; i < nicknameArr.length; i++) {
        await client.user.create({
          data: {
            ...(username
              ? { username: `${username}_s${i + 1}` }
              : { username: `${teacher.username}_s${i + 1}` }
            ),
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