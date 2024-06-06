const UserRepository = require("../repositories/user-repository");
const { formatData, generatePassword, generateSalt, validatePassword } = require('../utils');
const { generateToken } = require('../utils/jwt');
const { NotFoundError, ValidationError } = require('../utils/errors');
const mongoose = require('mongoose');

class UserService {
    constructor() {
        this.repository = new UserRepository();
    }

    async signUp(userInputs) {
        const { name, phone, email, password } = userInputs;

        const isUserExist = await this.repository.findUser({ email });
        if (isUserExist) throw new ValidationError('User already registered');

        const salt = await generateSalt();
        const userPassword = await generatePassword(password, salt);
        const user = await this.repository.createUser({ name, phone, email, password: userPassword, salt });

        const token = generateToken({
            _id: user._id,
            name: user.name,
            phone: user.phone,
            email: user.email
        });

        return formatData({ user, token: token });
    }

    async signIn(userInputs) {
        const { email, password } = userInputs;

        const existingUser = await this.repository.findUser({ email });
        if (!existingUser) throw new NotFoundError('User not found');

        const validPassword = await validatePassword(password, existingUser.password, existingUser.salt);
        if (!validPassword) throw new ValidationError('Invalid credentials');

        const token = generateToken({
            _id: existingUser._id,
            name: existingUser.name,
            phone: existingUser.phone,
            email: existingUser.email
        });

        return formatData({ user: existingUser, token: token });
    }

    async getUser(userId) {
        const existingUser = await this.repository.findUserById(userId);
        if (!existingUser) throw new NotFoundError('User not found');

        return formatData(existingUser);
    }

    async updateUser(userInputs) {
        const { id, user } = userInputs;
        const updatedUser = await this.repository.updateUser(id, user);
        if (!updatedUser) throw new NotFoundError('User not found');

        return formatData(updatedUser);
    }

    async deleteUser(userId) {
        const deletedUser = await this.repository.deleteUser(userId);
        if (!deletedUser) throw new NotFoundError('User not found');

        return formatData({ message: "User deleted successfully" });
    }

    async getAllUsers(options) {
        const users = await this.repository.getAllUsers(options);
        return formatData(users);
    }

    async followUser(userIdToFollow, currentUserId) {
        if (userIdToFollow === currentUserId) throw new ValidationError('You cannot follow yourself');

        const existingUser = await this.repository.findUserById(userIdToFollow);
        if (!existingUser) throw new NotFoundError('User not found');

        if (existingUser.following.includes(new mongoose.Types.ObjectId(userIdToFollow))) return formatData({ message: "Successfully followed the user" });

        const users = await this.repository.followUser(userIdToFollow, currentUserId);
        return formatData(users);
    }

    async unfollowUser(userIdToUnfollow, currentUserId) {
        if (userIdToUnfollow === currentUserId) throw new ValidationError('You cannot unfollow yourself');

        const existingUser = await this.repository.findUserById(userIdToUnfollow);
        if (!existingUser) throw new NotFoundError('User not found');

        if (!existingUser.followers.includes(new mongoose.Types.ObjectId(currentUserId))) return formatData({ message: "Successfully unfollowed the user" });

        const users = await this.repository.unfollowUser(userIdToUnfollow, currentUserId);
        return formatData(users);
    }

}

module.exports = UserService;
