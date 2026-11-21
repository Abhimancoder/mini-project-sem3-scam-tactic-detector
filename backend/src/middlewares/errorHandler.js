const config = require('../config/environment');

/**
 * Centralized Error Handling Middleware
 * Prevents stack trace leakage in production while providing informative errors.
 */

function errorHandler(err, req, res, next) {
  // If headers already sent, delegate to default Express handler
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || err.status || 500;
  const isProduction = config.env === 'production';

  const response = {
    success: false,
    error: err.message || 'An unexpected internal server error occurred.',
    statusCode
  };

  if (!isProduction && err.stack) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: `Endpoint not found: ${req.method} ${req.originalUrl}`
  });
}

module.exports = {
  errorHandler,
  notFoundHandler
};
