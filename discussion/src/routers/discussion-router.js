const express = require('express');
const discussionController = require('../controllers/discussion-controller');
const authenticate = require("../middlewares/auth");
const validate = require('../middlewares/validate');
const {
    createDiscussionSchema,
    updateDiscussionSchema,
    discussionIdSchema,
    getAllDiscussionsSchema,
    getDiscussionByTagSchema
} = require('../validation/discussion-validation');

const router = express.Router();

module.exports = (channel) => {

    const {
        createDiscussion,
        getDiscussion,
        updateDiscussion,
        deleteDiscussion,
        getAllDiscussions,
        getDiscussionByTag
    } = discussionController(channel);

    router.post('/', authenticate, validate(createDiscussionSchema), createDiscussion);

    router.get('/tags', authenticate, validate(getDiscussionByTagSchema), getDiscussionByTag);
    router.get('/', authenticate, validate(getAllDiscussionsSchema), getAllDiscussions);
    router.get('/:discussionId', authenticate, validate(discussionIdSchema), getDiscussion);

    router.put('/:discussionId', authenticate, validate(updateDiscussionSchema), updateDiscussion);

    router.delete('/:discussionId', authenticate, validate(discussionIdSchema), deleteDiscussion);

    return router;
}

