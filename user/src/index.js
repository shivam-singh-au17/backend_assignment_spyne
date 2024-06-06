const express = require('express');
const databaseConnection = require('./config/database');
const { PORT } = require('./config/env');
const expressApp = require('./app');

const StartServer = async () => {
    const app = express();
    
    // Connect to the database
    await databaseConnection();

    // Load routes and middleware
    await expressApp(app);

    // Start the server
    const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
        console.log('Received SIGTERM, shutting down gracefully');
        server.close(() => {
            console.log('Server closed');
            process.exit(0);
        });
    });

    process.on('SIGINT', () => {
        console.log('Received SIGINT, shutting down gracefully');
        server.close(() => {
            console.log('Server closed');
            process.exit(0);
        });
    });
};

StartServer();
