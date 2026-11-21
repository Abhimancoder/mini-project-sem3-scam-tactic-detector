const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from backend/.env first, then root .env if present
const backendEnv = path.resolve(__dirname, '../../.env');
const rootEnv = path.resolve(__dirname, '../../../.env');

dotenv.config({ path: backendEnv });
dotenv.config({ path: rootEnv });

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  maxInputLength: parseInt(process.env.MAX_INPUT_LENGTH || '15000', 10),
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 mins
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  version: '1.0.0'
};

module.exports = config;
