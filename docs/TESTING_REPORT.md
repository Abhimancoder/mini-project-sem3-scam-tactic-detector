# Quality Assurance & Testing Report

**Lead:** Abhishek (Testing & Documentation Responsibility)  
**Co-Author:** Abhiman (Project Lead)  
**Test Framework:** Jest 29.7, Supertest 7.0  
**Status:** PASSING (100% Suites Passed)

---

## 1. Test Strategy & Scope
The Scam Tactic Detector test suite ensures deterministic reliability across four testing pillars:
1. **Unit Testing:** Validates isolated tactic detectors, sentence tokenization, character offset calculation, and negation handlers.
2. **Integration Testing:** Exercises the Express REST API endpoints (`/api/health`, `/api/analyze`, `/api/samples`, `/api/tactics`).
3. **Security Testing:** Verifies rate limiting, input boundary handling, injection neutralization, and HTTP security headers.
4. **Heuristic Calibration Testing:** Confirms that risk scores escalate non-linearly with multiple co-occurring tactics and remain strictly `SAFE` on legitimate investment advice.

---

## 2. Test Execution Summary

```
Test Suites: 9 passed, 9 total
Tests:       42 passed, 42 total
Snapshots:   0 total
Time:        3.407 s
Ran all test suites.
```

### Breakdown by Suite

| Suite File | Category | Tests | Status |
| :--- | :--- | :---: | :---: |
| `tests/unit/urgencyDetector.test.js` | Tactic 1 Unit | 4 | PASS |
| `tests/unit/authorityDetector.test.js` | Tactic 2 Unit | 4 | PASS |
| `tests/unit/guaranteedReturnsDetector.test.js` | Tactic 3 Unit | 4 | PASS |
| `tests/unit/socialProofDetector.test.js` | Tactic 4 Unit | 3 | PASS |
| `tests/unit/escalationDetector.test.js` | Tactic 5 Unit | 3 | PASS |
| `tests/unit/negationAndContext.test.js` | NLP & Negation | 6 | PASS |
| `tests/unit/riskAssessmentService.test.js` | Scoring Logic | 2 | PASS |
| `tests/integration/apiEndpoints.test.js` | REST Endpoints | 7 | PASS |
| `tests/security/securityAndValidation.test.js` | Security & Ingestion | 9 | PASS |

---

## 3. Notable Test Scenarios Verified
- **Legitimate Authority Neutrality:** Explicitly verified that mentioning `SEBI mandates risk-o-meter ratings` or `I bank with JPMorgan` does NOT trigger an authority impersonation warning.
- **Negation Inversion:** Verified that `Returns are NOT guaranteed` and `There is NO rush to invest` correctly resolve to 0 detected tactics and `SAFE` risk level.
- **Payload Size Limits:** Verified that inputs exceeding 15,000 characters trigger an immediate HTTP `413 Payload Too Large` without server degradation.
- **Cross-Site Scripting Neutralization:** Verified that submitting `<script>alert("xss")</script>` is safely analyzed as text without DOM execution or backend crashes.
