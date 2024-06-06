const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;
const { LOG_LEVEL, LOG_FILE_PATH } = require('../config/env');

// Define custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

// Create logger instance
const logger = createLogger({
    level: LOG_LEVEL,
    format: combine(
        timestamp(),
        errors({ stack: true }), // Log stack trace if error
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: LOG_FILE_PATH })
    ]
});

// Log error function
function logError(err) {
    logger.error(err);
}

module.exports = { logError, logger };
