const jwt = require("jsonwebtoken");
const Joi = require("../../config/joi");
const AppError = require("../../utils/AppError");
const { catchAsync } = require("../../utils/CatchAsync");
const userRepository = require("./user_repo");

const signToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    Joi.jwtSecret,
    {
      expiresIn: Joi.jwtExpire,
    },
  );
};

const sendAuthResponse = (user, statusCode, message, res) => {
  user.password = undefined;
  const token = signToken(user);
  const userData = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  res.status(statusCode).json({
    status: "success",
    message,
    token,
    data: userData,
  });
};

exports.register = catchAsync(async (req, res) => {
  const user = await userRepository.createUser(req.body);
  sendAuthResponse(user, 201, "User registered successfully.", res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userRepository.findUserByEmailWithPassword(email);
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("Invalid email or password.", 401));
  }
  sendAuthResponse(user, 200, "Login successful.", res);
});

exports.profile = catchAsync(async (req, res, next) => {
  const user = await userRepository.findUserById(req.params.id);
  if (!user) {
    return next(new AppError("User not found.", 404));
  }
  res.status(200).json({
    status: "success",
    message: "User retrieved successfully.",
    data: user,
  });
});
