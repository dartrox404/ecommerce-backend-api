const express = require("express");
const {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} = require("./order_controller");

const { handleGLobalValidation } = require("../../middleware/globalValidate");

const {
  createOrderSchema,
  updateOrderStatusSchema,
  orderIdSchema,
} = require("../../validation/orderValidation");

const router = express.Router();

router.post("/", handleGLobalValidation(createOrderSchema), createOrder);
router.get("/my-orders", getMyOrders);

router
  .route("/:id")
  .get(handleGLobalValidation(orderIdSchema, "params"), getOrderById)
  .patch(
    handleGLobalValidation(orderIdSchema, "params"),
    handleGLobalValidation(updateOrderStatusSchema),
    updateOrderStatus,
  );

module.exports = router;
