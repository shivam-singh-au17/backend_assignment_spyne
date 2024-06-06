const responseHandler = (req, res, next) => {
    // Save the original res.json function
    const originalJson = res.json;

    // Override res.json
    res.json = (data) => {

        if (data.status === false) {
            originalJson.call(res, data);
        } else {
            originalJson.call(res, { status: true, data });
        }

    };

    next();
};

module.exports = responseHandler;
