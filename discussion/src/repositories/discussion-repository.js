const mongoose = require('mongoose');
const { APIError } = require("../utils/errors");
const { INTERNAL_ERROR } = require("../utils/status-codes");
const Discussion = require("../models/Discussion");

class DiscussionRepository {

  async createDiscussion({ userId, text, image, hashtags }) {
    try {
      const discussion = new Discussion({ userId, text, image, hashtags });
      return await discussion.save();
    } catch (err) {
      throw new APIError("Unable to create discussion", INTERNAL_ERROR, err.message);
    }
  }

  async getDiscussion(discussionId, userId) {
    try {
      return await Discussion.findOne({ _id: new mongoose.Types.ObjectId(discussionId), userId: new mongoose.Types.ObjectId(userId) });
    } catch (err) {
      throw new APIError("Unable to find discussion", INTERNAL_ERROR, err.message);
    }
  }

  async updateDiscussion(discussionId, discussion, userId) {
    try {
      const filter = { _id: new mongoose.Types.ObjectId(discussionId), userId: new mongoose.Types.ObjectId(userId) };
      const update = { $set: discussion };
      const options = { new: true };
      return await Discussion.findOneAndUpdate(filter, update, options);
    } catch (err) {
      throw new APIError("Unable to update discussion", INTERNAL_ERROR, err.message);
    }
  }

  async deleteDiscussion(discussionId, userId) {
    try {
      return await Discussion.deleteOne({ _id: new mongoose.Types.ObjectId(discussionId), userId: new mongoose.Types.ObjectId(userId) });
    } catch (err) {
      throw new APIError("Unable to delete discussion", INTERNAL_ERROR, err.message);
    }
  }

  async getAllDiscussions(options) {
    try {
      const { page, limit, sortBy, sortOrder, search } = options;
      const skip = (page - 1) * limit;

      const matchStage = search ? {
        $match: {
          $or: [
            { text: { $regex: search, $options: 'i' } }
          ]
        }
      } : {
        $match: {}
      };

      const projectStage = {
        $project: {
          _id: 1,
          text: 1,
          image: 1,
          hashtags: 1,
          viewCount: 1,
          likes: 1,
          createdOn: 1,
          createdAt: 1,
          updatedAt: 1
        }
      };

      const pipeline = [
        matchStage,
        {
          $sort: {
            [sortBy]: (sortOrder === "ASC" ? 1 : -1)
          }
        },
        projectStage,
        {
          $facet: {
            discussions: [
              { $skip: skip },
              { $limit: limit }
            ],
            count: [
              {
                $count: 'count'
              }
            ]
          }
        }
      ];

      const [result] = await Discussion.aggregate(pipeline);

      const count = result.count.length > 0 ? result.count[0].count : 0;
      const data = result.discussions;

      return { data, count };
    } catch (err) {
      throw new APIError("Unable to get discussions", INTERNAL_ERROR, err.message);
    }
  }

  async getDiscussionByTag(tags) {
    try {
      return await Discussion.find({ hashtags: { $in: tags } });
    } catch (err) {
      throw new APIError("Unable to get discussion by tag", INTERNAL_ERROR, err.message);
    }
  }

  async likeDiscussion(discussionId, likeByUserId) {
    try {
      return await Discussion.findByIdAndUpdate(discussionId, { $addToSet: { likes: likeByUserId } }, { new: true });
    } catch (err) {
      throw new APIError("Unable to get discussion by tag", INTERNAL_ERROR, err.message);
    }
  }

}

module.exports = DiscussionRepository;
