const Validator = require("validatorjs");
exports.validate = (data, rules, messages) => {
  const validation = new Validator(data, rules, messages);
  if (validation.fails()) {
    throw {
      error: {
        code: 400,
        data: {
          "invalid-params": validation.errors.all(),
        },
      },
    };
  }

  return validation.passes();
};
