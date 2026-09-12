const mongoose = require("mongoose");

const PRODUCT_CATEGORIES = [
  "electronics",
  "fashion",
  "home",
  "beauty",
  "sports",
  "books",
  "food",
  "other",
];

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required."],
      trim: true,
      minlength: [2, "Product name must be at least 2 characters long."],
      maxlength: [120, "Product name cannot exceed 120 characters."],
    },

    price: {
      type: Number,
      required: [true, "Product price is required."],
      min: [0, "Product price cannot be negative."],
    },

    stock: {
      type: Number,
      required: [true, "Product stock is required."],
      min: [0, "Product stock cannot be negative."],
      validate: {
        validator: Number.isInteger,
        message: "Product stock must be a whole number.",
      },
    },

    category: {
      type: String,
      required: [true, "Product category is required."],
      trim: true,
      lowercase: true,
      enum: {
        values: PRODUCT_CATEGORIES,
        message:
          "Category `{VALUE}` is invalid. Allowed categories: electronics, fashion, home, beauty, sports, books, food, other.",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("Product", productSchema);
