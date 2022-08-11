const { getErrorContent } = require("../helpers/commonHelper");
const { Task, BoardCategory } = require("../models/index");

const addtask = async (req, res) => {
    try {
        const { name, description, taskStage, categoryCode } = req.body;
        // Validate user input
        if (!(name && categoryCode)) {
            throw getErrorContent(400, "INCOMPLETE_ARGUMENTS", 'Task Name and Category');
        }
        const Category = await BoardCategory.findOne({ categoryCode: categoryCode });
        if (!Category) {
            throw getErrorContent(404, "NOT_FOUND", 'Requested Category');
        }

        const existingTask = await Task.findOne({ name: name, categoryId: Category.id, userId: req.user.userId });
        console.log("-----", existingTask);
        if (existingTask) {
            throw getErrorContent(409, "ALREADY_EXISTS", 'Task');
        }

        const taskData = {
            name: name,
            description: description,
            currentStage: taskStage || 1,
            categoryId: Category.id,
            userId: req.user.userId
        }

        const addedTask = await Task.create(taskData);
        return res.status(200).json(addedTask);
    } catch (err) {
        console.log("here...err", err);
        throw err;
    }
};

const getUserTasks = async (req, res) => {
    try {
        const { categoryCode } = req.query;
        if (!categoryCode) {
            throw getErrorContent(400, "INCOMPLETE_ARGUMENTS", 'Category');
        }
        const Category = await BoardCategory.findOne({ categoryCode: categoryCode });
        if (!Category) {
            throw getErrorContent(404, "NOT_FOUND", 'Requested Category');
        }
        const allTasks = await Task.find({ userId: req.user.userId, categoryId: Category.id });
        return res.status(200).json(allTasks);
    } catch (err) {
        throw err;
    }
};

module.exports = {
    addtask,
    getUserTasks
};