const dotenv = require('dotenv');
const path = require('path');

// Load .env.dev in development, .env in production
const envFile = process.env.NODE_ENV !== 'prod' ? '.env.dev' : '.env';
dotenv.config({ path: path.join(__dirname, '../../', envFile) });

// Check for required environment variables
const requiredVars = [
  'PORT',
  'MONGODB_URI',
  'JWT_SECRET',
  'LOG_FILE_PATH',
  "LOG_LEVEL",
];
requiredVars.forEach(varName => {
  if (!process.env[varName]) throw new Error(`${varName} is not defined in the environment variables.`);
});

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  LOG_FILE_PATH: process.env.LOG_FILE_PATH,
  LOG_LEVEL: process.env.LOG_LEVEL,
};
