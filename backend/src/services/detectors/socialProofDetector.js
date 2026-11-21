const { isNegated } = require('../nlp/negationHandler');
const { evaluateContext } = require('../nlp/contextFilter');

/**
 * Tactic 4: Social Proof & Herd Pressure Detector
 * Identifies attempts to engineer artificial trust through fake community testimonials,
 * alleged member counts, and fabricated payment proofs.
 */

const SOCIAL_PROOF_PATTERNS = [
  {
    regex: /\b(?:over\s+)?(?:hundreds|thousands|[\d,]+[kK]?)\s+(?:of\s+)?(?:members?|investors?|people|users?|traders?)\s+(?:have\s+already|already\s+have|have|already)?\s*(?:joined|earning|invested|made\s+money|withdrawn|profited|active)\b/i,
    weight: 0.90,
    cue: 'Fabricated crowd participation / herd endorsement'
  },
  {
    regex: /\b(?:see\s+(?:the\s+)?(?:proofs?|screenshots?|receipts?|payout\s+proofs?|withdrawal\s+proofs?)|proof\s+of\s+payment|proofs\s+of\s+payment|withdrawal\s+proofs?)\b/i,
    weight: 0.85,
    cue: 'Testimonial / Withdrawal screenshot baiting'
  },
  {
    regex: /\b(?:our\s+(?:telegram|whatsapp|vip|exclusive)\s+(?:group|channel|community)\s+(?:is\s+booming|has\s+\d+|is\s+making\s+millions))\b/i,
    weight: 0.85,
    cue: 'Private community peer pressure'
  },
  {
    regex: /\b(?:everyone\s+(?:is\s+(?:investing|joining|making\s+money|doing\s+it)|in\s+(?:our|my|the)\s+group)|all\s+smart\s+investors\s+are)\b/i,
    weight: 0.80,
    cue: 'Consensus manufacturing'
  },
  {
    regex: /\b(?:check\s+what\s+(?:our\s+clients?|members?|investors?)\s+(?:say|are\s+saying)|success\s+stories\s+of\s+our\s+members)\b/i,
    weight: 0.75,
    cue: 'Curated success showcase'
  },
  {
    regex: /\b(?:even\s+(?:housewives|students|beginners)\s+are\s+making\s+[$₹€£]?\d+)\b/i,
    weight: 0.85,
    cue: 'Relatable demographic targeting'
  },
  {
    regex: /\b(?:getting\s+rich|becoming\s+millionaires?\s+with\s+us)\b/i,
    weight: 0.80,
    cue: 'Peer wealth mimicry'
  }
];

function detectSocialProof(sentences) {
  const matches = [];
  const matchedPhrases = new Set();
  const matchedSentences = [];
  let totalScore = 0;

  for (const sObj of sentences) {
    const text = sObj.text;
    const { isLegitimateDisclaimer, isEducational } = evaluateContext(text);
    if (isLegitimateDisclaimer || isEducational) continue;

    for (const rule of SOCIAL_PROOF_PATTERNS) {
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
          totalScore += rule.weight * 45;
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
  if (normalizedScore >= 60 || matches.length >= 2) {
    confidence = 'HIGH';
  } else if (normalizedScore >= 35 || matches.length === 1) {
    confidence = 'MEDIUM';
  }

  return {
    id: 'social_proof',
    name: 'Social Proof & Herd Manipulation',
    category: 'social_proof',
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
      ? `The conversation uses social proof and herd pressure (${Array.from(matchedPhrases).map(p => `"${p}"`).join(', ')}). Scammers use fake screenshots, bot-filled chat channels, and fabricated testimonials to manufacture an illusion of widespread success and safety.`
      : 'No artificial social proof or herd manipulation tactics detected.',
    warning: detected
      ? 'Payment screenshots, Telegram groups, and online testimonials are easily falsified with editing tools and coordinated bot accounts.'
      : null,
    recommendedAction: detected
      ? 'Disregard group chat screenshots and testimonials. Independently search for company reviews on trusted fraud-alert databases and regulatory registers.'
      : 'Evaluate investments based on fundamentals rather than community hype.'
  };
}

module.exports = {
  detectSocialProof,
  SOCIAL_PROOF_PATTERNS
};
