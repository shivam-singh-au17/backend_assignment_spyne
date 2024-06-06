const bcrypt = require("bcryptjs");

/**
 * Generate a salt for password hashing.
 * @returns {Promise<string>} A promise that resolves to a salt string.
 */
module.exports.generateSalt = async () => {
    return bcrypt.genSalt();
};

/**
 * Hash the provided password using the given salt.
 * @param {string} password - The password to hash.
 * @param {string} salt - The salt to use for hashing.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 */
module.exports.generatePassword = async (password, salt) => {
    return bcrypt.hash(password, salt);
};

/**
 * Validate if the entered password matches the saved password.
 * @param {string} enteredPassword - The password entered by the user.
 * @param {string} savedPassword - The hashed password stored in the database.
 * @param {string} salt - The salt used for hashing the password.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the passwords match.
 */
module.exports.validatePassword = async (
    enteredPassword,
    savedPassword,
    salt
) => {
    const hashedEnteredPassword = await bcrypt.hash(enteredPassword, salt);
    return hashedEnteredPassword === savedPassword;
};

/**
 * Format data into a standardized response format.
 * @param {*} data - The data to format.
 * @returns {object} The formatted data.
 * @throws {Error} Throws an error if data is not found.
 */
module.exports.formatData = (data) => {
    if (data) {
        return { data };
    } else {
        throw new Error("Data not found!");
    }
};
