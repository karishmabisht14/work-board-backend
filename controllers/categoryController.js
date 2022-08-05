const { BoardCategory } = require("../models/index");

const findAll = async (req, res) => {
    try {
        const categories = await BoardCategory.find();
        return res.status(200).json(categories);
    } catch (err) {
        throw err;
    }
};

module.exports = {
    findAll
};