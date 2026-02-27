const joi = require("joi");

const { createBodyObjectSchema } = require("../../../utils/validation");

const login = {
  body: createBodyObjectSchema({
    username: joi
      .string()
      .alphanum()
      .trim()
      .min(3)
      .max(20)
      .required()
      .messages({
        "string.base": "Username must be a string.",
        "string.empty": "Username is required.",
        "any.required": "Username is required.",
        "string.alphanum": "Username can only contain letters and numbers.",
        "string.min": "Username must be at least {#limit} characters long.",
        "string.max": "Username must be at most {#limit} characters long.",
      }),

    password: joi.string().trim().min(6).max(16).required().messages({
      "string.base": "Password must be a string.",
      "string.empty": "Password is required.",
      "any.required": "Password is required.",
      "string.min": "Password must be at least {#limit} characters long.",
      "string.max": "Password must be at most {#limit} characters long.",
    }),
  }),
};

module.exports = {
  login,
};
