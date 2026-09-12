const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const { catchAsync } = require("../utils/CatchAsync");
const userRepository = require("../modules/user/user_repo");

const protect = catchAsync(async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(
      new AppError(
        "You are not logged in. Please provide a valid access token.",
        401,
      ),
    );
  }

  const token = authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await userRepository.findUserById(decoded.id);

  if (!user) {
    return next(
      new AppError("The user belonging to this token no longer exists.", 401),
    );
  }

  req.user = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action.", 403),
      );
    }

    next();
  };
};

module.exports = {
  protect,
  restrictTo,
};
