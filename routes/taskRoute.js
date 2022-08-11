const express = require("express");
const taskRouter = express.Router();
const auth = require("../middlewares/auth");
const { addtask, getUserTasks } = require("../controllers/taskConroller");


taskRouter.get("/", async (req, res, next) => {
    try {
        await auth(req, res);
        await getUserTasks(req, res);
    } catch (error) {
        next(error);
    }
});

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