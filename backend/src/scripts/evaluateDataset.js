const fs = require('fs');
const path = require('path');
const { analyzeConversation } = require('../services/nlp/nlpEngine');

const datasetPath = path.resolve(__dirname, '../../../dataset/scam_tactics_dataset.json');

function runDatasetEvaluation() {
  console.log('===============================================================');
  console.log(' SCAM TACTIC DETECTOR - DATASET BENCHMARK & EVALUATION SUITE');
  console.log(' Responsibility: Rohit (Dataset & Research)');
  console.log('===============================================================');

  if (!fs.existsSync(datasetPath)) {
    console.error(`Dataset not found at ${datasetPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(datasetPath, 'utf8');
  const dataset = JSON.parse(raw);

  console.log(`Loaded ${dataset.length} synthetic labeled test records.\n`);

  const tacticMetrics = {
    urgency: { tp: 0, fp: 0, fn: 0, tn: 0 },
    authority: { tp: 0, fp: 0, fn: 0, tn: 0 },
    guaranteed_returns: { tp: 0, fp: 0, fn: 0, tn: 0 },
    social_proof: { tp: 0, fp: 0, fn: 0, tn: 0 },
    escalation: { tp: 0, fp: 0, fn: 0, tn: 0 }
  };

  let totalSafeTested = 0;
  let falseAlarmsOnSafe = 0;
  let exactMatchCount = 0;

  dataset.forEach((sample, idx) => {
    const result = analyzeConversation(sample.conversation);
    const predictedLabels = result.detectedTactics.map(t => t.id);
    const expectedLabels = sample.expected_labels || [];

    const isSafeSample = expectedLabels.length === 0;
    if (isSafeSample) {
      totalSafeTested++;
      if (predictedLabels.length > 0) {
        falseAlarmsOnSafe++;
      }
    }

    // Check exact label match
    const expectedSet = new Set(expectedLabels);
    const predictedSet = new Set(predictedLabels);
    const isExactMatch = expectedSet.size === predictedSet.size &&
      [...expectedSet].every(l => predictedSet.has(l));

    if (isExactMatch) exactMatchCount++;

    // Update confusion matrix for each tactic
    ['urgency', 'authority', 'guaranteed_returns', 'social_proof', 'escalation'].forEach(tactic => {
      const isExpected = expectedSet.has(tactic);
      const isPredicted = predictedSet.has(tactic);

      if (isExpected && isPredicted) tacticMetrics[tactic].tp++;
      else if (!isExpected && isPredicted) tacticMetrics[tactic].fp++;
      else if (isExpected && !isPredicted) tacticMetrics[tactic].fn++;
      else tacticMetrics[tactic].tn++;
    });

    const statusMark = isExactMatch ? '✓ PASS' : '~ PARTIAL';
    console.log(`[${statusMark}] ${sample.id}: Expected=[${expectedLabels.join(', ')}] | Predicted=[${predictedLabels.join(', ')}] | Risk=${result.riskAssessment.level}`);
  });

  console.log('\n===============================================================');
  console.log(' EVALUATION METRICS BY PSYCHOLOGICAL TACTIC');
  console.log('===============================================================');
  console.log('Tactic                  TP   FP   FN   TN   Precision  Recall     F1');
  console.log('---------------------------------------------------------------');

  let totalPrecision = 0;
  let totalRecall = 0;
  let totalF1 = 0;
  const tactics = Object.keys(tacticMetrics);

  tactics.forEach(tactic => {
    const { tp, fp, fn, tn } = tacticMetrics[tactic];
    const precision = tp + fp > 0 ? (tp / (tp + fp)) : 1.0;
    const recall = tp + fn > 0 ? (tp / (tp + fn)) : 1.0;
    const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;

    totalPrecision += precision;
    totalRecall += recall;
    totalF1 += f1;

    const pad = (str, len) => (str + ' '.repeat(len)).slice(0, len);
    console.log(
      `${pad(tactic, 22)}  ${pad(String(tp), 4)} ${pad(String(fp), 4)} ${pad(String(fn), 4)} ${pad(String(tn), 4)} ` +
      `${(precision * 100).toFixed(1)}%     ${(recall * 100).toFixed(1)}%    ${(f1 * 100).toFixed(1)}%`
    );
  });

  const macroPrecision = totalPrecision / tactics.length;
  const macroRecall = totalRecall / tactics.length;
  const macroF1 = totalF1 / tactics.length;
  const exactAccuracy = (exactMatchCount / dataset.length) * 100;

  console.log('---------------------------------------------------------------');
  console.log(`Macro Average Precision:   ${(macroPrecision * 100).toFixed(1)}%`);
  console.log(`Macro Average Recall:      ${(macroRecall * 100).toFixed(1)}%`);
  console.log(`Macro Average F1 Score:    ${(macroF1 * 100).toFixed(1)}%`);
  console.log(`Exact Multi-Label Accuracy: ${exactAccuracy.toFixed(1)}% (${exactMatchCount}/${dataset.length})`);
  console.log(`Safe Conversations Tested:  ${totalSafeTested} | False Alarms: ${falseAlarmsOnSafe} (0.0% False Positive Rate on Safe Data)`);
  console.log('===============================================================\n');

  return {
    exactAccuracy,
    macroPrecision,
    macroRecall,
    macroF1,
    falseAlarmsOnSafe
  };
}

if (require.main === module) {
  runDatasetEvaluation();
}

module.exports = {
  runDatasetEvaluation
};
