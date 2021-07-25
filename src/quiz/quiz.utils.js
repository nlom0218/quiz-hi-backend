export const processTags = (tags) => {
  return tags.split(",").map((item) => {
    return {
      create: { name: item },
      where: { name: item }
    }
  })
}