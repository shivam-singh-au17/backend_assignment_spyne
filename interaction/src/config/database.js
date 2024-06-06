const mongoose = require('mongoose');
const { DB_URL } = require('./env');

module.exports = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to the database...");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        throw new Error("Unable to connect to the database.");
    }
};
