import AWS, { S3 } from "aws-sdk"

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
  region: "ap-northeast-2"
})

export const uploadToS3 = async (file, loggedInUser, folderName) => {
  const { filename, createReadStream } = await file
  const readStream = createReadStream()
  const objectName = `${folderName}/${loggedInUser.id}-${Date.now()}-${filename}`
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "quizhi-uploads",
      Key: objectName,
      ACL: "public-read",
      Body: readStream
    })
    .promise()
  return Location
}

export const deleteToS3 = async (existImage, folderName) => {
  const url = existImage.split('/')
  const delImageName = url[url.length - 1]
  const params = {
    Bucket: `quizhi-uploads/${folderName}`,
    Key: delImageName
  }
  await new AWS.S3()
    .deleteObject(params, (err, data) => {
      if (err) {
        console.log('aws delete error')
        console.log(err, err.stack)
      } else {
        console.log('aws video delete success' + data)
      }
    })
    .promise()
}