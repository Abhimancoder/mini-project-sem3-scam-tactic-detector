/**
 * Negation & Disclaimer Detection Engine
 * Determines if matched trigger phrases are negated or inverted in meaning.
 * For example:
 * - "Returns are not guaranteed" -> Negated (Legitimate disclaimer)
 * - "There is no rush to invest" -> Negated (No urgency)
 * - "Never trust claims of guaranteed profits" -> Educational / Cautionary
 */

const NEGATION_PATTERNS = [
  /\b(?:not|n't|never|no|none|neither|nor|without|hardly|scarcely|seldom)\b/i,
  /\b(?:cannot|can't|won't|don't|doesn't|didn't|isn't|aren't|wasn't|weren't)\b/i,
  /\b(?:do not|does not|did not|is not|are not|was not|were not|cannot)\b/i,
  /\b(?:beware of|caution|warning|avoid|false|fake|myth|untrue)\b/i
];

/**
 * Checks if a matched phrase within a sentence context is governed by negation
 * @param {string} sentence - Full sentence containing the match
 * @param {string} phrase - Subphrase or pattern matched
 * @returns {boolean} True if phrase is negated
 */
function isNegated(sentence, phrase) {
  if (!sentence || !phrase) return false;

  const lowerSentence = sentence.toLowerCase();
  const lowerPhrase = phrase.toLowerCase();
  const phraseIndex = lowerSentence.indexOf(lowerPhrase);

  if (phraseIndex === -1) return false;

  // Window of up to 6 words / 45 characters preceding the phrase
  const prefix = lowerSentence.substring(Math.max(0, phraseIndex - 45), phraseIndex);

  for (const pattern of NEGATION_PATTERNS) {
    if (pattern.test(prefix)) {
      return true;
    }
  }

  // Also check immediately following words (e.g., "guaranteed? No way.", "guaranteed is impossible")
  const suffix = lowerSentence.substring(phraseIndex + phrase.length, Math.min(lowerSentence.length, phraseIndex + phrase.length + 30));
  if (/\b(?:is a scam|is false|is fake|is impossible|is misleading|is dangerous)\b/i.test(suffix)) {
    return true;
  }

  return false;
}

module.exports = {
  isNegated,
  NEGATION_PATTERNS
};
