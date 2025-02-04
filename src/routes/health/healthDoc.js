const { swaggerResponse } = require("../../utils/swaggerResponse");

const healthDoc = {
  get: {
    tags: ["Health"],
    summary: "health check",
    description: "",
    parameters: [],
    responses: swaggerResponse,
  },
};

module.exports = {
  healthDoc,
};
