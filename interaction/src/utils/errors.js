const { NOT_FOUND, BAD_REQUEST } = require('./status-codes');

class APIError extends Error {
    constructor(message, statusCode, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}

class NotFoundError extends APIError {
    constructor(message = 'Resource not found', details) {
        super(message, NOT_FOUND, details);
    }
}

class ValidationError extends APIError {
    constructor(message = 'Validation failed', details) {
        super(message, BAD_REQUEST, details);
    }
}

module.exports = { APIError, NotFoundError, ValidationError };
