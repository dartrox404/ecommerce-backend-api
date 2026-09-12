const Joi = require("joi");

const categories = [
  "electronics",
  "fashion",
  "home",
  "beauty",
  "sports",
  "books",
  "food",
  "other",
];

const productFields = {
  name: Joi.string().trim().min(2).max(120).messages({
    "string.base": "Product name must be a string.",
    "string.empty": "Product name is required.",
    "string.min": "Product name must be at least 2 characters long.",
    "string.max": "Product name cannot exceed 120 characters.",
  }),

  price: Joi.number().min(0).messages({
    "number.base": "Product price must be a number.",
    "number.min": "Product price cannot be negative.",
  }),

  stock: Joi.number().integer().min(0).messages({
    "number.base": "Product stock must be a number.",
    "number.integer": "Product stock must be a whole number.",
    "number.min": "Product stock cannot be negative.",
  }),

  category: Joi.string()
    .trim()
    .lowercase()
    .valid(...categories)
    .messages({
      "string.base": "Product category must be a string.",
      "string.empty": "Product category is required.",
      "any.only": `Product category must be one of: ${categories.join(", ")}.`,
    }),
};

exports.createProductSchema = Joi.object({
  name: productFields.name.required(),
  price: productFields.price.required(),
  stock: productFields.stock.required(),
  category: productFields.category.required(),
});

exports.updateProductSchema = Joi.object(productFields)
  .min(1)
  .unknown(false)
  .messages({
    "object.min": "Provide at least one product field to update.",
    "object.unknown": "Field `{#label}` is not allowed.",
  });

exports.productIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.base": "Product ID must be a string.",
    "string.hex": "Product ID must be a valid MongoDB ObjectId.",
    "string.length": "Product ID must be a valid MongoDB ObjectId.",
    "any.required": "Product ID is required.",
  }),
});
