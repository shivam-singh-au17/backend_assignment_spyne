const express = require('express');
const cors = require('cors');
const userRoutes = require('./routers/user-router');
const errorHandler = require('./middlewares/error-handler');
const responseHandler = require('./middlewares/response-handler');

module.exports = async (app) => {

    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true, limit: '1mb' }));
    app.use(cors());
    app.use(express.static(__dirname + '/public'));

    // Global response handler
    app.use(responseHandler);

    // APIs Routes
    app.use('/users', userRoutes());

    // Global error handler
    app.use(errorHandler);
};
