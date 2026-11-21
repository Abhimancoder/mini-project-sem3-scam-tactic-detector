const { detectAuthorityImpersonation } = require('../../src/services/detectors/authorityDetector');
const { tokenizeSentences } = require('../../src/services/nlp/sentenceTokenizer');

describe('Tactic 2: Authority Impersonation Detector', () => {
  test('flags fraudulent claim of SEBI/regulatory affiliation with payment demands', () => {
    const text = 'I am a registered agent from SEBI compliance department. Send clearance fee to this official wallet immediately.';
    const sentences = tokenizeSentences(text);
    const result = detectAuthorityImpersonation(sentences);

    expect(result.detected).toBe(true);
    expect(result.evidencePhrases.length).toBeGreaterThanOrEqual(1);
    expect(result.warning).toContain('SEBI');
  });

  test('flags claims of institutional backing without permission', () => {
    const text = 'Our crypto algorithm is directly backed by Barclays and guaranteed by the central bank.';
    const sentences = tokenizeSentences(text);
    const result = detectAuthorityImpersonation(sentences);

    expect(result.detected).toBe(true);
    expect(result.confidence).toBe('HIGH');
  });

  test('CRITICAL RULE: does NOT label legitimate authority references as impersonation', () => {
    const text = 'SEBI mandates that all mutual fund schemes disclose risk-o-meter ratings. Consult a registered advisor.';
    const sentences = tokenizeSentences(text);
    const result = detectAuthorityImpersonation(sentences);

    expect(result.detected).toBe(false);
    expect(result.score).toBe(0);
  });

  test('does not flag normal banking mentions', () => {
    const text = 'I maintain a checking account at JPMorgan and pay my bills online.';
    const sentences = tokenizeSentences(text);
    const result = detectAuthorityImpersonation(sentences);

    expect(result.detected).toBe(false);
  });
});
