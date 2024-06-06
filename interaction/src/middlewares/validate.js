const Joi = require('joi');
const { APIError } = require('../utils/errors');
const { BAD_REQUEST } = require('../utils/status-codes');

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req, { abortEarly: false, allowUnknown: true });

        if (error) {
            const errorDetails = error.details.map(detail => detail.message).join(', ');
            return next(new APIError('Validation error', BAD_REQUEST, errorDetails));
        }

        next();
    };
};

module.exports = validate;
