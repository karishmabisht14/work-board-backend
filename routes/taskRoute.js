const express = require("express");
const taskRouter = express.Router();
const auth = require("../middlewares/auth");
const { addtask } = require("../controllers/taskConroller");

taskRouter.post("/add", async (req, res, next) => {
    try {
        await auth(req, res);
        console.log("req....", req.user);
        await addtask(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = taskRouter;