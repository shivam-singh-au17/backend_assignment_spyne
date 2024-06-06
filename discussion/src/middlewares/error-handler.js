const { APIError } = require('../utils/errors');
const { INTERNAL_ERROR } = require('../utils/status-codes');
const { logError } = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    logError(err);

    if (err instanceof APIError) {
        return res.status(err.statusCode).json({
            status: false,
            message: err.message,
            details: err.details
        });
    }

    return res.status(INTERNAL_ERROR).json({
        status: false,
        message: 'An unexpected error occurred',
        details: err.message
    });
};

module.exports = errorHandler;
