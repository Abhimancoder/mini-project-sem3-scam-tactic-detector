const { isNegated } = require('../nlp/negationHandler');
const { evaluateContext } = require('../nlp/contextFilter');

/**
 * Tactic 3: Guaranteed Returns & Zero-Risk Claims Detector
 * Identifies promises of risk-free profits, unrealistic ROI, and absolute financial certainties.
 */

const GUARANTEED_PATTERNS = [
  {
    regex: /\b(?:100%|completely|fully)?\s*(?:guaranteed|assured|risk[- ]free|zero[- ]risk|no[- ]risk|foolproof)\s*(?:returns?|profit|income|payout|gains?|money)?\b/i,
    weight: 0.95,
    cue: 'Guaranteed or zero-risk claim'
  },
  {
    regex: /\b(?:double|triple|10x|100x)\s+(?:your\s+)?(?:money|investment|funds|deposit)\s+(?:in|within)\s+(?:\d+\s+(?:hours?|days?|weeks?|months?)|24\s*hours|48\s*hours|overnight)\b/i,
    weight: 0.95,
    cue: 'Astronomical / Unrealistic return timeline'
  },
  {
    regex: /\b(?:\d{1,3}%\s+(?:daily|per\s+day|every\s+day|weekly|per\s+week|hourly))\b/i,
    weight: 0.90,
    cue: 'Unsustainable periodic return promise'
  },
  {
    regex: /\b(?:never\s+loses?|cannot\s+lose|can'?t\s+lose|impossible\s+to\s+lose|loss[- ]proof)\s*(?:money|funds|capital)?\b/i,
    weight: 0.90,
    cue: 'Impossible loss-immunity claim'
  },
  {
    regex: /\b(?:sure[- ]shot|fixed\s+profit\s+every\s+day|passive\s+guaranteed\s+income\s+of\s+[$₹€£]\d+)\b/i,
    weight: 0.85,
    cue: 'Fixed profit assurance'
  },
  {
    regex: /\b(?:turn\s+[$₹€£]?\d+\s+into\s+[$₹€£]?\d+\s+(?:in\s+\d+|overnight|today|instantly|in\s+24\s*hours))\b/i,
    weight: 0.90,
    cue: 'Instant wealth multiplication scheme'
  },
  {
    regex: /\b(?:guaranteed\s+profit\s+of\s+\d+%\s+(?:daily|weekly|monthly))\b/i,
    weight: 0.95,
    cue: 'Guaranteed high periodic yield'
  }
];

function detectGuaranteedReturns(sentences) {
  const matches = [];
  const matchedPhrases = new Set();
  const matchedSentences = [];
  let totalScore = 0;

  for (const sObj of sentences) {
    const text = sObj.text;
    const { isLegitimateDisclaimer, isEducational } = evaluateContext(text);
    if (isLegitimateDisclaimer || isEducational) continue;

    for (const rule of GUARANTEED_PATTERNS) {
      const match = text.match(rule.regex);
      if (match) {
        const phrase = match[0];
        // Rigorous negation check: "Returns are NOT guaranteed" or "Never believe zero risk"
        if (!isNegated(text, phrase)) {
          matchedPhrases.add(phrase);
          matches.push({
            cue: rule.cue,
            phrase,
            weight: rule.weight,
            sentenceIndex: sObj.index,
            sentenceText: text
          });
          totalScore += rule.weight * 40;
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
  } else if (normalizedScore >= 35 || matches.length === 1) {
    confidence = 'MEDIUM';
  }

  return {
    id: 'guaranteed_returns',
    name: 'Guaranteed Returns & Unrealistic Profits',
    category: 'guaranteed_returns',
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
      ? `The conversation promises guaranteed or unrealistic financial returns (${Array.from(matchedPhrases).map(p => `"${p}"`).join(', ')}). In real financial markets, risk and return are inseparable; absolute guarantees are universally recognized markers of Ponzi and fraudulent schemes.`
      : 'No promises of risk-free profits or unrealistic returns detected.',
    warning: detected
      ? 'No legitimate financial asset can guarantee high or risk-free returns. Higher promised returns always carry higher risk of total capital loss.'
      : null,
    recommendedAction: detected
      ? 'Do not deposit funds into schemes promising risk-free or guaranteed multiples. Request audited financial statements and regulatory registration documents.'
      : 'Maintain realistic return expectations aligned with regulated market benchmarks.'
  };
}

module.exports = {
  detectGuaranteedReturns,
  GUARANTEED_PATTERNS
};
