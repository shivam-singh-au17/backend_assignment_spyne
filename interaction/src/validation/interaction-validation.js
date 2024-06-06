const Joi = require('joi');

const createCommentSchema = Joi.object({
    body: Joi.object({
        discussionId: Joi.string().required(),
        text: Joi.string().required(),
    })
});

const updateCommentSchema = Joi.object({
    params: Joi.object({
        commentId: Joi.string().required(),
    }),
    body: Joi.object({
        text: Joi.string().required(),
    })
});

const commentIdSchema = Joi.object({
    params: Joi.object({
        commentId: Joi.string().required(),
    })
});

const likeDiscussionSchema = Joi.object({
    params: Joi.object({
        discussionId: Joi.string().required(),
    })
});

module.exports = { createCommentSchema, updateCommentSchema, commentIdSchema, likeDiscussionSchema };
