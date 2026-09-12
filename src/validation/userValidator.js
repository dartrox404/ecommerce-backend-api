const Joi = require("joi");

const passwordSchema = Joi.string()
  .min(8)
  .max(128)
  .pattern(/[a-z]/)
  .pattern(/[A-Z]/)
  .pattern(/[0-9]/)
  .required()
  .messages({
    "string.base": "Password must be a string.",
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 8 characters long.",
    "string.max": "Password cannot exceed 128 characters.",
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    "any.required": "Password is required.",
  });

const emailSchema = Joi.string()
  .trim()
  .lowercase()
  .email()
  .required()
  .messages({
    "string.base": "Email must be a string.",
    "string.empty": "Email is required.",
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required.",
  });

exports.registerUserSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
  role: Joi.string().valid("user", "admin").default("user").messages({
    "string.base": "Role must be a string.",
    "any.only": "Role must be either user or admin.",
  }),
})
  

exports.loginUserSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
})
  

exports.userIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.base": "User ID must be a string.",
    "string.hex": "User ID must be a valid MongoDB ObjectId.",
    "string.length": "User ID must be a valid MongoDB ObjectId.",
    "any.required": "User ID is required.",
  }),
});
