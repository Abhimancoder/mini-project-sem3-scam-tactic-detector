/**
 * Context Filter & Legitimate Discussion Validator
 * Distinguishes genuine financial disclosures, consumer alerts, and balanced
 * advisory discussions from predatory manipulation tactics.
 */

const LEGITIMATE_DISCLAIMER_PATTERNS = [
  /subject to market risk/i,
  /past performance is not indicative of future results/i,
  /read all scheme related documents/i,
  /consult (?:your|a) certified financial advisor/i,
  /capital is at risk/i,
  /investments may lose value/i,
  /diversification does not guarantee/i,
  /do your own research/i,
  /conduct thorough due diligence/i,
  /never share your (?:otp|password|pin|private key)/i,
  /report (?:suspicious|fraudulent) activity/i
];

const EDUCATIONAL_PATTERNS = [
  /how (?:to spot|to identify|scammers operate|scams work)/i,
  /red flags? to look for/i,
  /common tactics (?:used by|include)/i,
  /scam alert/i,
  /investor awareness/i,
  /educational purposes only/i
];

/**
 * Evaluates whether text matches standard regulatory disclaimers or educational context
 * @param {string} text - Sentence or document text
 * @returns {object} { isLegitimateDisclaimer: boolean, isEducational: boolean }
 */
function evaluateContext(text) {
  if (!text) return { isLegitimateDisclaimer: false, isEducational: false };

  const isLegitimateDisclaimer = LEGITIMATE_DISCLAIMER_PATTERNS.some(regex => regex.test(text));
  const isEducational = EDUCATIONAL_PATTERNS.some(regex => regex.test(text));

  return {
    isLegitimateDisclaimer,
    isEducational
  };
}

module.exports = {
  evaluateContext,
  LEGITIMATE_DISCLAIMER_PATTERNS,
  EDUCATIONAL_PATTERNS
};
