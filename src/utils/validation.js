const joi = require("joi");

const createBodyObjectSchema = (fields) => {
  return joi.object(fields).required().unknown(false).messages({
    "object.base": "Request body must be an object",
    "any.required": "Request body is required",
  });
};

module.exports = {
    createBodyObjectSchema,
}
