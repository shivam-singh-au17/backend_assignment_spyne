const mongoose = require('mongoose');
const Comment = require("../models/Comment");
const { APIError } = require("../utils/errors");
const { INTERNAL_ERROR } = require("../utils/status-codes");

class InteractionRepository {

  async createComment({ discussionId, userId, text }) {
    try {
      const comment = new Comment({ discussionId, userId, text });
      return await comment.save();
    } catch (err) {
      throw new APIError("Unable to create comment", INTERNAL_ERROR, err.message);
    }
  }

  async updateComment(commentId, comment, userId) {
    try {
      const filter = { _id: new mongoose.Types.ObjectId(commentId), userId: new mongoose.Types.ObjectId(userId) };
      const update = { $set: comment };
      const options = { new: true };
      return await Comment.findOneAndUpdate(filter, update, options);
    } catch (err) {
      throw new APIError("Unable to update comment", INTERNAL_ERROR, err.message);
    }
  }

  async deleteComment(commentId, userId) {
    try {
      return await Comment.deleteOne({ _id: new mongoose.Types.ObjectId(commentId), userId: new mongoose.Types.ObjectId(userId) });
    } catch (err) {
      throw new APIError("Unable to delete comment", INTERNAL_ERROR, err.message);
    }
  }

  async deleteCommentByDiscussionId(discussionId) {
    try {
      return await Comment.deleteMany({ discussionId });
    } catch (err) {
      throw new APIError("Unable to delete comment", INTERNAL_ERROR, err.message);
    }
  }

  async likeComment(commentId, likeByUserId) {
    try {
      return await Comment.findByIdAndUpdate(commentId, { $addToSet: { likes: likeByUserId } }, { new: true });
    } catch (err) {
      throw new APIError("Unable to like comment", INTERNAL_ERROR, err.message);
    }
  }

  async replyComment(commentId, { userId, text }) {
    try {
      return await Comment.findByIdAndUpdate(commentId, { $push: { replies: { userId, text } } }, { new: true });
    } catch (err) {
      throw new APIError("Unable to reply comment", INTERNAL_ERROR, err.message);
    }
  }

}

module.exports = InteractionRepository;
