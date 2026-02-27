const joi = require("joi");

const envVarsSchema = joi.object({
  PORT: joi.number().default(4000),

  ACCESS_TOKEN_SECRET_KEY: joi.string().required().messages({
    "any.required": "❌ ACCESS_TOKEN_SECRET_KEY in .env is completely missing!",
    "string.empty": "❌ ACCESS_TOKEN_SECRET_KEY in .env cannot be empty!",
  }),

  REFRESH_TOKEN_SECRET_KEY: joi.string().required().messages({
    "any.required": "❌ REFRESH_TOKEN_SECRET_KEY is required in .env!",
    "string.empty": "❌ REFRESH_TOKEN_SECRET_KEY cannot be empty!",
  }),

  ACCESS_TOKEN_EXPIRES_IN_MINUTE: joi.string().default(15),

  REFRESH_TOKEN_EXPIRES_IN_DAY: joi.string().default(7),
}).unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env);

if (error) {
  console.error("\n🔴 SERVER STARTUP FAILED: Missing Environment Variables\n");
  console.error(error.message);

  process.exit(1);
}

module.exports = {
  app: {
    port: envVars.PORT || 4000,
    nodeEnv: envVars.NODE_ENV || "production"
  },

  auth: {
    accessTokenSecretKey: envVars.ACCESS_TOKEN_SECRET_KEY,
    refreshTokenSecretKey: envVars.REFRESH_TOKEN_SECRET_KEY,
    accessTokenExpiresInMinute: envVars.ACCESS_TOKEN_EXPIRES_IN_MINUTE,
    refreshTokenExpiresInDay: envVars.REFRESH_TOKEN_EXPIRES_IN_DAY,
  },
};
