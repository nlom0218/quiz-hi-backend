import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    deleteStudentAccount: protectedResolver(async (_, { teacherId, studentId }, { loggedInUser }) => {
      const teacher = await client.user.findUnique({ where: { id: teacherId } })
      const student = await client.user.findUnique({
        where: { id: studentId },
        include: { teacher: true }
      })
      if (teacher.id !== student.teacher[0].id) {
        return {
          ok: false,
          error: "해당 학생의 프로필 수정 권한이 없습니다."
        }
      }

      await client.user.delete({
        where: { id: studentId }
      })

      return {
        ok: true
      }
    })
  }
}