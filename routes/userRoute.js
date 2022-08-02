const express = require("express");
const userRouter = express.Router();
const { login, register, logout, userDetails } = require("../controllers/userController");
const auth = require("../middlewares/auth");

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/me", auth, userDetails);
userRouter.post("/logout", auth, logout);

/**
 * Test Route
 */
userRouter.get("/active", auth, (req, res) => {
  return res.status(200).send("Welcome 🙌 You are Logged In Now!");
});

module.exports = userRouter;
