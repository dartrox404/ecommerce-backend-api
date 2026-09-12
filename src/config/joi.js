const Joi = require("joi");
require("dotenv").config();

const envSchema = Joi.object({
  PORT: Joi.number().port().default(8080).messages({
    "number.base": "PORT must be a number",
    "number.port": "PORT must be a valid TCP port between 0 and 65535",
  }),
  URL: Joi.string()
    .pattern(/^mongodb(?:\+srv)?:\/\/\S+$/)
    .required()
    .messages({
      "any.required": "URL is required in the environment file",
      "string.empty": "URL cannot be empty",
      "string.base": "URL must be a string",
      "string.pattern.base":
        "URL must be a valid MongoDB connection string, for example mongodb://localhost:27017/ecommerce",
    }),
  JWT_EXPIRE: Joi.string()
    .pattern(/^\d+(s|m|h|d|w|y)$/)
    .default("7d")
    .messages({
      "string.base": "JWT_EXPIRE must be a string",
      "string.empty": "JWT_EXPIRE cannot be empty",
      "string.pattern.base":
        "JWT_EXPIRE must use a valid duration such as 15m, 7d, or 1y",
    }),
  JWT_SECRET: Joi.string().min(32).required().messages({
    "any.required": "JWT_SECRET is required in the environment file",
    "string.empty": "JWT_SECRET cannot be empty",
    "string.base": "JWT_SECRET must be a string",
    "string.min": "JWT_SECRET must contain at least 32 characters for security",
  }),
}).unknown(true);

const { error, value: env } = envSchema.validate(process.env, {
  abortEarly: true,
  convert: true,
  stripUnknown: false,
});

if (error) {
  const messages = error.details
    .map((detail) => `- ${detail.message}`)
    .join("\n");
  console.error(`Environment validation failed:\n${messages}`);
}

module.exports = {
  port: env.PORT,
  mongoUrl: env.URL,
  jwtExpire: env.JWT_EXPIRE,
  jwtSecret: env.JWT_SECRET,
};
