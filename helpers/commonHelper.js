const { ErrorCodes, ErrorMessages, SuccessMessages, SuccessCodes } = require("../utils/errorConstants");

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

const getSuccessContent = (statusCode, messageCode, appendData) => {
    let message = SuccessMessages[messageCode];;
    if (!!appendData) {
        message = message.replace("~s~", appendData);
    }
    const success = {
        message,
        name: SuccessCodes[statusCode],
        statusCode: statusCode,
        success: true,
        successCode: messageCode
    };
    return success;
};

const validateUpdatingFields = (body, validTaskUpdateFields) => {
    let validFields = {};
    Object.keys(body).forEach(item => {
        if (validTaskUpdateFields.includes(item)) {
            validFields[item] = body[item];
        }
    });
    return validFields;
}

module.exports = {
    getErrorContent,
    validateUpdatingFields,
    getSuccessContent
};