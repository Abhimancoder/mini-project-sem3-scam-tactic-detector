const { assessRisk } = require('../../src/services/riskAssessmentService');

describe('Risk Assessment Service & Heuristic Scoring', () => {
  test('returns SAFE status and minimal score when 0 tactics detected', () => {
    const mockTactics = [
      { id: 'urgency', name: 'Urgency', score: 0, detected: false },
      { id: 'authority', name: 'Authority', score: 0, detected: false },
      { id: 'guaranteed_returns', name: 'Guaranteed', score: 0, detected: false },
      { id: 'social_proof', name: 'Social Proof', score: 0, detected: false },
      { id: 'escalation', name: 'Escalation', score: 0, detected: false }
    ];

    const result = assessRisk(mockTactics, 3);
    expect(result.level).toBe('SAFE');
    expect(result.score).toBeLessThan(20);
    expect(result.detectedTacticsCount).toBe(0);
    expect(result.disclaimer).toBeDefined();
  });

  test('escalates risk level non-linearly with multiple tactics (synergy multiplier)', () => {
    const singleTactic = [
      { id: 'urgency', name: 'Urgency', score: 50, detected: true, confidence: 'MEDIUM' },
      { id: 'authority', name: 'Authority', score: 0, detected: false },
      { id: 'guaranteed_returns', name: 'Guaranteed', score: 0, detected: false },
      { id: 'social_proof', name: 'Social Proof', score: 0, detected: false },
      { id: 'escalation', name: 'Escalation', score: 0, detected: false }
    ];

    const tripleTactic = [
      { id: 'urgency', name: 'Urgency', score: 70, detected: true, confidence: 'HIGH' },
      { id: 'authority', name: 'Authority', score: 80, detected: true, confidence: 'HIGH' },
      { id: 'guaranteed_returns', name: 'Guaranteed', score: 85, detected: true, confidence: 'HIGH' },
      { id: 'social_proof', name: 'Social Proof', score: 0, detected: false },
      { id: 'escalation', name: 'Escalation', score: 0, detected: false }
    ];

    const singleResult = assessRisk(singleTactic, 2);
    const tripleResult = assessRisk(tripleTactic, 3);

    expect(tripleResult.score).toBeGreaterThan(singleResult.score);
    expect(tripleResult.synergyMultiplier).toBeGreaterThan(singleResult.synergyMultiplier);
    expect(['HIGH_RISK', 'CRITICAL_RISK']).toContain(tripleResult.level);
  });
});
