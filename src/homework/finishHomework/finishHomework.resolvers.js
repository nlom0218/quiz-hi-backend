import client from "../../client";
import { protectedResolver } from "../../user/users.utils";

export default {
  Mutation: {
    finishHomework: protectedResolver(async (_, { homeworkId }, { loggedInUser }) => {
      const teacher = await client.user.findUnique({ where: { id: loggedInUser.id } })
      const homework = await client.homework.findUnique({ where: { id: homeworkId } })
      if (teacher.id !== homework.teacherId) {
        return {
          ok: false,
          error: "숙제 삭제 권한이 없습니다."
        }
      }
      await client.homework.update({
        where: { id: homeworkId },
        data: {
          finish: true
        }
      })
      return {
        ok: true
      }
    })
  }
}