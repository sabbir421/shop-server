const errorResponseHandler = require("./errorResponseHandler");

const restrictTo =
  (...role) =>
  async (req, res, next) => {
    try {
      if (!role.includes(req.headers.role)) {
        throw {
          status: 403,
          message: "Forbidden access",
        };
      }
      await next();
    } catch (error) {
      errorResponseHandler(res, error);
    }
  };

module.exports = restrictTo;
