# System Architecture & Technical Design

## 1. Architectural Overview

The Scam Tactic Detector employs a decoupled, modular client-server architecture designed for high availability, zero latency, explainability, and enterprise-grade security.

```
+-------------------------------------------------------------------------+
|                              USER CLIENT                                |
|        React.js (Vite) + Cybersecurity UI + Interactive Highlighting    |
+-------------------------------------------------------------------------+
                                    |
                            HTTP / REST JSON
                                    v
+-------------------------------------------------------------------------+
|                          EXPRESS BACKEND GATEWAY                        |
|  Helmet (Security Headers) | CORS | Rate Limiter | Input Sanitizer      |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                         NLP ORCHESTRATION ENGINE                        |
|  Sentence Tokenizer | Character Offset Mapper | Context & Negation      |
+-------------------------------------------------------------------------+
      |                  |                 |               |            |
      v                  v                 v               v            v
+-------------+  +-------------+  +-------------+  +-------------+  +-------------+
| TACTIC 1    |  | TACTIC 2    |  | TACTIC 3    |  | TACTIC 4    |  | TACTIC 5    |
| Urgency &   |  | Authority   |  | Guaranteed  |  | Social      |  | Escalation  |
| Time Scarcity| | Impersonation| | Returns     |  | Proof & Herd|  | & Sunk Cost |
+-------------+  +-------------+  +-------------+  +-------------+  +-------------+
      \                  \                 |               /            /
       -----------------------------------------------------------------
                                    |
                                    v
+-------------------------------------------------------------------------+
|                         RISK ASSESSMENT SERVICE                         |
|  Heuristic Scoring | Multi-Tactic Synergy Engine | Actionable Advice    |
+-------------------------------------------------------------------------+
```

---

## 2. Core Architectural Subsystems

### A. Frontend Presentation Layer (React + Vite)
- **Component Hierarchy:**
  - `Navbar`: Application routing and theme management.
  - `AnalyzerView`: High-throughput text entry, sample selector, character counter.
  - `ResultsDashboard`: Gauge visualization, severity badge, heuristic risk score breakdown.
  - `HighlightedTextViewer`: In-line text rendering with color-coded tactical evidence pills.
  - `TacticCards`: Accordion cards with evidence phrases, psychological mechanisms, and warnings.
  - `EducationalSection`: Comprehensive encyclopedia of fraud vectors and red flags.
  - `AboutView`: Architectural specifications, team roles, and ethical declarations.

### B. Security & Ingestion Layer
- **Helmet.js:** Strict HTTP security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `X-DNS-Prefetch-Control: off`).
- **Input Validation Middleware:** Rejects non-string types, blank inputs, and payloads exceeding 15,000 characters (HTTP 413). Strips dangerous non-printable ASCII control characters.
- **Rate Limiting:** Protects endpoints against automated denial-of-service (DoS) attempts.

### C. NLP & Tokenization Engine
- **Boundary-Aware Sentence Tokenization:** Tokenizes text into discrete sentences while preserving decimal numbers (`$25.50`), abbreviations, and percentages. Computes absolute start and end character offsets.
- **Negation & Inversion Handler:** Inspects backward and forward context windows for negation operators (`never`, `not`, `no`, `do not`, `myth`, `untrue`) to prevent false positives on cautionary statements.
- **Context & Disclaimer Filter:** Identifies regulatory risk disclosures (e.g. SEBI/SEC disclaimers, mutual fund risk warnings) and investor awareness educational texts.

### D. Tactic Detection Engines
Five independent rule-based heuristic engines evaluate each sentence:
1. `urgencyDetector.js`
2. `authorityDetector.js`
3. `guaranteedReturnsDetector.js`
4. `socialProofDetector.js`
5. `escalationDetector.js`

### E. Risk Assessment & Synergy Service
- Computes base scores per tactic.
- Applies a psychological synergy multiplier when multiple tactics coexist, mirroring how real-world threat actors combine authority, urgency, and guaranteed returns to overwhelm cognitive resistance.
- Emits explicit disclaimers emphasizing that scores represent heuristic indicators rather than statistically validated fraud determinations.
