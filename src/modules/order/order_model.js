const mongoose = require("mongoose");

const ORDER_STATUSES = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Order item product is required."],
    },
    quantity: {
      type: Number,
      required: [true, "Order item quantity is required."],
      min: [1, "Order item quantity must be at least 1."],
      validate: {
        validator: Number.isInteger,
        message: "Order item quantity must be a whole number.",
      },
    },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Order user is required."],
    },
    items: {
      type: [orderItemSchema],
      required: [true, "Order items are required."],
      validate: {
        validator: (items) => items.length > 0,
        message: "Order must contain at least one item.",
      },
    },
    status: {
      type: String,
      enum: {
        values: ORDER_STATUSES,
        message:
          "Order status `{VALUE}` is invalid. Allowed statuses: pending, processing, shipped, delivered, cancelled.",
      },
      default: "pending",
    },
    totalAmount: {
      type: Number,
      required: [true, "Order total amount is required."],
      min: [0, "Order total amount cannot be negative."],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("Order", orderSchema);
