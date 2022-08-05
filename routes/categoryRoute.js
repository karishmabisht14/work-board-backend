const express = require("express");
const { findAll } = require("../controllers/categoryController");
const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res, next) => {
    try {
        await findAll(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = categoryRouter;
