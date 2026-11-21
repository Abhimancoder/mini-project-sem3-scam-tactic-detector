const { tokenizeSentences } = require('./sentenceTokenizer');
const { detectUrgency } = require('../detectors/urgencyDetector');
const { detectAuthorityImpersonation } = require('../detectors/authorityDetector');
const { detectGuaranteedReturns } = require('../detectors/guaranteedReturnsDetector');
const { detectSocialProof } = require('../detectors/socialProofDetector');
const { detectEscalation } = require('../detectors/escalationDetector');
const { assessRisk } = require('../riskAssessmentService');

/**
 * Core NLP Detection Engine
 * Coordinates sentence tokenization, multi-tactic evaluation,
 * evidence aggregation, offset mapping, and risk assessment.
 */

function analyzeConversation(conversationText) {
  if (!conversationText || typeof conversationText !== 'string' || conversationText.trim().length === 0) {
    throw new Error('Conversation text is required for analysis.');
  }

  const rawText = conversationText.trim();
  const sentences = tokenizeSentences(rawText);

  // Run all 5 tactic detectors independently
  const urgencyResult = detectUrgency(sentences);
  const authorityResult = detectAuthorityImpersonation(sentences);
  const guaranteedReturnsResult = detectGuaranteedReturns(sentences);
  const socialProofResult = detectSocialProof(sentences);
  const escalationResult = detectEscalation(sentences);

  const tactics = [
    urgencyResult,
    authorityResult,
    guaranteedReturnsResult,
    socialProofResult,
    escalationResult
  ];

  const detectedTactics = tactics.filter(t => t.detected);

  // Compute text highlights with offsets for the UI
  const rawHighlights = [];
  for (const tactic of detectedTactics) {
    for (const phrase of tactic.evidencePhrases) {
      if (!phrase || typeof phrase !== 'string' || phrase.trim().length === 0) {
        continue;
      }
      let startIndex = 0;
      const lowerRaw = rawText.toLowerCase();
      const lowerPhrase = phrase.toLowerCase();

      while ((startIndex = lowerRaw.indexOf(lowerPhrase, startIndex)) !== -1) {
        rawHighlights.push({
          tacticId: tactic.id,
          tacticName: tactic.name,
          category: tactic.category,
          phrase,
          start: startIndex,
          end: startIndex + phrase.length
        });
        startIndex += Math.max(1, phrase.length);
      }
    }
  }

  // Sort highlights by character offset start, then by longest phrase descending
  rawHighlights.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));

  // Merge overlapping intervals cleanly to guarantee non-overlapping tokens for the UI
  const highlights = [];
  let lastEnd = -1;
  for (const hl of rawHighlights) {
    if (hl.start >= lastEnd) {
      highlights.push(hl);
      lastEnd = hl.end;
    } else if (hl.end > lastEnd) {
      highlights.push({
        ...hl,
        start: lastEnd
      });
      lastEnd = hl.end;
    }
  }

  // Generate risk assessment
  const riskAssessment = assessRisk(tactics, sentences.length);

  return {
    meta: {
      analyzedAt: new Date().toISOString(),
      characterCount: rawText.length,
      sentenceCount: sentences.length,
      totalTacticsEvaluated: tactics.length,
      detectedTacticsCount: detectedTactics.length
    },
    detectedTacticsCount: detectedTactics.length,
    riskAssessment,
    tactics,
    detectedTactics,
    highlights,
    analyzedText: rawText
  };
}

module.exports = {
  analyzeConversation
};
