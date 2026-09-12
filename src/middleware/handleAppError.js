const AppError = require("../utils/AppError");

const handleDuplicateError = (err) => {
  const field = err.keyPattern
    ? Object.keys(err.keyPattern)[0]
    : err.keyValue
      ? Object.keys(err.keyValue)[0]
      : "field";

  const value = err.keyValue?.[field];
  const valueText = value !== undefined ? ` Value '${value}'` : "";

  return new AppError(
    `${field}${valueText} already exists. Please use another value.`,
    409,
    { field, value },
  );
};

const handleValidationError = (err) => {
  const details = Object.values(err.errors).map((error) => ({
    field: error.path,
    message: error.message,
  }));

  return new AppError("Validation failed.", 400, details);
};

const handleCastError = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}`, 400);

const handleJoiError = (err) => {
  const details = err.details?.map((detail) => ({
    field: detail.path.join("."),
    message: detail.message,
  }));

  return new AppError("Request validation failed.", 400, details);
};

const handleJsonWebTokenError = () =>
  new AppError("Invalid token. Please log in again.", 401);

const handleTokenExpiredError = (err) =>
  new AppError("Your token has expired. Please log in again.", 401, {
    expiredAt: err.expiredAt,
  });

exports.errorHandler = (err, req, res, next) => {
  let error = err;

  if (err.code === 11000) {
    error = handleDuplicateError(err);
  } else if (err.name === "ValidationError" && err.errors) {
    error = handleValidationError(err);
  } else if (err.name === "CastError") {
    error = handleCastError(err);
  } else if (err.isJoi) {
    error = handleJoiError(err);
  } else if (err.name === "TokenExpiredError") {
    error = handleTokenExpiredError(err);
  } else if (err.name === "JsonWebTokenError") {
    error = handleJsonWebTokenError(err);
  }

  const statusCode = error.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  const response = {
    status: error.status || "error",
    message:
      isProduction && !error.isOperational
        ? "Something went wrong on the server."
        : error.message || "Internal server error.",
  };

  if (error.details && (!isProduction || error.isOperational)) {
    response.details = error.details;
  }

  if (process.env.NODE_ENV !== "test") {
    console.error(error);
  }

  res.status(statusCode).json(response);
};
