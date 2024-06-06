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
  "MSG_QUEUE_URL",
  "EXCHANGE_NAME",
  "QUEUE_NAME",
  "DISCUSSION_BINDING_KEY",
  "INTERACTION_BINDING_KEY"
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
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  QUEUE_NAME: process.env.QUEUE_NAME,
  DISCUSSION_BINDING_KEY: process.env.DISCUSSION_BINDING_KEY,
  INTERACTION_BINDING_KEY: process.env.INTERACTION_BINDING_KEY,
};
