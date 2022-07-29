const express = require("express");
const userRouter = express.Router();
const { login, register } = require("../controllers/userController");

userRouter.post("/register", register);
userRouter.post("/login", login);

/**
 * Test Route
 */
userRouter.get("/active", (req, res) => {
  return res.status(200).send("Welcome 🙌 ");
});

module.exports = userRouter;
