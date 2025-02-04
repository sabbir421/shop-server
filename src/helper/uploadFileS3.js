const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { variables } = require("../config/variables");
const s3Client = new S3Client({
  region: variables.s3Configs.awsRegion,
  credentials: {
    accessKeyId: variables.s3Configs.awsAccessKey,
    secretAccessKey: variables.s3Configs.awsSecretKey,
  },
});

const uploadFile = async (buffer, name, mimeType) => {
  console.log("---------------------------");

  try {
    const params = {
      Bucket: variables.s3Configs.s3BucketName,
      Key: name,
      Body: buffer,
      ContentType: mimeType,
      ACL: "public-read",
    };
    console.log("------------params----------", params);

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  uploadFile,
};
