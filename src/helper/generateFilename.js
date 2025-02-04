const { uuid } = require("uuidv4");
exports.genarateFilename = async (originalFilename) => {
  const splitNmae = originalFilename.split(".");
  const extention = splitNmae[splitNmae.length - 1];
  const filename = uuid() + "." + extention;
  return filename;
};
