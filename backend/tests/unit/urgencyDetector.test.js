const { detectUrgency } = require('../../src/services/detectors/urgencyDetector');
const { tokenizeSentences } = require('../../src/services/nlp/sentenceTokenizer');

describe('Tactic 1: Urgency & Artificial Time Pressure Detector', () => {
  test('flags immediate action demands with high confidence', () => {
    const text = 'Act fast and deposit funds immediately! Only 2 spots left before midnight.';
    const sentences = tokenizeSentences(text);
    const result = detectUrgency(sentences);

    expect(result.detected).toBe(true);
    expect(result.confidence).toBe('HIGH');
    expect(result.evidencePhrases).toEqual(expect.arrayContaining(['Act fast', 'immediately', 'Only 2 spots left']));
    expect(result.score).toBeGreaterThanOrEqual(70);
  });

  test('flags short countdowns and expiring offers', () => {
    const text = 'This investment round expires in 30 minutes. Window is closing!';
    const sentences = tokenizeSentences(text);
    const result = detectUrgency(sentences);

    expect(result.detected).toBe(true);
    expect(result.evidencePhrases.length).toBeGreaterThanOrEqual(1);
  });

  test('suppresses urgency when negated', () => {
    const text = 'Take your time to think it over, there is no rush to invest today.';
    const sentences = tokenizeSentences(text);
    const result = detectUrgency(sentences);

    expect(result.detected).toBe(false);
    expect(result.evidencePhrases).toHaveLength(0);
  });

  test('does not flag calm educational advice', () => {
    const text = 'Systematic investment plans work best across long multi-year horizons.';
    const sentences = tokenizeSentences(text);
    const result = detectUrgency(sentences);

    expect(result.detected).toBe(false);
    expect(result.score).toBe(0);
  });
});
