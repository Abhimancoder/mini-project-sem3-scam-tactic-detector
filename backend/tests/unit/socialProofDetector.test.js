const { detectSocialProof } = require('../../src/services/detectors/socialProofDetector');
const { tokenizeSentences } = require('../../src/services/nlp/sentenceTokenizer');

describe('Tactic 4: Social Proof & Herd Pressure Detector', () => {
  test('flags community member counts and withdrawal screenshots', () => {
    const text = 'Over 10,000 members have already joined our Telegram community. See the withdrawal proofs attached!';
    const sentences = tokenizeSentences(text);
    const result = detectSocialProof(sentences);

    expect(result.detected).toBe(true);
    expect(result.confidence).toBe('HIGH');
    expect(result.evidencePhrases.length).toBeGreaterThanOrEqual(1);
  });

  test('flags bandwagon consensus arguments', () => {
    const text = 'Everyone is joining our VIP club! Even beginners are making $500 daily.';
    const sentences = tokenizeSentences(text);
    const result = detectSocialProof(sentences);

    expect(result.detected).toBe(true);
  });

  test('does not flag normal peer discussions without pressure', () => {
    const text = 'Many retail investors open retirement accounts in their twenties.';
    const sentences = tokenizeSentences(text);
    const result = detectSocialProof(sentences);

    expect(result.detected).toBe(false);
  });
});
