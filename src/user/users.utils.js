import jwt from "jsonwebtoken"
import client from "../client";

export const getUser = async (token) => {
  if (!token) {
    return null
  }
  const { id } = await jwt.verify(token, process.env.SECRET_KEY);
  const user = await client.user.findUnique({ where: { id } })
  if (!user) {
    return null
  } else {
    return user
  }
}

export const protectedResolver = (ourResolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다."
    }
  }
  return ourResolver(root, args, context, info)
}