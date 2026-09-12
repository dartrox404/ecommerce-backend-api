const AppError = require("../../utils/AppError");
const { catchAsync } = require("../../utils/CatchAsync");
const orderRepository = require("./order_repo");

exports.createOrder = catchAsync(async (req, res) => {
  const order = await orderRepository.createOrder({
    user: req.user.id,
    items: req.body.items,
    totalAmount: req.body.totalAmount,
  });

  res.status(201).json({
    status: "success",
    message: "Order created successfully.",
    data: order,
  });
});

exports.getMyOrders = catchAsync(async (req, res) => {
  const orders = await orderRepository.getOrdersByUserId(req.user.id);

  res.status(200).json({
    status: "success",
    results: orders.length,
    message: "Orders retrieved successfully.",
    data: orders,
  });
});

exports.getOrderById = catchAsync(async (req, res, next) => {
  const order = await orderRepository.getOrderById(req.params.id);

  if (!order) {
    return next(new AppError("Order not found.", 404));
  }

  const isOwner = order.user.toString() === req.user.id;
  const isAdmin = req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    return next(new AppError("You are not allowed to access this order.", 403));
  }

  res.status(200).json({
    status: "success",
    message: "Order retrieved successfully.",
    data: order,
  });
});

exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new AppError("Only administrators can update order status.", 403),
    );
  }

  const order = await orderRepository.updateOrderStatusById(
    req.params.id,
    req.body.status,
  );

  if (!order) {
    return next(new AppError("Order not found.", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Order status updated successfully.",
    data: order,
  });
});
