const { ErrorCodes, ErrorMessages } = require("../utils/errorConstants");

const getErrorContent = (errorCode, messageCode, appendData) => {
    let message = ErrorMessages[messageCode];;
    if (!!appendData) {
        message = message.replace("~s~", appendData);
    }
    const error = {
        message,
        name: ErrorCodes[errorCode],
        statusCode: errorCode,
        success: false,
        errorCode: messageCode
    };
    return error;
};

module.exports = {
    getErrorContent
};