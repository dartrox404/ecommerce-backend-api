const Product = require("./product_model");

const createProduct = (data) => Product.create(data);

const getProducts = () => Product.find().sort({ createdAt: -1 });

const getProductById = (id) => Product.findById(id);

const updateProductById = (id, data) =>
  Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

const deleteProductById = (id) => Product.findByIdAndDelete(id);

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
