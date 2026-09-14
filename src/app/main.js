const e = require("express");
const app = e();
const userRoutes = require("../modules/user/user_routes");
const productRoutes = require("../modules/product/product_routes");
const orderRoutes = require("../modules/order/order_routes");
const helmet = require("helmet");
const AppError = require("../utils/AppError");
const cors = require("cors");
const { errorHandler } = require("../middleware/handleAppError");
const { apiLimiter, authLimiter } = require("../middleware/RateLimit");

app.disable("x-powered-by");

app.use(helmet());
app.use(cors());

app.use(e.json());
app.use(e.urlencoded({ extended: true }));

app.use("/api/v2/auth", authLimiter, userRoutes);
app.use("/api/v3/order", apiLimiter, orderRoutes);
app.use("/api/v1/products", apiLimiter, productRoutes);

app.get("/", (req, res, next) => {
  res.send("BINGO");
});

app.use((req, res, next) => {
  return next(new AppError(`Route : ${req.originalUrl} not found`));
});

app.use(errorHandler);

module.exports = app;
