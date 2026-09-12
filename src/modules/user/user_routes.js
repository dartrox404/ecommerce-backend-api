const express = require("express");
const { login, register, profile } = require("./user_controller");
const { handleGLobalValidation } = require("../../middleware/globalValidate");
const {
  registerUserSchema,
  loginUserSchema,
  userIdSchema,
} = require("../../validation/userValidator");

const router = express.Router();

router.post("/register", handleGLobalValidation(registerUserSchema), register);
router.post("/login", handleGLobalValidation(loginUserSchema), login);
router.get("/:id", handleGLobalValidation(userIdSchema, "params"), profile);

module.exports = router;
