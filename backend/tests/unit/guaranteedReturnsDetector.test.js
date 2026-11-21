const { detectGuaranteedReturns } = require('../../src/services/detectors/guaranteedReturnsDetector');
const { tokenizeSentences } = require('../../src/services/nlp/sentenceTokenizer');

describe('Tactic 3: Guaranteed Returns Detector', () => {
  test('flags promises of 100% guaranteed returns and zero risk', () => {
    const text = 'We promise 100% guaranteed profit of 25% daily return with zero risk to your capital.';
    const sentences = tokenizeSentences(text);
    const result = detectGuaranteedReturns(sentences);

    expect(result.detected).toBe(true);
    expect(result.confidence).toBe('HIGH');
    expect(result.evidencePhrases).toEqual(expect.arrayContaining(['100% guaranteed profit', '25% daily']));
  });

  test('flags doubling money claims in short timeframes', () => {
    const text = 'You will double your money in 48 hours without risk.';
    const sentences = tokenizeSentences(text);
    const result = detectGuaranteedReturns(sentences);

    expect(result.detected).toBe(true);
    expect(result.score).toBeGreaterThanOrEqual(40);
  });

  test('suppresses detection when returns are explicitly stated as not guaranteed', () => {
    const text = 'Stock market returns are never guaranteed, and you can lose capital.';
    const sentences = tokenizeSentences(text);
    const result = detectGuaranteedReturns(sentences);

    expect(result.detected).toBe(false);
  });

  test('does not flag normal historical performance reviews', () => {
    const text = 'The index historically gained 10% annualized over the last 30 years.';
    const sentences = tokenizeSentences(text);
    const result = detectGuaranteedReturns(sentences);

    expect(result.detected).toBe(false);
  });
});
