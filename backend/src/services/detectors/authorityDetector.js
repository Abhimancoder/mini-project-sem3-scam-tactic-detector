const { isNegated } = require('../nlp/negationHandler');
const { evaluateContext } = require('../nlp/contextFilter');

/**
 * Tactic 2: Authority Impersonation Detector
 * Detects fraudulent claims of institutional backing, regulatory authority,
 * or credentials used to intimidate or win false credibility.
 *
 * CRITICAL REQUIREMENT:
 * "Do not label legitimate authority references as impersonation without supporting evidence."
 */

const AUTHORITY_ENTITIES = [
  /\b(?:SEBI|SEC|RBI|FINRA|FCA|CFTC|FDIC|IRS|FBI|Interpol|Federal\s+Reserve|World\s+Bank|IMF)\b/i,
  /\b(?:Goldman\s+Sachs|JPMorgan|Barclays|Morgan\s+Stanley|Binance(?:\s+Support)?|Coinbase(?:\s+Official)?|BlackRock|Citigroup)\b/i,
  /\b(?:registered\s+(?:broker|advisor|officer|agent|manager)|licensed\s+(?:firm|entity|specialist)|financial\s+regulator)\b/i,
  /\b(?:cyber\s+crime\s+(?:department|cell|unit)|anti-fraud\s+division|compliance\s+(?:officer|department))\b/i
];

const IMPERSONATION_INDICATORS = [
  {
    regex: /\b(?:I\s+am\s+(?:a|an|the)|speaking\s+as\s+(?:a|the)|my\s+name\s+is\s+.+and\s+I\s+work\s+(?:at|for|with)|I\s+work\s+(?:for|at|with)|agent\s+from|officer\s+from|analyst\s+from)\b/i,
    weight: 0.85,
    cue: 'Personal authority persona claim'
  },
  {
    regex: /\b(?:direct(?:ly)?\s+)?(?:approved|endorsed|backed|guaranteed|licensed|certified)\s+by\s+(?:the\s+)?(?:government|RBI|SEBI|SEC|central\s+bank|federal\s+reserve|Barclays|Goldman|JPMorgan|Binance)\b/i,
    weight: 0.90,
    cue: 'Fictitious regulatory or institutional endorsement'
  },
  {
    regex: /\b(?:official\s+(?:compliance|clearance|security|clearance\s+letter|stamp|certificate\s+of\s+deposit|representative|agent))\b/i,
    weight: 0.75,
    cue: 'Fabricated official certification / title'
  },
  {
    regex: /\b(?:under\s+orders?\s+from|by\s+mandate\s+of|fines?\s+or\s+arrest|police\s+case|account\s+(?:is\s+)?frozen\s+(?:by|under|by\s+court|by\s+rbi|by\s+sec)?)\b/i,
    weight: 0.90,
    cue: 'Coercive institutional intimidation'
  },
  {
    regex: /\b(?:send|deposit|transfer)\s+(?:fee|tax|clearance|deposit|crypto)\s+to\s+(?:my|our|this)\s+(?:official\s+)?(?:account|wallet|upi|agent)\b/i,
    weight: 0.95,
    cue: 'Authority-driven fund extraction'
  },
  {
    regex: /\b(?:insider\s+(?:access|channel|source|team|information)|exclusive\s+(?:regulatory|institutional)\s+leak)\b/i,
    weight: 0.85,
    cue: 'Fictitious insider privilege claim'
  }
];

function detectAuthorityImpersonation(sentences) {
  const matches = [];
  const matchedPhrases = new Set();
  const matchedSentences = [];
  let totalScore = 0;

  for (const sObj of sentences) {
    const text = sObj.text;
    const { isLegitimateDisclaimer, isEducational } = evaluateContext(text);
    if (isLegitimateDisclaimer || isEducational) continue;

    // First check if an authority entity is mentioned
    const entityMatch = AUTHORITY_ENTITIES.find(pattern => pattern.test(text));

    // Check for impersonation / coercive pretexts
    for (const indicator of IMPERSONATION_INDICATORS) {
      const indMatch = text.match(indicator.regex);
      if (indMatch) {
        const phrase = indMatch[0];
        if (!isNegated(text, phrase)) {
          // If entity is present in sentence OR indicator itself references government/regulator, flag it
          const hasEntity = entityMatch !== undefined || /government|RBI|SEBI|SEC|police|officer|official|Binance|Barclays|FBI/i.test(phrase);
          if (hasEntity) {
            matchedPhrases.add(phrase);
            matches.push({
              cue: indicator.cue,
              phrase,
              entity: entityMatch ? text.match(entityMatch)[0] : 'Regulatory/Institutional authority',
              weight: indicator.weight,
              sentenceIndex: sObj.index,
              sentenceText: text
            });
            totalScore += indicator.weight * 40;
            if (!matchedSentences.includes(text)) {
              matchedSentences.push(text);
            }
          }
        }
      }
    }
  }

  // Cross-sentence check: If text mentions authority entity AND claims exclusive insider access or sends private payment instructions
  if (matches.length === 0) {
    const fullText = sentences.map(s => s.text).join(' ');
    const hasAuthority = AUTHORITY_ENTITIES.some(r => r.test(fullText));
    const hasDirectPaymentSolicitation = /\b(?:pay|send|deposit|transfer)\s+(?:money|funds|crypto|fee|tax)\b/i.test(fullText);
    const hasUnverifiedAffiliation = /\b(?:I\s+represent|on\s+behalf\s+of|working\s+with|our\s+trading\s+desk\s+at)\b/i.test(fullText);

    if (hasAuthority && hasUnverifiedAffiliation && hasDirectPaymentSolicitation) {
      const cue = 'Authority name invoked in conjunction with personal solicitation';
      matchedPhrases.add('Institutional authority invocation with payment solicitation');
      totalScore = 65;
      matches.push({
        cue,
        phrase: 'Authority invocation with payment solicitation',
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
  } else if (normalizedScore >= 35 || matches.length === 1) {
    confidence = 'MEDIUM';
  }

  return {
    id: 'authority',
    name: 'Authority Impersonation & Fictitious Backing',
    category: 'authority',
    detected,
    confidence: detected ? confidence : 'NONE',
    score: detected ? normalizedScore : 0,
    evidencePhrases: Array.from(matchedPhrases),
    matchedSentences,
    details: matches.map(m => ({
      cue: m.cue,
      phrase: m.phrase,
      entity: m.entity || 'Authority',
      sentence: m.sentenceText
    })),
    explanation: detected
      ? `The communication claims official affiliation or backing (${Array.from(matchedPhrases).map(p => `"${p}"`).join(', ')}). Fraudsters frequently claim to be registered brokers, regulators, or bank representatives to lower defenses and demand compliance.`
      : 'No authority impersonation or fraudulent regulatory endorsements detected.',
    warning: detected
      ? 'Government agencies, regulators (like SEBI/SEC/RBI), and legitimate investment banks NEVER solicit investments, collect taxes, or demand crypto payments over private messaging apps.'
      : null,
    recommendedAction: detected
      ? 'Verify any advisor on the regulator\'s official public portal (e.g. SEBI Intermediaries registry or FINRA BrokerCheck). Never transfer money to accounts provided in chat apps.'
      : 'Always confirm the registration status of any financial intermediary.'
  };
}

module.exports = {
  detectAuthorityImpersonation,
  AUTHORITY_ENTITIES,
  IMPERSONATION_INDICATORS
};
