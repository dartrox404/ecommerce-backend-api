const Order = require("./order_model");

const createOrder = (data) => Order.create(data);

const getOrdersByUserId = (userId) =>
  Order.find({ user: userId })
    .populate("items.product", "name price category")
    .sort({ createdAt: -1 });

const getOrderById = (id) =>
  Order.findById(id).populate("items.product", "name price category");

const updateOrderStatusById = (id, status) =>
  Order.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  ).populate("items.product", "name price category");

module.exports = {
  createOrder,
  getOrdersByUserId,
  getOrderById,
  updateOrderStatusById,
};
