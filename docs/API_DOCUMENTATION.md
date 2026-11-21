# API Documentation & Integration Specification

**Base URL:** `http://localhost:5000/api`  
**Protocol:** HTTP / JSON  
**Authentication:** Public (Protected by rate limiting)

---

## 1. Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Service health status, uptime, and timestamp |
| `POST` | `/analyze` | Analyze text for the 5 psychological scam tactics |
| `GET` | `/samples` | Retrieve curated synthetic sample conversations |
| `GET` | `/samples/:id` | Retrieve single sample conversation by ID |
| `GET` | `/tactics` | Retrieve taxonomy, red flags, and mechanisms for all 5 tactics |
| `GET` | `/tactics/:id` | Retrieve detailed metadata for a specific tactic |

---

## 2. Endpoint Details

### A. POST `/api/analyze`
Analyzes conversation text and returns tactical evidence, offsets, and heuristic risk assessment.

#### Request Headers
```http
Content-Type: application/json
```

#### Request Body
```json
{
  "conversation": "Act now! 100% guaranteed profit of 25% daily. Over 5,000 members have already joined our Telegram community. See proofs of payment!"
}
```

#### Request Constraints
- `conversation`: String, required, non-empty.
- Maximum payload length: 15,000 characters.

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "meta": {
      "analyzedAt": "2026-11-21T16:33:35.842Z",
      "characterCount": 137,
      "sentenceCount": 4,
      "totalTacticsEvaluated": 5,
      "detectedTacticsCount": 3
    },
    "detectedTacticsCount": 3,
    "riskAssessment": {
      "score": 88,
      "level": "CRITICAL_RISK",
      "label": "Critical Risk",
      "color": "#ef4444",
      "description": "Severe scam indicators detected, including predatory urgency, guaranteed returns...",
      "detectedTacticsCount": 3,
      "tacticBreakdown": [
        { "id": "urgency", "name": "Urgency & Artificial Time Pressure", "score": 85, "detected": true, "confidence": "HIGH" },
        { "id": "authority", "name": "Authority Impersonation & Fictitious Backing", "score": 0, "detected": false, "confidence": "NONE" },
        { "id": "guaranteed_returns", "name": "Guaranteed Returns & Unrealistic Profits", "score": 90, "detected": true, "confidence": "HIGH" },
        { "id": "social_proof", "name": "Social Proof & Herd Manipulation", "score": 82, "detected": true, "confidence": "HIGH" },
        { "id": "escalation", "name": "Escalation & Sunk-Cost Extortion", "score": 0, "detected": false, "confidence": "NONE" }
      ],
      "synergyMultiplier": 1.4,
      "disclaimer": "This score is a rule-based heuristic indicator of psychological manipulation patterns and not a statistically certified legal or financial guarantee of fraud.",
      "actionableAdvice": [
        "STOP all communications immediately. Block the sender and report the interaction...",
        "Remember: High returns with zero risk do not exist in genuine financial markets.",
        "Take your time: Legitimate opportunities will not vanish in a few hours.",
        "Do not rely on group screenshots or community praise; these are frequently staged with fake accounts."
      ]
    },
    "tactics": [ /* Array of all 5 evaluated tactic objects */ ],
    "detectedTactics": [ /* Array of detected tactics only */ ],
    "highlights": [
      {
        "tacticId": "urgency",
        "tacticName": "Urgency & Artificial Time Pressure",
        "category": "urgency",
        "phrase": "Act now",
        "start": 0,
        "end": 7
      },
      {
        "tacticId": "guaranteed_returns",
        "tacticName": "Guaranteed Returns & Unrealistic Profits",
        "category": "guaranteed_returns",
        "phrase": "100% guaranteed profit",
        "start": 9,
        "end": 31
      }
    ],
    "analyzedText": "..."
  }
}
```

#### Error Responses
- **`400 Bad Request`**: Missing field, invalid data type, or empty string.
- **`413 Payload Too Large`**: Input text exceeds 15,000 characters.
- **`429 Too Many Requests`**: Rate limit exceeded (100 requests per 15 minutes).
- **`500 Internal Server Error`**: Unexpected runtime error.

---

### B. GET `/api/health`
Checks server vitality and returns current operating parameters.

#### Success Response (`200 OK`)
```json
{
  "status": "ok",
  "service": "scam-tactic-detector-backend",
  "version": "1.0.0",
  "timestamp": "2026-11-21T16:33:00.000Z",
  "uptime": 142.5
}
```

---

### C. GET `/api/samples`
Retrieves pre-configured synthetic conversations for demonstration.

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "id": "sample-multi-tactic-crypto",
      "title": "High-Yield Crypto Investment Offer",
      "description": "Demonstrates Urgency, Guaranteed Returns, and Social Proof.",
      "category": "SCAM_HIGH_RISK",
      "conversation": "..."
    }
  ]
}
```

---

### D. GET `/api/tactics`
Returns educational metadata, behavioral mechanisms, red flags, and counter-tactics for all 5 tactics.

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": "urgency",
      "name": "Artificial Urgency & Time Pressure",
      "category": "urgency",
      "description": "...",
      "psychologicalMechanism": "...",
      "commonExamples": [ "..." ],
      "redFlags": [ "..." ],
      "defensiveRule": "..."
    }
  ]
}
```
