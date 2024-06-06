const express = require('express');
const cors = require('cors');
const discussionRoutes = require('./routers/discussion-router');
const errorHandler = require('./middlewares/error-handler');
const responseHandler = require('./middlewares/response-handler');

module.exports = async (app, channel) => {

    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true, limit: '1mb' }));
    app.use(cors());
    app.use(express.static(__dirname + '/public'));

    // Global response handler
    app.use(responseHandler);

    //api
    app.use('/discussions', discussionRoutes(channel));

    // Global error handler
    app.use(errorHandler);
};
