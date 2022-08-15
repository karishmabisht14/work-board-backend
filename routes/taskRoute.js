const express = require("express");
const taskRouter = express.Router();
const auth = require("../middlewares/auth");
const { addtask, getUserTasks, updateUserTask, deleteUserTask } = require("../controllers/taskConroller");


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
        await addtask(req, res);
    } catch (error) {
        next(error);
    }
});

taskRouter.put("/update/:taskId", async (req, res, next) => {
    try {
        await auth(req, res);
        await updateUserTask(req, res);
    } catch (error) {
        next(error);
    }
});

taskRouter.delete("/delete/:taskId", async (req, res, next) => {
    try {
        await auth(req, res);
        await deleteUserTask(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = taskRouter;