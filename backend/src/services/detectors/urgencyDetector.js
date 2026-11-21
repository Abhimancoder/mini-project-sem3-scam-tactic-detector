const { isNegated } = require('../nlp/negationHandler');
const { evaluateContext } = require('../nlp/contextFilter');

/**
 * Tactic 1: Urgency & Artificial Time Pressure Detector
 * Flags artificial urgency designed to bypass critical thinking and force rushed financial commitments.
 */

const URGENCY_PATTERNS = [
  {
    regex: /\b(?:act\s+(?:now|fast|immediately|today)|hurry\s+up|immediate\s+(?:deposit|transfer|payment|action|investment))\b/i,
    weight: 0.85,
    cue: 'Immediate action demand'
  },
  {
    regex: /\b(?:limited\s+(?:time(?:\s+only)?|slots?|seats?|spots?|availability|offer|window))\b/i,
    weight: 0.80,
    cue: 'Artificial scarcity / Limited availability'
  },
  {
    regex: /\b(?:only\s+\d+\s+(?:hours?|minutes?|days?|spots?|slots?)\s+(?:left|remaining))\b/i,
    weight: 0.90,
    cue: 'Countdown countdown pressure'
  },
  {
    regex: /\b(?:expires?\s+(?:in\s+\d+|today|tonight|within|soon|at midnight))\b/i,
    weight: 0.85,
    cue: 'Expiring opportunity pretext'
  },
  {
    regex: /\b(?:before\s+it(?:'?s)?\s+too\s+late|don'?t\s+miss\s+out|once\s+in\s+a\s+lifetime|never\s+again)\b/i,
    weight: 0.75,
    cue: 'Fear of missing out (FOMO) inducement'
  },
  {
    regex: /\b(?:send\s+(?:money|funds|crypto|bitcoin|usdt)\s+(?:now|asap|within\s+\d+\s+(?:minutes?|hours?)))\b/i,
    weight: 0.95,
    cue: 'Immediate capital transfer solicitation'
  },
  {
    regex: /\b(?:window\s+is\s+closing|last\s+chance|final\s+call|price\s+will\s+double\s+tomorrow)\b/i,
    weight: 0.85,
    cue: 'Arbitrary deadline imposition'
  }
];

function detectUrgency(sentences) {
  const matches = [];
  let totalScore = 0;
  const matchedPhrases = new Set();
  const matchedSentences = [];

  for (const sObj of sentences) {
    const text = sObj.text;
    const { isLegitimateDisclaimer } = evaluateContext(text);
    if (isLegitimateDisclaimer) continue;

    for (const rule of URGENCY_PATTERNS) {
      const match = text.match(rule.regex);
      if (match) {
        const phrase = match[0];
        // Ensure this phrase is not negated (e.g. "Take your time, there is no hurry")
        if (!isNegated(text, phrase)) {
          matchedPhrases.add(phrase);
          matches.push({
            cue: rule.cue,
            phrase,
            weight: rule.weight,
            sentenceIndex: sObj.index,
            sentenceText: text,
            start: sObj.start,
            end: sObj.end
          });
          totalScore += rule.weight * 35;
          if (!matchedSentences.includes(text)) {
            matchedSentences.push(text);
          }
        }
      }
    }
  }

  const detected = matches.length > 0;
  const normalizedScore = Math.min(100, Math.round(totalScore));
  
  let confidence = 'LOW';
  if (normalizedScore >= 70 || matches.length >= 2) {
    confidence = 'HIGH';
  } else if (normalizedScore >= 40 || matches.length === 1) {
    confidence = 'MEDIUM';
  }

  return {
    id: 'urgency',
    name: 'Urgency & Artificial Time Pressure',
    category: 'urgency',
    detected,
    confidence: detected ? confidence : 'NONE',
    score: detected ? normalizedScore : 0,
    evidencePhrases: Array.from(matchedPhrases),
    matchedSentences,
    details: matches.map(m => ({
      cue: m.cue,
      phrase: m.phrase,
      sentence: m.sentenceText
    })),
    explanation: detected
      ? `The conversation exhibits artificial urgency (${Array.from(matchedPhrases).map(p => `"${p}"`).join(', ')}). Scammers use strict deadlines and artificial scarcity to prevent victims from conducting independent due diligence.`
      : 'No artificial time pressure or predatory urgency tactics detected.',
    warning: detected
      ? 'Legitimate investment opportunities never require instantaneous capital transfers or expire in minutes. Never rush a financial decision.'
      : null,
    recommendedAction: detected
      ? 'Pause all communications immediately. Legitimate institutions will always allow time to review contracts, prospectuses, and verify credentials.'
      : 'Continue to exercise standard financial vigilance.'
  };
}

module.exports = {
  detectUrgency,
  URGENCY_PATTERNS
};
