const express = require("express");
const router = express.Router();
const userRouter = require("./userRoute");

/* GET home page. */
router.get("/", function (req, res, next) {
  return res.status(200).send("Welcome 🙌 ! API Server is running actively! ");
});

router.use("/user", userRouter);

// This should be the last route else any after it won't work
router.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

module.exports = router;
