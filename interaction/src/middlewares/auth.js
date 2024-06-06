const { verifyToken } = require('../utils/jwt');
const { APIError } = require('../utils/errors');
const { UNAUTHORIZED } = require('../utils/status-codes');

const authenticate = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new APIError('Authentication token missing', UNAUTHORIZED, 'Unauthorized'));
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        return next(new APIError('Invalid token', UNAUTHORIZED, 'Unauthorized'));
    }

    req.user = decoded;
    next();
};

module.exports = authenticate;
