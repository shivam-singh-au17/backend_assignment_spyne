const User = require("../models/User");
const { APIError } = require("../utils/errors");
const { INTERNAL_ERROR } = require("../utils/status-codes");

class UserRepository {
  async createUser({ name, phone, email, password, salt }) {
    try {
      const user = new User({ name, phone, email, password, salt });
      return await user.save();
    } catch (err) {
      throw new APIError("Unable to create user", INTERNAL_ERROR, err.message);
    }
  }

  async findUser({ email }) {
    try {
      return await User.findOne({ email });
    } catch (err) {
      throw new APIError("Unable to find user", INTERNAL_ERROR, err.message);
    }
  }

  async findUserById(id) {
    try {
      return await User.findById(id);
    } catch (err) {
      throw new APIError("Unable to find user", INTERNAL_ERROR, err.message);
    }
  }

  async updateUser(id, user) {
    try {
      return await User.findByIdAndUpdate(id, user, { new: true });
    } catch (err) {
      throw new APIError("Unable to update user", INTERNAL_ERROR, err.message);
    }
  }

  async deleteUser(id) {
    try {
      return await User.findByIdAndDelete(id);
    } catch (err) {
      throw new APIError("Unable to delete user", INTERNAL_ERROR, err.message);
    }
  }

  async getAllUsers(options) {
    try {
      const { page, limit, sortBy, sortOrder, search } = options;
      const skip = (page - 1) * limit;

      const matchStage = search ? {
        $match: {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
          ]
        }
      } : {
        $match: {}
      };

      const projectStage = {
        $project: {
          _id: 1,
          name: 1,
          phone: 1,
          email: 1,
          followers: 1,
          following: 1,
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
            users: [
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

      const [result] = await User.aggregate(pipeline);

      const count = result.count.length > 0 ? result.count[0].count : 0;
      const data = result.users;

      return { data, count };
    } catch (err) {
      throw new APIError("Unable to get users", INTERNAL_ERROR, err.message);
    }
  }

  async followUser(userIdToFollow, currentUserId) {
    try {
      await User.findByIdAndUpdate(
        currentUserId,
        { $addToSet: { following: userIdToFollow } },
        { new: true }
      );

      await User.findByIdAndUpdate(
        userIdToFollow,
        { $addToSet: { followers: currentUserId } },
        { new: true }
      );

      return { message: "Successfully followed the user" };
    } catch (err) {
      throw new APIError("Unable to follow user", INTERNAL_ERROR, err.message);
    }
  }

  async unfollowUser(userIdToUnfollow, currentUserId) {
    try {
      await User.findByIdAndUpdate(
        currentUserId,
        { $pull: { following: userIdToUnfollow } },
        { new: true }
      );
      
      await User.findByIdAndUpdate(
        userIdToUnfollow,
        { $pull: { followers: currentUserId } },
        { new: true }
      );

      return { message: "Successfully unfollowed the user" };
    } catch (err) {
      throw new APIError("Unable to follow user", INTERNAL_ERROR, err.message);
    }
  }

}

module.exports = UserRepository;
