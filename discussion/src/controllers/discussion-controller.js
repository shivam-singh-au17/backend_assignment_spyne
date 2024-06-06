const DiscussionService = require("../services/discussion-service");
const asyncHandler = require("../utils/async-handler");
const { INTERACTION_BINDING_KEY } = require("../config/env");
const { PublishMessage , SubscribeMessage} = require("../utils");

module.exports = (channel) => {

    const service = new DiscussionService();

    SubscribeMessage(channel, service)

    return {
        createDiscussion: asyncHandler(async (req, res) => {
            const { text, image, hashtags } = req.body;
            const { _id } = req.user;
            const { data } = await service.createDiscussion({ userId: _id, text, image, hashtags });
            return res.json(data);
        }),

        getDiscussion: asyncHandler(async (req, res) => {
            const { discussionId } = req.params;
            const { _id } = req.user;
            const { data } = await service.getDiscussion({ discussionId, userId: _id });
            return res.json(data);
        }),

        updateDiscussion: asyncHandler(async (req, res) => {
            const { discussionId } = req.params;
            const { _id } = req.user;
            const { text, image, hashtags } = req.body;
            const { data } = await service.updateDiscussion({ discussionId, discussion: { text, image, hashtags }, userId: _id });
            return res.json(data);
        }),

        deleteDiscussion: asyncHandler(async (req, res) => {
            const { discussionId } = req.params;
            const { _id } = req.user;
            const { data } = await service.deleteDiscussion({ discussionId, userId: _id });
            const payload = await service.GetDiscussionPayload({ discussionId }, "DELETE_COMMENT");
            PublishMessage(channel, INTERACTION_BINDING_KEY, JSON.stringify(payload));
            return res.json(data);
        }),

        getAllDiscussions: asyncHandler(async (req, res) => {
            const { page, limit, sortBy, sortOrder, search } = req.query;
            const paginationOptions = {
                page: Number(page) || 1,
                limit: Number(limit) || 10,
                sortBy: sortBy || "createdAt",
                sortOrder: sortOrder || "DESC",
                search: search || ""
            };
            const { data } = await service.getAllDiscussion(paginationOptions);
            return res.json(data);
        }),

        getDiscussionByTag: asyncHandler(async (req, res) => {
            const { tags } = req.query;
            const { data } = await service.getDiscussionByTag(tags.split(','));
            return res.json(data);
        }),

    }
}

