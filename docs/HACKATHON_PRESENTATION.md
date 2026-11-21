# Hackathon Pitch & Presentation Guide

**Project:** Scam Tactic Detector  
**Track:** Cybersecurity / AI for Social Good / Fintech Safety  
**Team:** Abhiman (Lead), Aryan, Rohit, Abhishek  

---

## Slide 1: Title & Hook
- **Title:** Scam Tactic Detector
- **Tagline:** Explainable AI & Psychological Threat Telemetry for Investment Fraud Prevention.
- **Hook:** "Hackers don't just hack firewalls anymore—they hack human psychology. Over $10 Billion was lost last year to investment scams that used five simple cognitive tricks. Here is how we stop them in real-time."

---

## Slide 2: Problem Statement
- Investment scams (crypto doubling, fake regulatory raids, pig-butchering, VIP Telegram clubs) bypass traditional antivirus because they attack the human operator.
- Victims are manipulated through five cognitive vulnerabilities:
  1. **Artificial Urgency** (FOMO & rushed action)
  2. **Authority Impersonation** (Fake SEBI/SEC/bank officials)
  3. **Guaranteed Returns** (Impossible zero-risk profits)
  4. **Social Proof** (Fabricated community screenshots)
  5. **Escalation / Sunk Cost** (Advance withdrawal fee extortion)

---

## Slide 3: Proposed Solution
- An instant, explainable NLP engine that analyzes incoming messages and investment pitches.
- Unlike black-box neural networks, our system provides:
  - Exact in-line phrase highlights.
  - Transparent explanations of the psychological mechanism.
  - Actionable counter-tactics.
  - A calibrated heuristic risk score with multi-tactic synergy weighting.

---

## Slide 4: Key Innovations
1. **Explainable AI (XAI):** Clear rationale for every flagged sentence; no uninterpretable confidence scores.
2. **Context & Negation Defense:** Zero false positives on legitimate investment disclaimers (e.g. mutual fund risk notices) or educational warnings.
3. **Synergistic Risk Modeling:** Automatically detects when scammers layer multiple tactics together (e.g., Authority + Urgency + Escalation) and scales risk non-linearly.
4. **Privacy-Preserving On-Premise Execution:** Zero external API calls; your sensitive financial conversations never leave your device.

---

## Slide 5: Technical Architecture
- **Frontend:** React 18, Vite, Responsive Financial Security UI, dynamic SVG risk gauge, live character-offset text highlighting.
- **Backend:** Node.js, Express, Helmet, Rate Limiting, Input Sanitization.
- **NLP Engine:** Modular tokenization, negation analysis, five dedicated tactic detectors.
- **Testing & QA:** 9 test suites, 41 automated tests, 100% pass rate.
- **Dataset Benchmarking:** 25 synthetic cases with 100% multi-label accuracy and 0.0% false positive rate on safe data.

---

## Slide 6: Working Demonstration Workflow
1. **Step 1:** Paste a suspicious Telegram message (e.g., "Act fast! 100% guaranteed profit of 30% daily. Over 5,000 members have joined.").
2. **Step 2:** Click **Analyze Conversation**.
3. **Step 3:** The UI instantly highlights "Act fast!" (Urgency), "100% guaranteed profit" (Guaranteed Returns), and "Over 5,000 members" (Social Proof).
4. **Step 4:** View the Critical Risk score (88/100) and tailored defensive advice: *"STOP all communication. High returns with zero risk do not exist in genuine financial markets."*
5. **Step 5:** Paste a safe mutual fund disclaimer -> Observe 0 tactics detected, SAFE status, score 5/100.

---

## Slide 7: Limitations & Future Scope
- **Limitations:** Focuses on textual English communication; doesn't currently transcribe raw phone calls or analyze images.
- **Future Scope:**
  - Browser extension for WhatsApp Web and Telegram.
  - Voice transcription with Whisper API.
  - Multilingual support for Hindi, Spanish, and regional languages.
  - Anonymous threat intel network to flag emerging scam campaigns.
