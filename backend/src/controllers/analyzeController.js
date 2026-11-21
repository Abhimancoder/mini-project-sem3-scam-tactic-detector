const { analyzeConversation } = require('../services/nlp/nlpEngine');

/**
 * Controller for Conversation Analysis Endpoint
 * POST /api/analyze
 */

async function handleAnalyze(req, res, next) {
  try {
    const textToAnalyze = req.sanitizedConversation;
    const analysisResult = analyzeConversation(textToAnalyze);

    return res.status(200).json({
      success: true,
      data: analysisResult
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  handleAnalyze
};
