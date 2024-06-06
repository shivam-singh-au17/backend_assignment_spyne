const InteractionRepository = require("../repositories/interaction-repository");
const { formatData } = require('../utils');
const { NotFoundError } = require('../utils/errors');

class InteractionService {
    constructor() {
        this.repository = new InteractionRepository();
    }

    async createComment(userInputs) {
        const { discussionId, userId, text } = userInputs;
        const comment = await this.repository.createComment({ discussionId, userId, text });
        return formatData(comment);
    }

    async updateComment(userInputs) {
        const { commentId, comment, userId } = userInputs;
        const updatedComment = await this.repository.updateComment(commentId, comment, userId);
        if (!updatedComment) throw new NotFoundError('Comment not found');

        return formatData(updatedComment);
    }

    async deleteComment(userInputs) {
        const { commentId, userId } = userInputs;
        const deletedComment = await this.repository.deleteComment(commentId, userId);
        if (!deletedComment) throw new NotFoundError('Comment not found');

        return formatData({ message: "Comment deleted successfully" });
    }

    async deleteCommentByDiscussionId(discussionId) {
        await this.repository.deleteCommentByDiscussionId(discussionId);
        return formatData({ message: "Comment deleted successfully" });
    }

    async replyComment(userInputs) {
        const { commentId, reply } = userInputs;
        const { userId, text } = reply;
        const comment = await this.repository.replyComment(commentId, { userId, text });
        return formatData(comment);
    }

    async likeComment(commentId, likeByUserId) {
        const comment = await this.repository.likeComment(commentId, likeByUserId);
        return formatData(comment);
    }

    async likeDiscussion(commentId, likeByUserId) {
        const msg = {
            massage: "Discussion liked successfully"
        }
        return formatData(msg);
    }

    async SubscribeEvents(payload) {

        payload = JSON.parse(payload);

        const { event, data } = payload;
        const { discussionId } = data;

        switch (event) {
            case 'DELETE_COMMENT':
                this.deleteCommentByDiscussionId(discussionId);
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

module.exports = InteractionService;
