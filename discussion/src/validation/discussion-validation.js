const Joi = require('joi');

const createDiscussionSchema = Joi.object({
    body: Joi.object({
        text: Joi.string().required(),
        image: Joi.string().optional(),
        hashtags: Joi.array().items(Joi.string()).required(),
    })
});

const updateDiscussionSchema = Joi.object({
    body: Joi.object({
        text: Joi.string().required(),
        image: Joi.string().optional(),
        hashtags: Joi.array().items(Joi.string()).required(),
    })
});

const discussionIdSchema = Joi.object({
    params: Joi.object({
        discussionId: Joi.string().required(),
    })
});

const getAllDiscussionsSchema = Joi.object({
    query: Joi.object({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
        sortBy: Joi.string().optional(),
        sortOrder: Joi.string().valid('ASC', 'DESC').optional(),
        search: Joi.string().optional(),
    })
});

const getDiscussionByTagSchema = Joi.object({
    query: Joi.object({
        tags: Joi.string().required(),
    })
});

module.exports = { createDiscussionSchema, updateDiscussionSchema, discussionIdSchema, getAllDiscussionsSchema, getDiscussionByTagSchema };
