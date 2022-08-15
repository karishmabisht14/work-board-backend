const { ErrorMessages } = require("../utils/errorConstants");

const ErrorHandler = async (err, req, res, next) => {
    if (err) {
        if (err.success === false) {
            return res.status(err.statusCode).send(err);
        } else {
            return res.status(500).send(ErrorMessages.SERVER_ERROR);
        }
    }
    return next();
};

module.exports = {
    ErrorHandler,
};