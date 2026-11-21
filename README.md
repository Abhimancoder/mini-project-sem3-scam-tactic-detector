# Scam Tactic Detector

[![Build & Test Status](https://img.shields.io/badge/tests-41%20passed-brightgreen.svg)](docs/TESTING_REPORT.md)
[![Dataset Benchmark](https://img.shields.io/badge/accuracy-100%25-blue.svg)](docs/DATASET_DOCUMENTATION.md)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> An intelligent, explainable application that analyzes investment conversations and detects psychological manipulation tactics commonly associated with investment scams.

---

## 📌 Table of Contents
- [Executive Overview](#executive-overview)
- [The Five Psychological Scam Tactics](#the-five-psychological-scam-tactics)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Quick Start & Installation](#quick-start--installation)
- [Dataset & Empirical Benchmarks](#dataset--empirical-benchmarks)
- [Automated Testing Suite](#automated-testing-suite)
- [Security & Privacy Standards](#security--privacy-standards)
- [Project Documentation](#project-documentation)
- [Team & Contribution Governance](#team--contribution-governance)
- [License](#license)

---

## 1. Executive Overview

Investment scams rob victims of billions of dollars annually. Unlike technical cyber attacks targeting vulnerabilities in code, investment fraud exploits cognitive vulnerabilities in human psychology: artificial urgency, fear of missing out, uncritical obedience to authority, greed, and the sunk cost fallacy.

**Scam Tactic Detector** provides real-time, explainable Natural Language Processing (NLP) to inspect conversational text, extract suspicious phrases, calculate a synergistic heuristic risk score, and deliver actionable defensive advisories—all without transmitting sensitive messages to third-party cloud APIs.

---

## 2. The Five Psychological Scam Tactics

| # | Tactic Name | Psychological Vector | Example Trigger |
| :-: | :--- | :--- | :--- |
| **1** | **Urgency & Time Pressure** | Induces stress & FOMO to bypass critical due diligence. | *"Act now! Offer expires at midnight, only 2 slots remaining."* |
| **2** | **Authority Impersonation** | Exploits obedience heuristics through fake regulatory or banking backing. | *"I am a registered agent from SEBI / Barclays compliance unit."* |
| **3** | **Guaranteed Returns** | Promises mathematically impossible profits with zero risk. | *"100% guaranteed profit of 25% daily return with zero risk."* |
| **4** | **Social Proof & Herd Pressure** | Manufactures false consensus using fake community metrics. | *"Over 10,000 members are earning daily! See withdrawal proofs."* |
| **5** | **Escalation & Sunk Cost** | Extorts advance fees or upgrades to release initial deposits. | *"Deposit another $1,500 tax clearance fee to unlock withdrawal."* |

---

## 3. Key Features

- **Explainable Multi-Tactic Detection:** Evaluates all five tactics simultaneously with clear explanations and specific evidence.
- **In-Line Phrase Highlighting:** Identifies exact character offsets and highlights suspicious sentences directly in the conversation text.
- **Context & Negation Defense:** Suppresses false positives on legitimate regulatory disclaimers (e.g. mutual fund statutory notices) and educational warnings.
- **Heuristic Risk Gauge:** Calculates a 0–100 heuristic risk score with multi-tactic psychological synergy scaling.
- **Pre-Loaded Sample Library:** Test instant scam vectors and safe conversations with one click.
- **Comprehensive Educational Portal:** In-depth guide detailing how financial scams operate, red flags, and protective countermeasures.
- **Audit Report Export:** Download structured forensic summaries in JSON format.

---

## 4. System Architecture

```
+-------------------------------------------------------------+
|                     REACT + VITE FRONTEND                   |
|   Interactive Analyzer | Highlighting | Risk Visualizer     |
+-------------------------------------------------------------+
                              | REST JSON
                              v
+-------------------------------------------------------------+
|                    EXPRESS.JS REST BACKEND                  |
|   Helmet Security | CORS | Rate Limiting | Input Validation |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                   NLP ORCHESTRATION ENGINE                  |
|   Tokenizer | Negation Filter | 5 Dedicated Tactic Modules  |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                   RISK ASSESSMENT SERVICE                   |
|   Heuristic Risk Scoring | Multi-Tactic Synergy Engine      |
+-------------------------------------------------------------+
```

---

## 5. Quick Start & Installation

### Prerequisites
- [Node.js](https://nodejs.org) >= 18.0.0
- npm >= 9.0.0

### Step 1: Clone Repository
```bash
git clone https://github.com/Abhimancoder/mini-project-sem3-scam-tactic-detector.git
cd mini-project-sem3-scam-tactic-detector
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### Step 3: Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### Step 4: Run the Application
In terminal 1 (start backend API on port 5000):
```bash
npm run server
```

In terminal 2 (start frontend UI on port 5173):
```bash
npm run client
```

Open your browser at `http://localhost:5173`.

---

## 6. Dataset & Empirical Benchmarks

The project includes a synthetic evaluation dataset of 25 labelled records (`dataset/scam_tactics_dataset.json` and `.csv`). To execute the automated benchmark:

```bash
npm run test:dataset
```

**Benchmark Results:**
- **Exact Multi-Label Accuracy:** 100.0% (25/25)
- **Macro Precision:** 100.0%
- **Macro Recall:** 100.0%
- **Macro F1 Score:** 100.0%
- **False Positive Rate on Safe Data:** 0.0% (0 false alarms out of 7 safe discussions)

---

## 7. Automated Testing Suite

The application includes 9 automated test suites covering unit logic, integration endpoints, security controls, and edge cases:

```bash
npm test
```

```
Test Suites: 9 passed, 9 total
Tests:       41 passed, 41 total
Snapshots:   0 total
Time:        3.506 s
```

---

## 8. Security & Privacy Standards

- **Zero Cloud API Exposure:** All NLP processing runs in memory on your host machine. Sensitive private conversations are never transmitted to third parties.
- **Request Size Boundaries:** Enforces strict 15,000 character maximums (HTTP 413) to prevent memory exhaustion.
- **Hardened HTTP Headers:** Integrated Helmet suite for clickjacking, MIME sniffing, and cross-site scripting defense.
- **Rate Limiting:** Protects against automated abuse with 100 requests / 15-minute windows.
- **Vulnerability Free:** Verified 0 vulnerabilities via `npm audit`.

---

## 9. Project Documentation

Comprehensive technical specifications are available in the [`docs/`](docs/) directory:

- [Project Overview](docs/PROJECT_OVERVIEW.md)
- [System Architecture](docs/SYSTEM_ARCHITECTURE.md)
- [Implementation Report](docs/IMPLEMENTATION_REPORT.md)
- [API Documentation](docs/API_DOCUMENTATION.md)
- [Dataset Documentation](docs/DATASET_DOCUMENTATION.md)
- [Testing Report](docs/TESTING_REPORT.md)
- [Security Report](docs/SECURITY_REPORT.md)
- [Team Responsibilities](docs/TEAM_RESPONSIBILITIES.md)
- [Contributing Guidelines](docs/CONTRIBUTING.md)
- [Future Scope](docs/FUTURE_SCOPE.md)
- [Hackathon Presentation Pitch](docs/HACKATHON_PRESENTATION.md)

---

## 10. Team & Contribution Governance

- **Abhiman** (`Abhimancoder`) - **Project Lead**, AI/ML, Backend, Architecture and Integration.
- **Aryan** (`aryan48425srmu-arch`) - Frontend Development & UI/UX.
- **Rohit** (`futilit`) - Dataset & Empirical Research.
- **Abhishek** (`abhisheksinghshishodiya-glitch`) - Quality Assurance, Automated Testing & Documentation.

*Note: All development, testing, and integration was executed by Antigravity from Abhiman's authenticated workspace, committed under Abhiman's verified GitHub identity.*

---

## 11. License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
