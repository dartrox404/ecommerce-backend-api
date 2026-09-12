const Joi = require("joi");

const orderStatuses = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const objectId = Joi.string().hex().length(24).messages({
  "string.base": "ID must be a string.",
  "string.hex": "ID must be a valid MongoDB ObjectId.",
  "string.length": "ID must be a valid MongoDB ObjectId.",
});

exports.createOrderSchema = Joi.object({
  items: Joi.array()
    .min(1)
    .items(
      Joi.object({
        product: objectId.required().messages({
          "any.required": "Order item product ID is required.",
        }),
        quantity: Joi.number().integer().min(1).required().messages({
          "number.base": "Order item quantity must be a number.",
          "number.integer": "Order item quantity must be a whole number.",
          "number.min": "Order item quantity must be at least 1.",
          "any.required": "Order item quantity is required.",
        }),
      }),
    )
    .required()
    .messages({
      "array.base": "Order items must be an array.",
      "array.min": "Order must contain at least one item.",
      "any.required": "Order items are required.",
    }),
  totalAmount: Joi.number().min(0).required().messages({
    "number.base": "Order total amount must be a number.",
    "number.min": "Order total amount cannot be negative.",
    "any.required": "Order total amount is required.",
  }),
});

exports.updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...orderStatuses)
    .required()
    .messages({
      "string.base": "Order status must be a string.",
      "any.only": `Order status must be one of: ${orderStatuses.join(", ")}.`,
      "any.required": "Order status is required.",
    }),
});

exports.orderIdSchema = Joi.object({
  id: objectId.required().messages({
    "any.required": "Order ID is required.",
  }),
});
