const Joi = require('joi');

const signUpSchema = Joi.object({
    body: Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().required().pattern(/^\d{10}$/).message('Phone number must be 10 numbers'),
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        password: Joi.string().required()
            .min(8).max(20)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/)
            .message('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character'),
    })
});

const signInSchema = Joi.object({
    body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
});

const updateUserSchema = Joi.object({
    body: Joi.object({
        name: Joi.string().required(),
    })
});

const userIdSchema = Joi.object({
    params: Joi.object({
        userId: Joi.string().required(),
    })
});

const getAllUsersSchema = Joi.object({
    query: Joi.object({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
        sortBy: Joi.string().optional(),
        sortOrder: Joi.string().valid('ASC', 'DESC').optional(),
        search: Joi.string().optional(),
    })
});

module.exports = { signUpSchema, signInSchema, updateUserSchema, userIdSchema, getAllUsersSchema };
