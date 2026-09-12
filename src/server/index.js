const app = require("../app/main");
const { connectDB } = require("../config/db");
const Joi = require("../config/joi");
const PORT = Joi.port || 5050;
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`Server is runnning on : http://localhost:${PORT}`),
    );
  } catch (e) {}
};

start();
