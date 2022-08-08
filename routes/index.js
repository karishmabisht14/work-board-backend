const express = require("express");
const { BoardCategory } = require("../models");
const { categories } = require("../utils/metaData");
const router = express.Router();
const userRouter = require("./userRoute");
const boardCategoryRoute = require("./categoryRoute");
const taskRouter = require("./taskRoute");

/* GET home page. */
router.get("/", function (req, res, next) {
  return res.status(200).send("Welcome 🙌 ! API Server is running actively! ");
});

router.post("/loadCategories", async function (req, res, next) {
  const dataToAdd = categories;
  const dbData = await BoardCategory.find();
  if (dbData.length < dataToAdd.length) {
    const addedData = await BoardCategory.insertMany(dataToAdd);
    if (addedData && addedData.length) {
      return res.status(200).json(addedData);
    }
  }
  return res.status(200).json([]);
});

router.use("/users", userRouter);
router.use("/categories", boardCategoryRoute);
router.use("/tasks", taskRouter);

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
