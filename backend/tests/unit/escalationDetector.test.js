const { detectEscalation } = require('../../src/services/detectors/escalationDetector');
const { tokenizeSentences } = require('../../src/services/nlp/sentenceTokenizer');

describe('Tactic 5: Escalation & Sunk Cost Extortion Detector', () => {
  test('flags advance withdrawal fee demands', () => {
    const text = 'Your account has $10,000 in profits. To withdraw your funds, you must pay a 10% clearance fee first.';
    const sentences = tokenizeSentences(text);
    const result = detectEscalation(sentences);

    expect(result.detected).toBe(true);
    expect(result.confidence).toBe('HIGH');
  });

  test('flags demands to deposit additional money to unfreeze accounts', () => {
    const text = 'Account is frozen until you deposit another $500 to verify identity.';
    const sentences = tokenizeSentences(text);
    const result = detectEscalation(sentences);

    expect(result.detected).toBe(true);
    expect(result.evidencePhrases).toEqual(expect.arrayContaining(['deposit another $500']));
  });

  test('does not flag normal fund contribution planning', () => {
    const text = 'You can increase your monthly recurring deposit by $50 when your salary rises.';
    const sentences = tokenizeSentences(text);
    const result = detectEscalation(sentences);

    expect(result.detected).toBe(false);
  });
});
