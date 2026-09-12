const mongoose = require("mongoose");
const Joi = require("./joi");

exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect(Joi.mongoUrl);
    console.log(
      `MongoDB has been connected successfully : ${conn.connection.host}`,
    );
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
};
