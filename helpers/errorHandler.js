
const ErrorHandler = async (err, req, res, next) => {
    if (err && err.success === false) {
        return res.status(err.statusCode).send(err);
    }
    return next();
};

module.exports = {
    ErrorHandler,
};