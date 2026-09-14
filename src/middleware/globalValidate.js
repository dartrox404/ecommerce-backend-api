const AppError = require("../utils/AppError");

exports.handleGLobalValidation = (JoiSchema, property = "body") => {
  return (req, res, next) => {
    const { value, error } = JoiSchema.validate(req[property], {
      abortEarly: true,
      stripUnknown: false,
    });
    if (error) {
      const message = error.details.map((e) => e.message).join(", ");
      return next(new AppError(message, 400));
    }
    req[property] = value;
    next();
  };
};
