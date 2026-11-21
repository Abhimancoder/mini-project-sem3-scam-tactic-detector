# Scam Tactic Detector - Research & Synthetic Evaluation Dataset

**Assigned Responsibility:** Rohit (Dataset & Research)  
**Maintained by:** Abhiman (Project Lead) & Research Team  
**Dataset Version:** 1.0.0  
**Format:** JSON (`scam_tactics_dataset.json`) & CSV (`scam_tactics_dataset.csv`)

---

## 1. Overview & Research Objective

Investment fraud causes billions of dollars in losses annually. Psychological manipulation tactics—rather than sophisticated technical exploits—are the primary vulnerability exploited by threat actors. 

This dataset provides a standardized, synthetic corpus of investment communications explicitly designed to evaluate explainable Natural Language Processing (NLP) detection engines. It covers five primary psychological manipulation vectors alongside safe fiduciary communications and regulatory disclaimers.

---

## 2. Ethical Data Policy & Synthetic Construction

To safeguard personal privacy and adhere to responsible AI development standards:
- **Zero PII (Personally Identifiable Information):** No real-world victim communications, private chats, or actual credentials are used.
- **Synthetically Modeled:** All records were synthetically generated based on public regulatory alerts (SEBI, SEC, FTC, FINRA) and typologies documented in cybersecurity research.
- **Balanced Class Distribution:** Includes both aggressive scam conversations, subtle multi-tactic manipulation, and safe baseline conversations (educational warnings, long-term index investing, regulatory disclaimers).

---

## 3. Dataset Schema

Each record contains the following fields:

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | Unique synthetic identifier (e.g., `SYNTH-001`) |
| `conversation` | String | The full text of the simulated investment dialogue |
| `expected_labels` | Array[String] | Ground-truth tactics present: `urgency`, `authority`, `guaranteed_returns`, `social_proof`, `escalation` (or empty for safe) |
| `evidence_phrase` | String | Specific textual segment containing the linguistic manipulation cues |
| `explanation` | String | Psychological and semantic explanation of the manipulation tactic |
| `expected_risk_category` | String | Heuristic risk level: `SAFE`, `MODERATE_RISK`, `HIGH_RISK`, `CRITICAL_RISK` |

---

## 4. Tactics Taxonomy

1. **Urgency (`urgency`)**: Artificial scarcity, countdown clocks, limited allocations, and immediate transfer demands.
2. **Authority Impersonation (`authority`)**: Fictitious regulatory oversight (SEBI/SEC/RBI), bank impersonation, or law enforcement threats.
3. **Guaranteed Returns (`guaranteed_returns`)**: Promises of risk-free capital growth, fixed high daily/weekly yield, or loss immunity.
4. **Social Proof (`social_proof`)**: Manufactured community scale, Telegram member counts, and fabricated payout screenshots.
5. **Escalation (`escalation`)**: Sunk cost traps, advance withdrawal fees, tax clearance demands, and tiered deposit conditions.

---

## 5. Dataset Limitations

- **Language Scope:** The current release focuses on English-language communications.
- **Modality:** Covers textual chat messages and transcripts; does not currently analyze speech intonation or raw image OCR.
- **Context Boundaries:** In real-world scams, conversations may evolve across weeks of rapport-building. This dataset captures the critical inflection points where extraction is attempted.
