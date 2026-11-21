# Security Audit & Hardening Report

**Audit Conducted By:** Abhiman (Project Lead & Backend Architect) & Abhishek (Testing & QA)  
**Standard Adherence:** OWASP API Security Top 10, CWE Guidelines  
**Audit Status:** APPROVED (Zero Critical Vulnerabilities)

---

## 1. Threat Modeling & Scope
The application analyzes untrusted, user-submitted investment conversations. Potential threat vectors include:
- Ingestion of arbitrary text containing malicious scripts or code payloads (XSS, Command Injection).
- Denial-of-Service via unbounded memory exhaustion or ReDoS (Regular Expression Denial of Service).
- Transmission of sensitive financial communications to unauthorized third-party services.
- Secret leakage (API tokens, private keys, environment files) in source control.

---

## 2. Security Controls Implemented

### A. Secret Protection & Repository Hygiene
- **Zero Secrets Tracked:** No `.env` files, API keys, or private credentials are included in the repository or git history.
- **Strict `.gitignore`:** Configured to ignore all `.env*` variants, `node_modules`, build outputs, temporary scratch files, and logs.
- **No Third-Party Transmission:** The core NLP detection engine runs completely on-premise / in-memory. User conversation data is never forwarded to external cloud LLM APIs, ensuring total privacy.

### B. Input Validation & DoS Prevention
- **Request Size Limiting:** Enforced via `express.json({ limit: '250kb' })` and application-level verification rejecting text greater than 15,000 characters with HTTP 413.
- **Strict Typing:** Rejects non-string payloads (numbers, booleans, objects, arrays) with HTTP 400.
- **Character Sanitization:** Strips unprintable ASCII control characters (`\u0000-\u0008`, `\u000B`, `\u000C`, `\u000E-\u001F`) preventing parser desynchronization.
- **Safe Regex Construction:** All regular expressions avoid exponential catastrophic backtracking patterns.

### C. HTTP Header Hardening
Integrated `helmet` middleware configuring industry standard headers:
- `X-Content-Type-Options: nosniff` (prevents MIME type sniffing).
- `X-Frame-Options: SAMEORIGIN` (prevents clickjacking attacks).
- `X-DNS-Prefetch-Control: off` (prevents unsolicited DNS resolution).
- Strict Content Security Policies.

### D. Rate Limiting
- Configured `express-rate-limit` allowing a maximum of 100 requests per 15-minute window per IP address, preventing automated scraping and endpoint abuse.

---

## 3. Dependency Vulnerability Audit
- Execution of `npm audit` on installed dependencies yielded **0 vulnerabilities**.
