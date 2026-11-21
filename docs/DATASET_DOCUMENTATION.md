# Dataset & Empirical Research Documentation

**Author / Lead:** Rohit (Dataset & Research Responsibility)  
**Co-Author:** Abhiman (Project Lead)  
**Release:** v1.0.0

---

## 1. Research Motivation & Methodology
Unlike malware analysis where byte sequences can be parsed, investment scam communication is nuanced, contextual, and psychological. To rigorously evaluate the Scam Tactic Detector, a dedicated synthetic dataset was created comprising 25 curated cases covering:
1. Isolated scam tactics (Urgency, Authority Impersonation, Guaranteed Returns, Social Proof, Escalation).
2. Combinatorial multi-tactic attacks (e.g. Authority + Urgency, Urgency + Guaranteed Returns + Social Proof).
3. Statutory regulatory disclaimers (e.g. SEBI/SEC mutual fund risk warnings).
4. Prudent fiduciary discussions (index investing, expense ratios, asset allocation).
5. Educational anti-fraud alerts.

---

## 2. Dataset Partition & Class Distribution

| Category | Sample Count | Percentage |
| :--- | :--- | :--- |
| **Urgency Cases** | 11 | 44% |
| **Authority Impersonation Cases** | 5 | 20% |
| **Guaranteed Returns Cases** | 6 | 24% |
| **Social Proof Cases** | 5 | 20% |
| **Escalation / Sunk Cost Cases** | 4 | 16% |
| **Legitimate / Safe Discussions** | 7 | 28% |

*(Note: Percentages sum to >100% due to multi-label scam scenarios).*

---

## 3. Empirical Evaluation Results

The evaluation script `backend/src/scripts/evaluateDataset.js` executes the full NLP pipeline against every record in the dataset.

### Benchmark Confusion Matrix & Metrics

| Tactic | True Positive (TP) | False Positive (FP) | False Negative (FN) | True Negative (TN) | Precision | Recall | F1 Score |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Urgency** | 11 | 0 | 0 | 14 | 100.0% | 100.0% | **100.0%** |
| **Authority** | 5 | 0 | 0 | 20 | 100.0% | 100.0% | **100.0%** |
| **Guaranteed Returns** | 6 | 0 | 0 | 19 | 100.0% | 100.0% | **100.0%** |
| **Social Proof** | 5 | 0 | 0 | 20 | 100.0% | 100.0% | **100.0%** |
| **Escalation** | 4 | 0 | 0 | 21 | 100.0% | 100.0% | **100.0%** |

### Summary Statistics
- **Macro Average Precision:** 100.0%
- **Macro Average Recall:** 100.0%
- **Macro Average F1 Score:** 100.0%
- **Exact Multi-Label Accuracy:** 100.0% (25 / 25 records)
- **Safe Baseline Performance:** 7 tested, 0 false alarms (**0.0% False Positive Rate on safe financial discussions**)
