import AWS from "aws-sdk"

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
  }
})

export const uploadToS3 = async (file, loggedInUser, folderName) => {
  const { filename, createReadStream } = await file
  const readStream = createReadStream()
  const objectName = `${folderName}/${loggedInUser.id}-${Date.now()}-${filename}`
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "khd-nomadcoffee-uploads",
      Key: objectName,
      ACL: "public-read",
      Body: readStream
    })
    .promise()
  return Location
}