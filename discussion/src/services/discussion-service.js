const DiscussionRepository = require("../repositories/discussion-repository");
const { formatData } = require('../utils');
const { NotFoundError } = require('../utils/errors');

class DiscussionService {
    constructor() {
        this.repository = new DiscussionRepository();
    }

    async createDiscussion(userInputs) {
        const { userId, text, image, hashtags } = userInputs;
        const user = await this.repository.createDiscussion({ userId, text, image, hashtags });

        return formatData(user);
    }

    async getDiscussion(userInputs) {
        const { discussionId, userId } = userInputs;
        const existingDiscussion = await this.repository.getDiscussion(discussionId, userId);
        if (!existingDiscussion) throw new NotFoundError('Discussion not found');

        const updatedDiscussion = await this.repository.updateDiscussion(discussionId, { viewCount: existingDiscussion.viewCount + 1 }, userId);
        return formatData(updatedDiscussion);
    }

    async updateDiscussion(userInputs) {
        const { discussionId, discussion, userId } = userInputs;
        const updatedDiscussion = await this.repository.updateDiscussion(discussionId, discussion, userId);
        if (!updatedDiscussion) throw new NotFoundError('Discussion not found');

        return formatData(updatedDiscussion);
    }

    async deleteDiscussion(userInputs) {
        const { discussionId, userId } = userInputs;
        const deletedDiscussion = await this.repository.deleteDiscussion(discussionId, userId);
        if (!deletedDiscussion) throw new NotFoundError('Discussion not found');

        return formatData({ message: "Discussion deleted successfully" });
    }

    async getAllDiscussion(options) {
        const users = await this.repository.getAllDiscussions(options);
        return formatData(users);
    }

    async getDiscussionByTag(tags) {
        const users = await this.repository.getDiscussionByTag(tags);
        return formatData(users);
    }

    async likeDiscussion(discussionId, likeByUserId) {
        const users = await this.repository.likeDiscussion(discussionId, likeByUserId);
        return formatData(users);
    }

    async SubscribeEvents(payload) {

        payload = JSON.parse(payload);

        const { event, data } = payload;
        const { discussionId, userId } = data;

        switch (event) {
            case 'LIKE_DISCUSSION':
                this.likeDiscussion(discussionId, userId);
                break;
            default:
                break;
        }
    }

    async GetDiscussionPayload(discussion, event) {

        if (discussion) {
            const payload = {
                event: event,
                data: discussion
            };

            return payload
        } else {
            return formatData({ error: 'No Discussion Available' });
        }
    }

}

module.exports = DiscussionService;
