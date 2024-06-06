const express = require('express');
const interactionController = require('../controllers/interaction-controller');
const authenticate = require("../middlewares/auth");
const validate = require('../middlewares/validate');
const {
    createCommentSchema,
    updateCommentSchema,
    commentIdSchema,
    likeDiscussionSchema,
} = require('../validation/interaction-validation');

const router = express.Router();

module.exports = (channel) => {

    const {
        createComment,
        updateComment,
        deleteComment,
        replyComment,
        likeComment,
        likeDiscussion
    } = interactionController(channel);

    router.post('/comment', authenticate, validate(createCommentSchema), createComment);

    router.put('/comment/like/:commentId', authenticate, validate(commentIdSchema), likeComment);
    router.put('/discussion/like/:discussionId', authenticate, validate(likeDiscussionSchema), likeDiscussion);
    router.put('/comment/reply/:commentId', authenticate, validate(updateCommentSchema), replyComment);
    router.put('/comment/:commentId', authenticate, validate(updateCommentSchema), updateComment);

    router.delete('/comment/:commentId', authenticate, validate(commentIdSchema), deleteComment);

    return router;
}

