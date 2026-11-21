# Contributing Guidelines - Scam Tactic Detector

Thank you for contributing to the **Scam Tactic Detector** project. This document outlines development standards, branch hygiene, and testing requirements.

---

## 1. Branch Strategy & Workflow
We follow a GitFlow-inspired branching strategy:
- `main`: Production-ready, verified code. Direct commits are restricted.
- `develop`: Integration branch where feature branches merge.
- `feature/<name>-<topic>`: Isolated feature branches representing specialized workstreams:
  - `feature/abhiman-core-ai-backend`
  - `feature/aryan-frontend`
  - `feature/rohit-dataset-research`
  - `feature/abhishek-testing-documentation`

---

## 2. Commit Standards
Use semantic commit prefixes:
- `feat(...)`: A new feature or capability.
- `fix(...)`: A bug fix.
- `test(...)`: Adding or updating test suites.
- `docs(...)`: Documentation updates.
- `chore(...)`: Maintenance, dependency management, or build scripts.

---

## 3. Pull Request Requirements
Before submitting a PR:
1. Ensure all Jest automated tests pass:
   ```bash
   npm test --prefix backend
   ```
2. Run the dataset evaluation benchmark:
   ```bash
   node backend/src/scripts/evaluateDataset.js
   ```
3. Verify zero secrets or private credentials are staged.
4. Keep PR descriptions informative with screenshots for UI changes.
