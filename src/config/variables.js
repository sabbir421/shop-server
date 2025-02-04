require("dotenv").config();
const port = process.env.PORT;
const jwtSecret = process.env.JWT_SECRET_KEY;
const refreshTokenSecrat = process.env.JWT_REFRESH_SECRET;
const s3Configs = {
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecretKey: process.env.AWS_SECRET_KEY,
  awsEndPoint: process.env.AWS_ENDPOINT,
  s3BucketName: process.env.S3_BUCKET_NAME,
  awsRegion: process.env.AWS_REGION,
};

const dbConfig = {
  dbUserName: process.env.DB_USER_NAME,
  dbPass: process.env.DB_PASS||null,
  dbDatabase: process.env.DB_DATABASE,
  dbHost: process.env.DB_HOST,
};
exports.variables = {
  port,
  jwtSecret,
  refreshTokenSecrat,
  s3Configs,
  dbConfig,
};
