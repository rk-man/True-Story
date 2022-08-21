class appError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = "fail";
        this.isOperational = true;
    }
}

module.exports = appError;
