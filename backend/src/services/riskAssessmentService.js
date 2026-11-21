/**
 * Risk Assessment Service
 * Calculates an explainable heuristic risk score based on detected tactics,
 * confidence weights, and multi-tactic psychological synergy.
 *
 * NOTE: The risk score is an explainable heuristic indicator of psychological
 * manipulation patterns and NOT a statistically validated probability of fraud.
 */

const RISK_LEVELS = {
  SAFE: {
    level: 'SAFE',
    label: 'Safe / Low Concern',
    color: '#10b981', // emerald green
    description: 'No prominent psychological manipulation tactics were detected in this conversation.',
    action: 'The discussion appears normal or educational. Standard financial vigilance is always recommended.'
  },
  LOW_RISK: {
    level: 'LOW_RISK',
    label: 'Low Risk',
    color: '#3b82f6', // blue
    description: 'Minor or isolated persuasive language detected. Low probability of coordinated deception.',
    action: 'Verify details independently before making financial commitments.'
  },
  MODERATE_RISK: {
    level: 'MODERATE_RISK',
    label: 'Moderate Risk',
    color: '#f59e0b', // amber
    description: 'Suspicious persuasive patterns detected (e.g., artificial urgency or unsubstantiated claims).',
    action: 'Proceed with caution. Do not share financial or personal credentials without independent verification.'
  },
  HIGH_RISK: {
    level: 'HIGH_RISK',
    label: 'High Risk',
    color: '#f97316', // orange
    description: 'Multiple psychological manipulation tactics identified. Strong indicators of deceptive investment solicitation.',
    action: 'Do not transfer funds or execute transactions. Thoroughly verify identities via official regulatory channels.'
  },
  CRITICAL_RISK: {
    level: 'CRITICAL_RISK',
    label: 'Critical Risk',
    color: '#ef4444', // crimson red
    description: 'Severe scam indicators detected, including predatory urgency, guaranteed returns, authority impersonation, or advance-fee escalation.',
    action: 'STOP all communications immediately. Block the sender and report the interaction to cybercrime authorities and your financial institution.'
  }
};

function assessRisk(tactics, sentenceCount = 1) {
  const detected = tactics.filter(t => t.detected);
  const detectedCount = detected.length;

  if (detectedCount === 0) {
    return {
      score: 5,
      ...RISK_LEVELS.SAFE,
      detectedTacticsCount: 0,
      tacticBreakdown: tactics.map(t => ({ id: t.id, name: t.name, score: 0, detected: false })),
      synergyMultiplier: 1.0,
      disclaimer: 'This score is a rule-based heuristic indicator of psychological manipulation patterns and not a statistically certified legal or financial guarantee of fraud.',
      actionableAdvice: [
        'Continue to practice good digital security habits.',
        'Always research any investment firm on official regulatory registries.',
        'Never disclose OTPs, private keys, or banking passwords.'
      ]
    };
  }

  // Calculate base score from highest individual tactic score + contributions from others
  const sortedScores = detected.map(t => {
    let weight = 1.0;
    if (t.id === 'guaranteed_returns') weight = 1.15;
    if (t.id === 'escalation') weight = 1.25;
    if (t.id === 'authority') weight = 1.20;
    if (t.id === 'urgency') weight = 1.05;
    if (t.id === 'social_proof') weight = 1.0;
    return Math.min(100, t.score * weight);
  }).sort((a, b) => b - a);

  // Lead score dominates (minimum 45 if any high-confidence tactic detected)
  let baseScore = sortedScores[0];
  for (let i = 1; i < sortedScores.length; i++) {
    baseScore += sortedScores[i] * 0.35;
  }

  // Multi-tactic psychological synergy multiplier
  let synergyMultiplier = 1.0;
  if (detectedCount === 2) synergyMultiplier = 1.20;
  else if (detectedCount === 3) synergyMultiplier = 1.40;
  else if (detectedCount >= 4) synergyMultiplier = 1.60;

  // Escalation or Authority + Urgency are especially dangerous
  const hasEscalation = detected.some(t => t.id === 'escalation');
  const hasAuthority = detected.some(t => t.id === 'authority');
  const hasUrgency = detected.some(t => t.id === 'urgency');
  if (hasEscalation || (hasAuthority && hasUrgency)) {
    synergyMultiplier += 0.15;
  }

  let calculatedScore = Math.min(100, Math.max(35, Math.round(baseScore * (synergyMultiplier / 1.5))));

  // Determine risk category
  let riskMeta = RISK_LEVELS.LOW_RISK;
  if (calculatedScore < 20) {
    riskMeta = RISK_LEVELS.SAFE;
  } else if (calculatedScore < 40) {
    riskMeta = RISK_LEVELS.LOW_RISK;
  } else if (calculatedScore < 65) {
    riskMeta = RISK_LEVELS.MODERATE_RISK;
  } else if (calculatedScore < 85) {
    riskMeta = RISK_LEVELS.HIGH_RISK;
  } else {
    riskMeta = RISK_LEVELS.CRITICAL_RISK;
  }

  // Tailored actionable advice
  const adviceList = [];
  adviceList.push(riskMeta.action);

  if (detected.some(t => t.id === 'guaranteed_returns')) {
    adviceList.push('Remember: High returns with zero risk do not exist in genuine financial markets.');
  }
  if (detected.some(t => t.id === 'urgency')) {
    adviceList.push('Take your time: Legitimate opportunities will not vanish in a few hours.');
  }
  if (detected.some(t => t.id === 'authority')) {
    adviceList.push('Verify credentials: Contact the purported institution directly using phone numbers from their official domain, not numbers provided in chat.');
  }
  if (detected.some(t => t.id === 'escalation')) {
    adviceList.push('Do NOT send more money to unlock withdrawals; advance-fee demands are definitive scam hallmarks.');
  }
  if (detected.some(t => t.id === 'social_proof')) {
    adviceList.push('Do not rely on group screenshots or community praise; these are frequently staged with fake accounts.');
  }

  return {
    score: calculatedScore,
    level: riskMeta.level,
    label: riskMeta.label,
    color: riskMeta.color,
    description: riskMeta.description,
    detectedTacticsCount: detectedCount,
    tacticBreakdown: tactics.map(t => ({
      id: t.id,
      name: t.name,
      score: t.score,
      detected: t.detected,
      confidence: t.confidence
    })),
    synergyMultiplier,
    disclaimer: 'This score is a rule-based heuristic indicator of psychological manipulation patterns and not a statistically certified legal or financial guarantee of fraud.',
    actionableAdvice: adviceList
  };
}

module.exports = {
  assessRisk,
  RISK_LEVELS
};
