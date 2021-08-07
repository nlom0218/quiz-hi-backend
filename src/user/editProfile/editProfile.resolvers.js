import client from "../../client";
import { deleteToS3, uploadToS3 } from "../../shared/shared";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(async (_, { id, nickname, caption, avatarURL, delImg }, { loggedInUser }) => {
      const user = await client.user.findUnique({ where: { id } })
      if (user.id !== loggedInUser.id) {
        return {
          ok: false,
          error: "수정 권한이 없습니다."
        }
      }

      let newAvatarURL = ""
      if (avatarURL) {
        if (user.avatarURL) {
          await deleteToS3(user.avatarURL, "userProfile")
        }
        newAvatarURL = await uploadToS3(avatarURL, loggedInUser, "userProfile")
      }

      if (delImg) {
        await deleteToS3(user.avatarURL, "userProfile")
      }


      await client.user.update({
        where: { id },
        data: {
          nickname,
          caption,
          ...(avatarURL && { avatarURL: newAvatarURL }),
          ...(delImg && { avatarURL: null })
        }
      })
      return {
        ok: true
      }
    })
  }
}