const InteractionService = require("../services/interaction-service");
const asyncHandler = require("../utils/async-handler");
const { SubscribeMessage, PublishMessage } = require("../utils");
const { DISCUSSION_BINDING_KEY } = require("../config/env");

module.exports = (channel) => {

    const service = new InteractionService();

    SubscribeMessage(channel, service);

    return {
        createComment: asyncHandler(async (req, res) => {
            const { text, discussionId } = req.body;
            const { _id } = req.user;
            const { data } = await service.createComment({ discussionId, userId: _id, text });
            return res.json(data);
        }),

        updateComment: asyncHandler(async (req, res) => {
            const { commentId } = req.params;
            const { _id } = req.user;
            const { text } = req.body;
            const { data } = await service.updateComment({ commentId, comment: { text }, userId: _id });
            return res.json(data);
        }),

        deleteComment: asyncHandler(async (req, res) => {
            const { commentId } = req.params;
            const { _id } = req.user;
            const { data } = await service.deleteComment({ commentId, userId: _id });
            return res.json(data);
        }),

        replyComment: asyncHandler(async (req, res) => {
            const { commentId } = req.params;
            const { _id } = req.user;
            const { text } = req.body;
            const { data } = await service.replyComment({ commentId, reply: { userId: _id, text } });
            return res.json(data);
        }),

        likeComment: asyncHandler(async (req, res) => {
            const { commentId } = req.params;
            const { _id } = req.user;
            const { data } = await service.likeComment(commentId, _id);
            return res.json(data);
        }),

        likeDiscussion: asyncHandler(async (req, res) => {
            const { discussionId } = req.params;
            const { _id } = req.user;
            const payload = await service.GetDiscussionPayload({ discussionId, userId: _id }, "LIKE_DISCUSSION");
            PublishMessage(channel, DISCUSSION_BINDING_KEY, JSON.stringify(payload));
            const { data } = await service.likeDiscussion();
            return res.json(data);
        }),

    }
}

