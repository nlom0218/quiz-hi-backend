import client from "../../client";
import { protectedResolver } from "../users.utils";
import bcrypt from "bcrypt"
import { deleteToS3 } from "../../shared/shared";

export default {
  Mutation: {
    deleteAllStudentAccount: protectedResolver(async (_, { username, password }, { loggedInUser }) => {
      const user = await client.user.findUnique({ where: { username }, include: { students: true } })
      if (user.id !== loggedInUser.id) {
        return {
          ok: false,
          error: "탈퇴 권한이 없습니다."
        }
      }
      const passwordOk = await bcrypt.compare(password, user.password)
      if (!passwordOk) {
        return {
          ok: false,
          error: "비밀번호가 틀립니다."
        }
      }
      const student = user.students.filter((item) => item.username.split("_")[0] === user.username)
      for (let i = 0; i < student.length; i++) {
        if (student[i].avatarURL) {
          await deleteToS3(student[i].avatarURL, "userProfile")
        }
        await client.homeworkResult.deleteMany({
          where: {
            user: {
              id: student[i].id
            }
          }
        })
        await client.user.delete({
          where: {
            id: student[i].id
          }
        })
      }
      await client.homework.deleteMany({
        where: {
          teacherId: user.id
        }
      })
      // await client.user.update({
      //   where: {
      //     username
      //   },
      //   data: {
      //     quizScore: JSON.stringify([])
      //   }
      // })
      return {
        ok: true
      }
    })
  }
}