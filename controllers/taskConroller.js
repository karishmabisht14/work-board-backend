const { getErrorContent, validateUpdatingFields, getSuccessContent } = require("../helpers/commonHelper");
const { TaskConstants } = require("../helpers/constants");
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
        const allTasks = await Task.find({ userId: req.user.userId, categoryId: Category.id, isArchive: false });
        return res.status(200).json(allTasks);
    } catch (err) {
        throw err;
    }
};

const updateUserTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        if (!taskId) {
            throw getErrorContent(400, "INCOMPLETE_ARGUMENTS", 'Task Id');
        }
        const fieldsToUpdate = validateUpdatingFields(req.body, TaskConstants.validTaskUpdateFields);
        if (Object.keys(fieldsToUpdate).length) {
            if (fieldsToUpdate.name) {
                const docExists = await Task.findOne({ name: fieldsToUpdate.name, userId: req.user.userId });
                if (docExists) {
                    throw getErrorContent(409, "ALREADY_EXISTS", 'Task With Given Name');
                }
            }
            const taskToUpdate = await Task.updateOne({ _id: taskId, userId: req.user.userId },
                { $set: fieldsToUpdate });
            if (!taskToUpdate.matchedCount && !taskToUpdate.modifiedCount) {
                throw getErrorContent(404, "NOT_FOUND", 'Requested Task');
            }
            return res.status(200).json(taskToUpdate);
        } else {
            return res.status(200).json(getSuccessContent(204, 'SUCCESS'));
        }
    } catch (err) {
        if (!err.statusCode) {
            err = getErrorContent(422, "UNPROCCESSABLE_ENTITY");
        }
        throw err;
    }
};

const deleteUserTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        if (!taskId) {
            throw getErrorContent(400, "INCOMPLETE_ARGUMENTS", 'Task Id');
        }
        const deleteResult = await Task.deleteOne({ _id: taskId, userId: req.user.userId });
        if (!deleteResult.acknowledged) {
            throw getErrorContent(404, "NOT_FOUND", 'Requested Task');
        }
        if (!deleteResult.deletedCount) {
            throw getErrorContent(401, "UNAUTHORISED", 'You are');
        }
        return res.status(200).json(getSuccessContent(204, 'SUCCESS'));
    } catch (err) {
        if (!err.statusCode) {
            err = getErrorContent(422, "UNPROCCESSABLE_ENTITY");
        }
        throw err;
    }
};


module.exports = {
    addtask,
    getUserTasks,
    updateUserTask,
    deleteUserTask
};