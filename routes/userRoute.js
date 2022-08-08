const express = require("express");
const userRouter = express.Router();
const { login, register, logout, userDetails } = require("../controllers/userController");
const auth = require("../middlewares/auth");

userRouter.post("/register", async (req, res, next) => {
  try {
    await register(req, res);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    await login(req, res);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/me", async (req, res, next) => {
  try {
    await auth(req, res);
    await userDetails(req, res);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/logout", async (req, res, next) => {
  try {
    await auth(req, res);
    await logout(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * Test Route
 */
userRouter.get("/active", auth, (req, res) => {
  return res.status(200).send("Welcome 🙌 You are Logged In Now!");
});

module.exports = userRouter;
