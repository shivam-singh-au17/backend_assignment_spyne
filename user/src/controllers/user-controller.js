const UserService = require("../services/user-service");
const asyncHandler = require("../utils/async-handler");

module.exports = () => {

    const service = new UserService();

    return {
        signUp: asyncHandler(async (req, res) => {
            const { name, phone, email, password } = req.body;
            const { data } = await service.signUp({ name, phone, email, password });
            return res.json(data);
        }),

        signIn: asyncHandler(async (req, res) => {
            const { email, password } = req.body;
            const { data } = await service.signIn({ email, password });
            return res.json(data);
        }),

        getUser: asyncHandler(async (req, res) => {
            const { _id } = req.user;
            const { data } = await service.getUser(_id);
            return res.json(data);
        }),

        updateUser: asyncHandler(async (req, res) => {
            const { _id } = req.user;
            const { name } = req.body;
            const { data } = await service.updateUser({ id: _id, user: { name } });
            return res.json(data);
        }),

        deleteUser: asyncHandler(async (req, res) => {
            const { _id } = req.user;
            const { data } = await service.deleteUser(_id);
            return res.json(data);
        }),

        getAllUsers: asyncHandler(async (req, res) => {
            const { page, limit, sortBy, sortOrder, search } = req.query;
            const paginationOptions = {
                page: Number(page) || 1,
                limit: Number(limit) || 10,
                sortBy: sortBy || "createdAt",
                sortOrder: sortOrder || "DESC",
                search: search || ""
            };
            const { data } = await service.getAllUsers(paginationOptions);
            return res.json(data);
        }),

        followUser: asyncHandler(async (req, res) => {
            const { userId } = req.params;
            const { _id } = req.user;
            const { data } = await service.followUser(userId, _id);
            return res.json(data);
        }),

        unfollowUser: asyncHandler(async (req, res) => {
            const { userId } = req.params;
            const { _id } = req.user;
            const { data } = await service.unfollowUser(userId, _id);
            return res.json(data);
        }),

    }
}

