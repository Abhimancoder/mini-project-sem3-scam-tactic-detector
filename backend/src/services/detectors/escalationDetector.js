const { isNegated } = require('../nlp/negationHandler');
const { evaluateContext } = require('../nlp/contextFilter');

/**
 * Tactic 5: Escalation & Sunk-Cost Extortion Detector
 * Identifies attempts to extract additional capital after initial deposits,
 * including withdrawal fees, tax unlocking scams, and tiered commitments.
 */

const ESCALATION_PATTERNS = [
  {
    regex: /\b(?:deposit|transfer|send|add|pay)\s+(?:another|more|additional|extra)\s+[$₹€£]?\d+/i,
    weight: 0.95,
    cue: 'Subsequent capital injection demand'
  },
  {
    regex: /\b(?:to\s+(?:unlock|release|unfreeze|access|withdraw)\s+(?:your\s+)?(?:profits?|funds?|balance|money|account))\b/i,
    weight: 0.95,
    cue: 'Conditional withdrawal extortion'
  },
  {
    regex: /\b(?:pay\s+(?:a|the)?\s*(?:\d+%\s+)?(?:tax|withdrawal\s+fee|clearance\s+fee|gas\s+fee|liquidity\s+fee|processing\s+charge)\s+(?:first|before|upfront))\b/i,
    weight: 0.95,
    cue: 'Advance-fee withdrawal trap'
  },
  {
    regex: /\b(?:upgrade\s+(?:to\s+)?(?:vip|tier\s*\d|gold|platinum|diamond)\s+(?:to|for)\s+(?:withdraw|higher\s+returns))\b/i,
    weight: 0.85,
    cue: 'Tiered escalation barrier'
  },
  {
    regex: /\b(?:increase\s+(?:your\s+)?(?:investment|deposit|stake)\s+to\s+(?:recover|maximize|double))\b/i,
    weight: 0.85,
    cue: 'Sunk-cost recovery pressure'
  },
  {
    regex: /\b(?:account\s+(?:is\s+)?(?:frozen|locked|restricted)\s*(?:until|unless)\s+(?:you\s+)?(?:deposit|pay))\b/i,
    weight: 0.90,
    cue: 'Account freeze hostage-taking'
  }
];

function detectEscalation(sentences) {
  const matches = [];
  const matchedPhrases = new Set();
  const matchedSentences = [];
  let totalScore = 0;

  for (const sObj of sentences) {
    const text = sObj.text;
    const { isLegitimateDisclaimer } = evaluateContext(text);
    if (isLegitimateDisclaimer) continue;

    for (const rule of ESCALATION_PATTERNS) {
      const match = text.match(rule.regex);
      if (match) {
        const phrase = match[0];
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

  // Cross-sentence check: If text mentions "withdraw" and "fee/tax/deposit more" in consecutive sentences
  if (matches.length === 0 && sentences.length >= 2) {
    const fullText = sentences.map(s => s.text).join(' ');
    const hasWithdrawalIntent = /\b(?:withdraw|cash\s*out|take\s*out\s*my\s*money)\b/i.test(fullText);
    const hasFeeRequirement = /\b(?:need\s+to\s+pay|must\s+deposit|transfer\s+fee|clearance\s+charge|tax\s+must\s+be\s+paid)\b/i.test(fullText);

    if (hasWithdrawalIntent && hasFeeRequirement) {
      matchedPhrases.add('Conditional payment requirement to allow withdrawal');
      totalScore = 70;
      matches.push({
        cue: 'Withdrawal conditioned on advance payment',
        phrase: 'Requirement to pay fees prior to withdrawal',
        sentenceIndex: 0,
        sentenceText: fullText.substring(0, 100) + '...'
      });
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
    id: 'escalation',
    name: 'Escalation & Sunk-Cost Extortion',
    category: 'escalation',
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
      ? `The conversation exhibits escalation and advance-fee entrapment (${Array.from(matchedPhrases).map(p => `"${p}"`).join(', ')}). A classic scam mechanic where victims are forced to pay fees, taxes, or upgrades to release their own funds or "recover" previous deposits.`
      : 'No escalation pressure or advance-fee entrapment tactics detected.',
    warning: detected
      ? 'Legitimate brokers and exchanges deduct applicable taxes or fees directly from your balance; they NEVER demand upfront payments or additional deposits to release funds.'
      : null,
    recommendedAction: detected
      ? 'STOP depositing immediately. Under no circumstances pay "clearance fees" or "taxes" to unlock funds. Report the transaction to cybercrime authorities and your bank immediately.'
      : 'Ensure you understand normal fee structures before engaging in financial platforms.'
  };
}

module.exports = {
  detectEscalation,
  ESCALATION_PATTERNS
};
