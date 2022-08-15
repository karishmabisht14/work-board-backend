const ErrorCodes = {
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    408: "Request Timeout",
    422: "Unprocessable Entity",
    409: "Entity already Exists"
};

const SuccessCodes = {
    200: "Success",
    201: "Created",
    202: "Accepted",
    204: "No Content"
};

const ServerErrorCodes = {
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable"
};

const ErrorMessages = {
    "UNAUTHORISED": "~s~ not authorised for this action!",
    "NOT_FOUND": "~s~ Not found!",
    "INCOMPLETE_ARGUMENTS": "~s~ are the required argument(s)!",
    "INVALID_CREDENTIALS": "Invalid Credentials!",
    "ALREADY_EXISTS": "~s~ already exists!",
    "SERVER_ERROR": "Internal Server Error",
    "INVALID_TOKEN": "Invalid / Expired Token!",
    "AUTHORIZATION_REQUIRED": "A valid token is required for authentication!",
    "UNPROCCESSABLE_ENTITY": "Request cannot be processed, Please check the Request and try again."
};

const SuccessMessages = {
    "SUCCESS": "Request completed successfully!"
};

module.exports = {
    ErrorCodes,
    SuccessCodes,
    ServerErrorCodes,
    ErrorMessages,
    SuccessMessages
};
