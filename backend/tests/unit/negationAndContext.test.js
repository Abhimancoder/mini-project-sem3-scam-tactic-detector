const { isNegated } = require('../../src/services/nlp/negationHandler');
const { evaluateContext } = require('../../src/services/nlp/contextFilter');

describe('NLP Utilities: Negation & Context Filter', () => {
  describe('negationHandler', () => {
    test('correctly identifies negated return claims', () => {
      const sentence = 'Profits are not guaranteed in stock trading.';
      expect(isNegated(sentence, 'guaranteed')).toBe(true);
    });

    test('correctly identifies negated urgency', () => {
      const sentence = 'There is no rush to buy this equity.';
      expect(isNegated(sentence, 'rush')).toBe(true);
    });

    test('returns false when phrase is assertive and unnegated', () => {
      const sentence = 'We give 100% guaranteed profit every single day.';
      expect(isNegated(sentence, 'guaranteed profit')).toBe(false);
    });
  });

  describe('contextFilter', () => {
    test('identifies regulatory disclaimers', () => {
      const text = 'Mutual fund investments are subject to market risks, read all scheme related documents carefully.';
      const context = evaluateContext(text);
      expect(context.isLegitimateDisclaimer).toBe(true);
    });

    test('identifies educational scam awareness content', () => {
      const text = 'Investor awareness guide: How to identify and avoid common cryptocurrency red flags.';
      const context = evaluateContext(text);
      expect(context.isEducational).toBe(true);
    });

    test('returns false for aggressive scam text', () => {
      const text = 'Send funds now to our official wallet before slots close!';
      const context = evaluateContext(text);
      expect(context.isLegitimateDisclaimer).toBe(false);
      expect(context.isEducational).toBe(false);
    });
  });
});
