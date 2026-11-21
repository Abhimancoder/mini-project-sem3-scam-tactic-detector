const config = require('../config/environment');

/**
 * Input Validation & Sanitization Middleware
 * Guarantees that conversation text is valid string, enforces maximum size limits,
 * strips dangerous control characters, and blocks non-textual payload attacks.
 */

function validateConversationInput(req, res, next) {
  const { conversation } = req.body;

  if (conversation === undefined || conversation === null) {
    return res.status(400).json({
      success: false,
      error: 'Missing required field: "conversation" must be provided in request body.'
    });
  }

  if (typeof conversation !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Invalid input type: "conversation" must be a string.'
    });
  }

  const trimmed = conversation.trim();

  if (trimmed.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Input text cannot be empty or contain only whitespace.'
    });
  }

  if (trimmed.length > config.maxInputLength) {
    return res.status(413).json({
      success: false,
      error: `Input payload too large. Maximum allowed length is ${config.maxInputLength} characters (received ${trimmed.length}).`
    });
  }

  // Sanitize: remove null bytes or dangerous control codes, preserve normal punctuation & emojis
  // Never execute user input as code (prevent command/eval injections)
  req.sanitizedConversation = trimmed.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');

  next();
}

module.exports = {
  validateConversationInput
};
