const express = require("express");
const {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} = require("./product_controller");

const { handleGLobalValidation } = require("../../middleware/globalValidate");
const { protect } = require("../../middleware/handleAuth");

const {
  createProductSchema,
  updateProductSchema,
  productIdSchema,
} = require("../../validation/productValidator");

const router = express.Router();
app.use(protect);

router
  .route("/")
  .post(handleGLobalValidation(createProductSchema), createProduct)
  .get(getProducts);

router
  .route("/:id")
  .get(handleGLobalValidation(productIdSchema, "params"), getProductById)
  .patch(
    handleGLobalValidation(productIdSchema, "params"),
    handleGLobalValidation(updateProductSchema),
    updateProduct,
  )
  .delete(handleGLobalValidation(productIdSchema, "params"), deleteProduct);

module.exports = router;
