import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    deleteHomework: protectedResolver(async (_, { homeworkId }, { loggedInUser }) => {
      const teacher = await client.user.findUnique({ where: { id: loggedInUser.id } })
      const homework = await client.homework.findUnique({ where: { id: homeworkId } })
      if (teacher.id !== homework.teacherId) {
        return {
          ok: false,
          error: "숙제 삭제 권한이 없습니다."
        }
      }

      await client.homework.delete({
        where: {
          id: homeworkId
        }
      })
      return {
        ok: true
      }
    })
  }
}