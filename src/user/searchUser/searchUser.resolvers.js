import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    searchUser: async (_, { userId, nickname, type, page }) => {
      if (type === "follower") {
        const user = await client.user.findMany({
          where: {
            AND: [
              { nickname: { contains: nickname } },
              { following: { some: { id: userId } } }
            ]
          },
          take: 10,
          skip: page * 10 - 10,
          orderBy: { nickname: "asc" }
        })
        const totalNum = await client.user.count({
          where: {
            AND: [
              { nickname: { contains: nickname } },
              { following: { some: { id: userId } } }
            ]
          }
        })
        return {
          user,
          totalNum
        }
      }
      if (type === "following") {
        const user = await client.user.findMany({
          where: {
            AND: [
              { nickname: { contains: nickname } },
              { followers: { some: { id: userId } } }
            ]
          },
          take: 10,
          skip: page * 10 - 10,
          orderBy: { nickname: "asc" }
        })
        const totalNum = await client.user.count({
          where: {
            AND: [
              { nickname: { contains: nickname } },
              { followers: { some: { id: userId } } }
            ]
          }
        })
        return {
          user,
          totalNum
        }
      }
      if (type === "all") {
        const user = await client.user.findMany({
          where: {
            nickname: { contains: nickname }
          },
          take: 10,
          skip: page * 10 - 10,
          orderBy: { nickname: "asc" }
        })
        const totalNum = await client.user.count({
          where: {
            nickname: { contains: nickname }
          }
        })
        return {
          user,
          totalNum
        }
      }
    }
  }
}