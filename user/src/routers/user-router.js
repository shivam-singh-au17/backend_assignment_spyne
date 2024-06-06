const express = require('express');
const userController = require('../controllers/user-controller');
const authenticate = require("../middlewares/auth");
const validate = require('../middlewares/validate');
const {
    signUpSchema,
    signInSchema,
    updateUserSchema,
    userIdSchema,
    getAllUsersSchema
} = require('../validation/user-validation');

const router = express.Router();

module.exports = () => {

    const {
        signUp,
        signIn,
        getUser,
        updateUser,
        deleteUser,
        getAllUsers,
        followUser,
        unfollowUser
    } = userController();

    router.post('/signup', validate(signUpSchema), signUp);
    router.post('/login', validate(signInSchema), signIn);

    router.get('/profile', authenticate, getUser);
    router.get('/', authenticate, validate(getAllUsersSchema), getAllUsers);

    router.put('/', authenticate, validate(updateUserSchema), updateUser);
    router.put('/unfollow/:userId', authenticate, validate(userIdSchema), unfollowUser);
    router.put('/follow/:userId', authenticate, validate(userIdSchema), followUser);

    router.delete('/', authenticate, deleteUser);


    return router;
}

