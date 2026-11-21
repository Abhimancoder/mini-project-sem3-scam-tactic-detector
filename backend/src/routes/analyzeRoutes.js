const express = require('express');
const router = express.Router();
const { handleAnalyze } = require('../controllers/analyzeController');
const { validateConversationInput } = require('../middlewares/validateInput');

/**
 * @route   POST /api/analyze
 * @desc    Analyze conversation for psychological scam tactics
 * @access  Public
 */
router.post('/', validateConversationInput, handleAnalyze);

module.exports = router;
