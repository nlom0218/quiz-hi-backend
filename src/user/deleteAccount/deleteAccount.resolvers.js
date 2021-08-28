import client from "../../client";
import { protectedResolver } from "../users.utils";
import bcrypt from "bcrypt"
import { deleteToS3 } from "../../shared/shared";

export default {
  Mutation: {
    deleteAccount: protectedResolver(async (_, { username, password }, { loggedInUser }) => {
      const user = await client.user.findUnique({ where: { username } })
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
      if (user.avatarURL) {
        await deleteToS3(user.avatarURL, "userProfile")
      }
      await client.quiz.deleteMany({
        where: {
          userId: user.id
        }
      })
      await client.question.deleteMany({
        where: {
          userId: user.id
        }
      })
      await client.quizLike.deleteMany({
        where: {
          userId: user.id
        }
      })
      await client.questionLike.deleteMany({
        where: {
          userId: user.id
        }
      })
      await client.user.deleteMany({
        where: {
          teacher: {
            some: {
              id: user.id
            }
          }
        }
      })
      await client.user.delete({
        where: { username }
      })
      return {
        ok: true
      }
    })
  }
}