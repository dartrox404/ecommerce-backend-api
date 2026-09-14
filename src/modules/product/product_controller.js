const AppError = require("../../utils/AppError");
const { catchAsync } = require("../../utils/CatchAsync");
const productRepository = require("./product_repo");

const sendStatus = (text, res, statusCode, data) => {
  res.status(statusCode).json({ success: true, message: text, context: data });
};

exports.getProducts = catchAsync(async (req, res,next) => {
  const products = await productRepository.getProducts();
  if (products.length === 0) {
    return next(new AppError("No data to show", 404));
  }
  res.status(200).json({
    success: true,
    message: "Products retrieved successfully.",
    count: products.length,
    context: products,
  });
});

exports.getProductById = catchAsync(async (req, res, next) => {
  const product = await productRepository.getProductById(req.params.id);
  if (!product) {
    return next(new AppError("Product not found.", 404));
  }
  sendStatus("Product retrieved successfully.", res, 200, product);
});

exports.createProduct = catchAsync(async (req, res,next) => {
  const product = await productRepository.createProduct(req.body);
  sendStatus("Product created successfully.", res, 201, product);
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await productRepository.updateProductById(
    req.params.id,
    req.body,
  );
  if (!product) {
    return next(new AppError("Product not found.", 404));
  }
  sendStatus("Product updated successfully.", res, 200, product);
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await productRepository.deleteProductById(req.params.id);
  if (!product) {
    return next(new AppError("Product not found.", 404));
  }
  sendStatus("Product deleted successfully.", res, 200, product);
});
