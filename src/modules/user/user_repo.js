const User = require("./user_model");

const createUser = (data) => User.create(data);

const findUserByEmailWithPassword = (email) =>
  User.findOne({ email }).select("+password");

const findUserById = (id) => User.findById(id);

module.exports = {
  createUser,
  findUserByEmailWithPassword,
  findUserById,
};
